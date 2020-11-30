import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  @Input() consultOnly: boolean;
  @Input() userToShow: User;

  @Output() onUserCreated: EventEmitter<any> = new EventEmitter<any>();

  submitted:boolean = false;

  userPageForm: FormGroup;
  propFirstName: FormControl;
  propLastName: FormControl;
  propUsername: FormControl;
  propEmail: FormControl;

  test: string = 'username';


  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
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
      firstName:this.propFirstName,
      lastName: this.propLastName,
      username: this.propUsername,
      email: this.propEmail
    });

  }

  saveForm() {
    this.submitted = true;
  }

  createUser() {
    const users$ = this.userService.createUser(this.userToShow);
    console.info(users$);
    this.onUserCreated.emit(users$);
  }

  getInputValue(data:any){
    console.info(111);
    console.info(data);
  }

}
