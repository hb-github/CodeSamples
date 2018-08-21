import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../shared/validation.service';
import { UserService } from './user.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'pms-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  toggleFormClass;
  loginForm: FormGroup;
  signupForm: FormGroup;
  loginSubmitted: boolean; //  login submit
  signupSubmitted: boolean; // signup submit
  constructor(
    public fb: FormBuilder,
    public userSevice: UserService,
    public coreService: CoreService
  ) {}

  ngOnInit() {
    this.loginSubmitted = false;
    this.loginForm = this.fb.group({
      email: [
        '',
        {
          validators: Validators.compose([
            ValidationService.required,
            ValidationService.emailValidator
          ]),
          updateOn: 'submit'
        }
      ],
      password: [
        '',
        {
          validators: Validators.compose([ValidationService.required]),
          updateOn: 'submit'
        }
      ]
    });

    this.signupSubmitted = false;
    this.signupForm = this.fb.group({
      fullName: [
        '',
        {
          validators: Validators.compose([ValidationService.required]),
          updateOn: 'submit'
        }
      ],
      email: [
        '',
        {
          validators: Validators.compose([
            ValidationService.required,
            ValidationService.emailValidator
          ]),
          updateOn: 'submit'
        }
      ],
      password: [
        '',
        {
          validators: Validators.compose([ValidationService.required]),
          updateOn: 'submit'
        }
      ]
    });
  }
  // bounce effect signup
  showSignUp() {
    this.toggleFormClass = 'bounceLeft';
  }
  // bounce effect login
  showLogin() {
    this.toggleFormClass = 'bounceRight';
  }
  // user login
  login() {
    this.coreService.navigateTo('/');
  }
  // user signup
  sigup() {
    this.coreService.navigateTo('/');
  }
}
