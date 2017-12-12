import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { LoginComponent } from '../views/pages/core/security/login/login.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'login', component: LoginComponent },
  ])],
  exports: [RouterModule]
})
export class LoginRoutingModule {}