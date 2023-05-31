import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {  ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../shared/components/button/button.module';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MessagesComponent } from '../shared/components/messages/messages.component';

const antdModule= [
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzButtonModule,
]
@NgModule({
  declarations: [
    LoginComponent,
    EnterpriseComponent
  ],
  imports: [
    CommonModule,
    MessagesComponent,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    ...antdModule
  ]
})
export class AuthenticationModule { }
