import { NgModule }            from '@angular/core';

import { SharedModule } from './shared.module';

// import { ContactComponent } from '../views/pages/core/contact/contact.component';
import { DomainNormalUsageRoutingModule }    from '../routes/domain-normal-usage.routes';

@NgModule({
  imports: [ 
    DomainNormalUsageRoutingModule,
    SharedModule
  ],
  declarations: [
    // ContactComponent
  ]
})
export class DomainNormalUsageModule { }