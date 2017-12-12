import { ModuleWithProviders, NgModule,  Optional, SkipSelf }       from '@angular/core';

import { SharedModule } from './shared.module';
import { HttpModule, Http,XHRBackend,RequestOptions } from '@angular/http';

import { RepoBrowserComponent } from '../views/pages/domain/github/repo-browser/repo-browser.component';
import { RepoListComponent } from '../views/widgets/domain/github/repo-list/repo-list.component';
import { RepoDetailComponent } from '../views/widgets/domain/github/repo-detail/repo-detail.component';

import { GithubService } from '../services/businessservices/domain/github.service';
import { HttpInterceptor } from '../common/http/http-interceptor';

import { DomainHighPriorityRoutingModule }    from '../routes/domain-high-priority.routes';

export function createHttpInterceptor(backend: XHRBackend, options: RequestOptions) {
   return new HttpInterceptor(backend, options);
}

@NgModule({
  imports:      [ SharedModule, DomainHighPriorityRoutingModule ],
  declarations: [ 
    RepoBrowserComponent,
    RepoListComponent,
    RepoDetailComponent, 
  ],
  providers: [
    GithubService,
    {
        provide: Http,
        useFactory: createHttpInterceptor,
        deps: [XHRBackend, RequestOptions]
    }
  ],
})
export class DomainHighPriorityModule {
  constructor (@Optional() @SkipSelf() parentModule: DomainHighPriorityModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}

