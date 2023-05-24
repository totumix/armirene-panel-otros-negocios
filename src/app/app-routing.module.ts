import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { AuthenticationLayout_ROUTES } from './shared/routes/authentication-layout.routes';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardLayout_ROUTES } from './shared/routes/dashboard-layout.routes';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: DashboardLayout_ROUTES
  },
  {
    path: 'authentication',
    component: AuthenticationLayoutComponent,
    children: AuthenticationLayout_ROUTES
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
