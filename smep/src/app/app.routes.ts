import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './views/pages/core/about/about.component';
import { HomeComponent } from './views/pages/page/home/home.component';
import { ResultsPage } from './views/pages/page/results/results.component';
import { ResultComponent } from './views/pages/page/result/result.component';
import { ContactComponent } from './views/pages/core/contact/contact.component';
import { UserDashboardComponent } from './views/pages/core/userdashboard/userdashboard.component'; 
import { LoginComponent } from './views/pages/page/login/login.component';
import { AdvancedSearch } from './views/pages/page/advanced/advanced.component';
import { FiltermanagerComponent } from './views/pages/page/filtermanager/filtermanager.component';
import { FAQComponent } from './views/pages/core/faq/faq.component';
// import { ProvidersComponent } from './views/pages/core/providers/providers.component';
// import { AuthorizersComponent } from './views/pages/core/authorizers/authorizers.component';
// import { VendersComponent } from './views/pages/core/venders/venders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'results', component: ResultsPage },
  { path: 'result', component: ResultComponent},
  { path: 'filter-manager', component: FiltermanagerComponent},
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'login', component: LoginComponent },
  { path: 'advanced-search', component: AdvancedSearch },
  { path: '_', loadChildren: './modules/domain-high-priority.module#DomainHighPriorityModule' },
  { path: 'sec', loadChildren: './modules/security.module#SecurityModule' },
  { path: 'contact', component: ContactComponent },
  { path: 'userdashboard', component: UserDashboardComponent },
  //{ path: '', redirectTo: 'login', pathMatch: 'full' }
];

  // { path: 'providers', component: ProvidersComponent },
  // { path: 'authorizers', component: AuthorizersComponent },
  // { path: 'consumers', component: VendersComponent },

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

