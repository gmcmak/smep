import { NgModule }      from '@angular/core';

import { SharedModule } from './shared.module';

import { LoginComponent } from '../views/pages/core/security/login/login.component';
import { LoginRoutingModule }    from '../routes/security.routes';

@NgModule({
  imports:      [ 
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [ LoginComponent ]
})
export class SecurityModule {}