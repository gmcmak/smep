import { NgModule }      from '@angular/core';
import { SharedModule } from './shared.module';


// import { UserRootComponent } from '../views/widgets/domain/view-imp-exp-license-app/view-conditions/view-conditions.component';
// import { ContentProviderComponent } from '../views/widgets/domain/view-imp-exp-license-app/view-conditions/view-conditions.component';
// import { AdminComponent } from '../views/widgets/domain/view-imp-exp-license-app/view-conditions/view-conditions.component';

// import { UserRoutingModule }    from '../routes/user.routes';

@NgModule({
  imports:      [ 
    SharedModule,
  ],
  declarations: [
    // UserRootComponent,
    // ContentProviderComponent,
    // AdminComponent
  ],
  providers: [

  ]
})
export class CoreModule {}