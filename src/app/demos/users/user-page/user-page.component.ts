import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/demos/users/user.model';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import * as $ from 'jquery';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  @Input() consultOnly: boolean;
  @Input() userToShow: User;

  submitted: boolean = false;

  userPageForm: FormGroup;
  propFirstName: FormControl;
  propLastName: FormControl;
  propUsername: FormControl;
  propEmail: FormControl;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private sharedService: SharedService) { }

  async ngOnInit() {
    this.propFirstName = new FormControl('', [
      Validators.required
    ]);
    this.propLastName = new FormControl('', [
      Validators.required
    ]);
    this.propUsername = new FormControl('', [
      Validators.required
    ]);
    this.propEmail = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.userPageForm = this.formBuilder.group({
      firstName: this.propFirstName,
      lastName: this.propLastName,
      username: this.propUsername,
      email: this.propEmail
    });

    this.sharedService.getInputValueChanged().subscribe((data: any) => {
      const key: string = data['key'];
      const keys: string[] = key.split('.');
      const value: string = data['value'];
      if (keys.length == 1) {
        this.userToShow[key] = value;
      }
      if (keys.length == 2) {
        this.userToShow[keys[0]][keys[1]] = value;
      }
      if (keys.length == 3) {
        this.userToShow[keys[0]][keys[1]][keys[2]] = value;
      }
      if (keys.length == 4) {
        this.userToShow[keys[0]][keys[1]][keys[2]][keys[3]] = value;
      }

    });

    this.userService.getSubmitFlag().subscribe((data: boolean) => {
      this.submitted = data;
    });

  }

  saveForm() {
    this.submitted = true;
    if (this.userPageForm.valid) {
      $('#btn_user_page_save').click();
    }
  }

  createUser() {
    this.userService.createUser(this.userToShow).subscribe(data => {
      console.log("POST call successful value returned in body",
        data);
      this.sharedService.sendShowMsgDiv({ msgType: 'success', msg: 'The user is created successfully.' });
      $("#btn_add2").click();
      this.userService.sendCreateOrUpdateUserRes(true);
    }
    );
  }

  updateUser() {
    this.userService.updateUser(this.userToShow).subscribe(res=>{
      this.sharedService.sendShowMsgDiv({ msgType: 'success', msg: 'The user is modified successfully.' });
      $("#btn_add2").click();
      this.userService.sendCreateOrUpdateUserRes(true);
    });
  }

}
