import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthEvent } from 'src/app/core/events/auth.event';
import { AuthVm } from 'src/app/core/view-model/auth.vm';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private vm: AuthVm
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      country: [environment.indicator, [Validators.required]]
    });
  }

  submitForm(): void {
    const val = this.loginForm.value;
    this.vm.login(val);
  }

}
