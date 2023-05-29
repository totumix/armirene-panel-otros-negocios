import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from 'src/app/services/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthStore,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      country: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    const val = this.loginForm.value;
    // for (const i in this.loginForm.controls) {
    //   this.loginForm.controls[i].markAsDirty();
    //   this.loginForm.controls[i].updateValueAndValidity();
    // }
    this.auth.login(val.username, val.password).subscribe(
      () => {
        this.router.navigateByUrl("/start-view/list")
      },
      err => {
        alert("login failed")
      }
    )
  }

}
