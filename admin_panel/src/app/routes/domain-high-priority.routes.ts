import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { RepoBrowserComponent } from '../views/pages/domain/github/repo-browser/repo-browser.component';
import { RepoListComponent } from '../views/widgets/domain/github/repo-list/repo-list.component';
import { RepoDetailComponent } from '../views/widgets/domain/github/repo-detail/repo-detail.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'github', component: RepoBrowserComponent,
        children: [
        { path: '', component: RepoListComponent },
        { path: ':org', component: RepoListComponent,
            children: [
            { path: '', component: RepoDetailComponent },
            { path: ':repo', component: RepoDetailComponent }
            ]
        }]
    }
  ])],
  exports: [RouterModule]
})
export class DomainHighPriorityRoutingModule {}