import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../shared/email.validator";
import {User} from "../shared/user.model";
import {UserService} from "../users/user.service";
import {Router} from "@angular/router";
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  propEmail: FormControl;
  propPass: FormControl;
  loginForm: FormGroup;
  submitted: boolean = false;
  invalidCredentials = false;


  constructor(private formBuilder:FormBuilder,
              private userService:UserService,
              private sharedService:SharedService,
              private router:Router) { }

  ngOnInit(): void {
    this.propEmail = new FormControl('',[
      Validators.required,
      Validators.email,
      emailValidator('#'),
    ],[
      this.userService.checkEmail.bind(this.userService)
    ]);
    this.propPass = new FormControl('',[
      Validators.required,
      Validators.minLength(6),
    ]);
    this.loginForm = this.formBuilder.group({
      email: this.propEmail,
      password: this.propPass
    });
  }

  login(){
    this.submitted = true;
       
    this.invalidCredentials = true;
    if(this.loginForm.valid){
      this.router.navigate(['welcome']);
      this.sharedService.sendLoginStatut(true);
    }
    
    //this.router.navigate(['users']);

  }

  login1(loginform){
    console.info(loginform.value);
  }

}
