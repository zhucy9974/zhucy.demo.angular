import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { emailValidator } from "../shared/email.validator";
import { UserService } from "../users/user.service";
import { Router } from "@angular/router";
import { SharedService } from '../shared/shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  flagShowLogingRequisInfo = false;

  url = 'http://213.44.249.81:8080/demo/auth/login';

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.propEmail = new FormControl('', [
      Validators.required,
      Validators.email,
      emailValidator('#'),
    ], [//customValidator
      //this.userService.checkEmail.bind(this.userService)
    ]);
    this.propPass = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);
    this.loginForm = this.formBuilder.group({
      email: this.propEmail,
      password: this.propPass
    });

  }

  login() {
    this.submitted = true;

    this.invalidCredentials = true;
    if (this.loginForm.valid) {
      const httpOption = {
        headers: new HttpHeaders({
          'content-type': 'application/json'
        })
      }

      this.http.post(this.url, {
        'email': this.propEmail.value,
        'password': this.propPass.value
      }, httpOption).subscribe((res: any) => {
        if(res['status']=='KO'){
          if(res['errorMsg']=='401'||res['errorMsg']=='600'){
            this.propPass.setErrors({error401:true});
            this.propEmail.setErrors({error401:true});
          }
        }else{
          const token = res['token'];
          sessionStorage.setItem('token',token);
          sessionStorage.setItem('username',res['username']);
          sessionStorage.setItem('firstName',res['firstName']);
          this.sharedService.sendFirstName(res['firstName']);

          //Code laissé pour l'example
          //this.cookieService.set('chongyangws.AuthToken', token, new Date(new Date().getTime() + (2 * 60 * 60 * 1000)));
          this.router.navigate(['welcome']);
        }
       
      });

      //this.router.navigate(['welcome']);
      //this.sharedService.sendLoginStatut(true);
    }

    //this.router.navigate(['users']);

  }

  login1(loginform) {
    console.info(loginform.value);
  }

}
