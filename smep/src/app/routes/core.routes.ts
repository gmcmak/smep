import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

// import { AboutComponent } from '../views/pages/core/about/about.component';
// import { HomeComponent } from '../views/pages/core/home/home.component';

@NgModule({
  imports: [RouterModule.forChild([
    // { path: 'home', component: HomeComponent },
    // { path: 'about', component: AboutComponent }
  ])],
  exports: [RouterModule]
})
export class CoreRoutingModule {}