import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthResponse } from 'src/app/core/models/auth-response.class';
import { Storage } from 'src/app/core/storage';
import { AuthVm } from 'src/app/core/view-model/auth.vm';
import { LoadingService } from 'src/app/services/loading.service';
import { environment } from 'src/environments/environment';
const USER_DATA = 'user_data'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;

  constructor(
    private _fb: UntypedFormBuilder,
    private _vm: AuthVm,
    private _router: Router,
    private _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      country: [environment.indicator, [Validators.required]]
    });
  }

  submitForm(): void {
    const val = this.loginForm.value;
    this._loadingService.loadingOn()
    this._vm.login(val)
      .pipe(
        finalize(() => this._loadingService.loadingOff())
      )
      .subscribe((user: AuthResponse) => {
        let { data } = user;
        Storage.setAll(USER_DATA, data);
        this._router.navigateByUrl("/start-view/list")
      });
  }

}
