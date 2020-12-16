import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { Group } from '../group.model';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-demo-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {

  @Input() consultOnly: boolean;
  @Input() entityToShow: Group;

  submitted: boolean = false;

  entityPageForm: FormGroup;
  propName: FormControl;
  propShortDesc: FormControl;

  constructor(private formBuilder: FormBuilder, private groupService: GroupsService,
    private sharedService: SharedService) { }

  async ngOnInit() {
    this.propName = new FormControl('', [
      Validators.required
    ]);
    this.propShortDesc = new FormControl('', [
      Validators.required
    ]);


    this.entityPageForm = this.formBuilder.group({
      name: this.propName,
      shortDesc: this.propShortDesc
    });

    this.sharedService.getInputValueChanged().subscribe((data: any) => {
      const key: string = data['key'];
      const keys: string[] = key.split('.');
      const value: string = data['value'];
      if (keys.length == 1) {
        this.entityToShow[key] = value;
      }
      if (keys.length == 2) {
        this.entityToShow[keys[0]][keys[1]] = value;
      }
      if (keys.length == 3) {
        this.entityToShow[keys[0]][keys[1]][keys[2]] = value;
      }
      if (keys.length == 4) {
        this.entityToShow[keys[0]][keys[1]][keys[2]][keys[3]] = value;
      }

    });

    this.groupService.getSubmitFlag().subscribe((data: boolean) => {
      this.submitted = data;
    });

  }

  saveForm() {
    this.submitted = true;
    if (this.entityPageForm.valid) {
      $('#btn_group_page_save').click();
    }
  }

  createEntity() {
    this.groupService.create(this.entityToShow).subscribe(data => {
      console.log("POST call successful value returned in body",
        data);
      this.sharedService.sendShowMsgDiv({ msgType: 'success', msg: 'The group is created successfully.' });
      $("#btn_add2").click();
      this.groupService.sendCreateOrUpdateEntityRes(true);
    }
    );
  }

  
  updateEntity() {
    /*
    this.groupService.updateEntity(this.entityToShow).subscribe(res => {
      this.sharedService.sendShowMsgDiv({ msgType: 'success', msg: 'The group is modified successfully.' });
      $("#btn_add2").click();
      this.groupService.sendCreateOrUpdateEntityRes(true);
    });*/
  }

}
