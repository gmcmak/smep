import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './views/pages/core/about/about.component';
import { HomeComponent } from './views/pages/core/home/home.component';
import { ContactComponent } from './views/pages/core/contact/contact.component';
import { UserDashboardComponent } from './views/pages/core/userdashboard/userdashboard.component';
import { ContentProviderComponent } from './views/pages/core/content-provider/create-content-provider/content-provider.component';
import { ContentAuthorizerComponent } from './views/pages/core/content-authorizer/create-content-authorizer/content-authorizer.component';
import { AdminDashboardComponent } from './views/pages/core/admin/dashboard/admin-dashboard.component';
import { ViewUsersComponent } from './views/pages/core/admin/users/view-users/view-users.component';
import { AddUsersComponent } from './views/pages/core/admin/users/add-users/add-users.component';
import { ChangePasswordComponent } from './views/pages/core/admin/users/change-password/change-password.component';
import { AddAuthorizersComponent } from './views/pages/core/admin/content-authorizer/add-authorizer/add-authorizers.component';
import { ViewAuthorizersComponent } from './views/pages/core/admin/content-authorizer/view-authorizer/view-authorizers.component';
import { AddProvidersComponent } from './views/pages/core/admin/content-provider/add-provider/add-providers.component';
import { ViewProvidersComponent } from './views/pages/core/admin/content-provider/view-provider/view-providers.component';
import { ViewConsumersComponent } from './views/pages/core/admin/content-consumer/view-consumer/view-consumers.component';
import { AddConsumersComponent } from './views/pages/core/admin/content-consumer/add-consumer/add-consumers.component';
import { ContentAuthorizerReportComponent } from './views/pages/core/admin/reports/content-authorizer/content-authorizer-report.component';
import { ContentProviderReportComponent } from './views/pages/core/admin/reports/content-provider/content-provider-report.component';
import { LoginComponent } from './views/forms/login/login.component';
import { AddAuthorComponent } from './views/pages/core/admin/settings/author/add-author/add-author.component';
import { ViewAuthorComponent } from './views/pages/core/admin/settings/author/view-author/view-author.component';
import { AddCategoryComponent } from './views/pages/core/admin/settings/category/add-category/add-category.component';
import { ViewCategoryComponent } from './views/pages/core/admin/settings/category/view-category/view-category.component';
import { AddExploreComponent } from './views/pages/core/admin/settings/explore/add-explore/add-explore.component';
import { ViewExploreComponent } from './views/pages/core/admin/settings/explore/view-explore/view-explore.component';
import { AddKeywordComponent } from './views/pages/core/admin/settings/keyword/add-keyword/add-keyword.component';
import { ViewKeywordComponent } from './views/pages/core/admin/settings/keyword/view-keyword/view-keyword.component';
import { AddRoleComponent } from './views/pages/core/admin/settings/role/add-role/add-role.component';
import { ViewRoleComponent } from './views/pages/core/admin/settings/role/view-role/view-role.component';
//import { ViewIndividualComponent } from './views/pages/core/admin/content-provider/individual/view-individual/view-individual.component';
//import { AddIndividualComponent } from './views/pages/core/admin/content-provider/individual/add-individual/add-individual.component';
import { ViewInstituteComponent } from './views/pages/core/admin/institute/view-institute/view-institute.component';
import { AddInstituteComponent } from './views/pages/core/admin/institute/add-institute/add-institute.component';
import { ProfileComponent } from './views/pages/core/admin/profile/profile.component';
import { ContentAuthorizationComponent } from './views/pages/core/content-authorizer/content-authorization/content-authorization.component';
import { ArticlesComponent } from './views/pages/core/content-authorizer/content-authorization/articles/ca-articles.component';
import { AudioClipComponent } from './views/pages/core/content-authorizer/content-authorization/audio-clip/ca-audio-clip.component';
import { BooksComponent } from './views/pages/core/content-authorizer/content-authorization/books/ca-books.component';
import { CaseStudyComponent } from './views/pages/core/content-authorizer/content-authorization/case-study/ca-case-study.component';
import { ImagesComponent } from './views/pages/core/content-authorizer/content-authorization/images/ca-images.component';
import { VideoClipComponent } from './views/pages/core/content-authorizer/content-authorization/video-clip/ca-video-clip.component';
import { AuthorizationHistoryComponent } from './views/pages/core/content-authorizer/authorization-history/authorization-history.component';
import { ArticlesHistoryComponent } from './views/pages/core/content-authorizer/authorization-history/articles/articles-history.component';
import { AudioClipHistoryComponent } from './views/pages/core/content-authorizer/authorization-history/audio-clip/audio-clip-history.component';
import { BooksHistoryComponent } from './views/pages/core/content-authorizer/authorization-history/books/books-history.component';
import { CaseStudyHistoryComponent } from './views/pages/core/content-authorizer/authorization-history/case-study/case-study-history.component';
import { ImagesHistoryComponent } from './views/pages/core/content-authorizer/authorization-history/images/images-history.component';
import { VideoClipHistoryComponent } from './views/pages/core/content-authorizer/authorization-history/video-clip/video-clip-history.component';
import { ViewContentProvidersComponent } from './views/pages/core/content-authorizer/view-content-providers/ca-content-provider.component';
import { SingleSubmissionComponent } from './views/pages/core/content-provider/cp-submissions/single-submission/single-submission.component';
import { MultipleSubmissionComponent } from './views/pages/core/content-provider/cp-submissions/multiple-submission/multiple-submission.component';
import { CpArticlesComponent } from './views/pages/core/content-provider/cp-submissions/multiple-submission/articles/cp-articles.component';
import { CpAudioClipComponent } from './views/pages/core/content-provider/cp-submissions/multiple-submission/audio-clip/cp-audio-clip.component';
import { CpBooksComponent } from './views/pages/core/content-provider/cp-submissions/multiple-submission/books/cp-books.component';
import { CpCaseStudyComponent } from './views/pages/core/content-provider/cp-submissions/multiple-submission/case-study/cp-case-study.component';
import { CpImagesComponent } from './views/pages/core/content-provider/cp-submissions/multiple-submission/images/cp-images.component';
import { CpVideoClipComponent } from './views/pages/core/content-provider/cp-submissions/multiple-submission/video-clip/cp-video-clip.component';
import { ContentProviderHistoryComponent } from './views/pages/core/content-provider/cp-history/content-provider-history.component';
import { CpArticlesHistoryComponent } from './views/pages/core/content-provider/cp-history/articles/cp-articles-history.component';
import { CpAudioClipHistoryComponent } from './views/pages/core/content-provider/cp-history/audio-clip/cp-audio-clip-history.component';
import { CpBooksHistoryComponent } from './views/pages/core/content-provider/cp-history/books/cp-books-history.component';
import { CpCaseStudyHistoryComponent } from './views/pages/core/content-provider/cp-history/case-study/cp-case-study-history.component';
import { CpImagesHistoryComponent } from './views/pages/core/content-provider/cp-history/images/cp-images-history.component';
import { CpVideoClipHistoryComponent } from './views/pages/core/content-provider/cp-history/video-clip/cp-video-clip-history.component';
import { AuthorizersComponent } from './views/pages/core/admin/institute/authorizers/authorizers.component';
import { ProvidersComponent } from './views/pages/core/admin/institute/providers/providers.component';
import { UpdateUsersComponent } from './views/pages/core/admin/users/update-users/update-users.component';
import { UpdateAuthorizersComponent } from './views/pages/core/admin/content-authorizer/update-authorizer/update-authorizer.component';
import { UpdateProvidersComponent } from './views/pages/core/admin/content-provider/update-provider/update-provider.component';
import { UpdateInstituteComponent } from './views/pages/core/admin/institute/update-institute/update-institute.component';
import { UpdateConsumersComponent } from './views/pages/core/admin/content-consumer/update-consumer/update-consumer.component';
import { UpdateAuthorComponent } from './views/pages/core/admin/settings/author/update-author/update-author.component';
import { UpdateCategoryComponent } from './views/pages/core/admin/settings/category/update-category/update-category.component';
import { UpdateExploreComponent } from './views/pages/core/admin/settings/explore/update-explore/update-explore.component';
import { UpdateKeywordComponent } from './views/pages/core/admin/settings/keyword/update-keyword/update-keyword.component';
import { UpdateRoleComponent } from './views/pages/core/admin/settings/role/update-role/update-role.component';
import { EditProfileComponent } from './views/pages/core/admin/profile/edit-profile/edit-profile.component';
import { AddModuleComponent } from './views/pages/core/admin/settings/module/add-module/add-module.component';
import { ViewModuleComponent } from './views/pages/core/admin/settings/module/view-module/view-module.component';
import { UpdateModuleComponent } from './views/pages/core/admin/settings/module/update-module/update-module.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '_', loadChildren: './modules/domain-high-priority.module#DomainHighPriorityModule' },
  { path: 'sec', loadChildren: './modules/security.module#SecurityModule' },
  { path: 'contact', component: ContactComponent },
  { path: 'userdashboard', component: UserDashboardComponent },
  { path: 'content-provider', component: ContentProviderComponent},
  { path: 'content-authorizer', component: ContentAuthorizerComponent},
  { path: 'dashboard', component: AdminDashboardComponent},
  { path: 'users/view-users', component: ViewUsersComponent},
  { path: 'users/add-users', component: AddUsersComponent},
  { path: 'users/update-users', component: UpdateUsersComponent },
  { path: 'users/change-password', component: ChangePasswordComponent},
  { path: 'content-authorizer/view-authorizers', component: ViewAuthorizersComponent},
  { path: 'content-authorizer/add-authorizers', component: AddAuthorizersComponent},
  { path: 'content-authorizer/update-authorizers', component: UpdateAuthorizersComponent },
  { path: 'content-provider/add-providers', component: AddProvidersComponent},
  { path: 'content-provider/view-providers', component: ViewProvidersComponent},
  { path: 'content-provider/update-providers', component: UpdateProvidersComponent },
  //{ path: 'content-provider/individual/view-individual', component: ViewIndividualComponent },
  //{ path: 'content-provider/individual/add-individual', component: AddIndividualComponent },
  { path: 'institute/view-institute', component: ViewInstituteComponent },
  { path: 'institute/add-institute', component: AddInstituteComponent },
  { path: 'institute/update-institute', component: UpdateInstituteComponent },
  { path: 'institute/authorizers', component: AuthorizersComponent},
  { path: 'institute/providers', component: ProvidersComponent},
  { path: 'content-consumer/view-consumers', component: ViewConsumersComponent},
  { path: 'content-consumer/add-consumers', component: AddConsumersComponent},
  { path: 'content-consumer/update-consumers', component: UpdateConsumersComponent },
  { path: 'reports/content-authorizer-report', component: ContentAuthorizerReportComponent},
  { path: 'reports/content-provider-report', component: ContentProviderReportComponent},
  { path: 'settings/author/add-author', component: AddAuthorComponent },
  { path: 'settings/author/view-author', component: ViewAuthorComponent },
  { path: 'settings/author/update-author', component: UpdateAuthorComponent },
  { path: 'settings/category/add-category', component: AddCategoryComponent },
  { path: 'settings/category/view-category', component: ViewCategoryComponent },
  { path: 'settings/category/update-category', component: UpdateCategoryComponent },
  { path: 'settings/explore/add-explore', component: AddExploreComponent },
  { path: 'settings/explore/view-explore', component: ViewExploreComponent },
  { path: 'settings/explore/update-explore', component: UpdateExploreComponent },
  { path: 'settings/keyword/add-keyword', component: AddKeywordComponent },
  { path: 'settings/keyword/view-keyword', component: ViewKeywordComponent },
  { path: 'settings/keyword/update-keyword', component: UpdateKeywordComponent },
  { path: 'settings/role/add-role', component: AddRoleComponent },
  { path: 'settings/role/view-role', component: ViewRoleComponent },
  { path: 'settings/role/update-role', component: UpdateRoleComponent },
  { path: 'settings/module/add-module', component: AddModuleComponent },
  { path: 'settings/module/view-module', component: ViewModuleComponent },
  { path: 'settings/module/update-module', component: UpdateModuleComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  // content authorizer
  {
    path: 'ca-content-authorization', component: ContentAuthorizationComponent,
    children: [
      { path: 'ca-articles', component: ArticlesComponent },
      { path: 'ca-audio-clip', component: AudioClipComponent },
      { path: 'ca-books', component: BooksComponent },
      { path: 'ca-case-study', component: CaseStudyComponent },
      { path: 'ca-images', component: ImagesComponent },
      { path: 'ca-video-clip', component: VideoClipComponent },
      { path: '', redirectTo: 'ca-articles', pathMatch: 'full' }
    ]
  },
  {
    path: 'ca-authorization-history', component: AuthorizationHistoryComponent,
    children: [
      { path: 'ca-articles-history', component: ArticlesHistoryComponent },
      { path: 'ca-audio-clip-history', component: AudioClipHistoryComponent },
      { path: 'ca-books-history', component: BooksHistoryComponent },
      { path: 'ca-case-study-history', component: CaseStudyHistoryComponent },
      { path: 'ca-images-history', component: ImagesHistoryComponent },
      { path: 'ca-video-clip-history', component: VideoClipHistoryComponent },
      { path: '', redirectTo: 'ca-articles-history', pathMatch: 'full' }
    ]
  },
  { path: 'ca-content-providers', component: ViewContentProvidersComponent },

  //content provider
  { path: 'submissions/cp-single-submission', component: SingleSubmissionComponent },
  {
    path: 'submissions/cp-multiple-submission', component: MultipleSubmissionComponent,
    children: [
      { path: 'cp-articles', component: CpArticlesComponent },
      { path: 'cp-audio-clip', component: CpAudioClipComponent },
      { path: 'cp-books', component: CpBooksComponent },
      { path: 'cp-case-study', component: CpCaseStudyComponent },
      { path: 'cp-images', component: CpImagesComponent },
      { path: 'cp-video-clip', component: CpVideoClipComponent },
      { path: '', redirectTo: 'cp-articles', pathMatch: 'full' }
    ]
  },
  {
    path: 'cp-history', component: ContentProviderHistoryComponent,
    children: [
      { path: 'cp-articles-history', component: CpArticlesHistoryComponent },
      { path: 'cp-audio-clip-history', component: CpAudioClipHistoryComponent },
      { path: 'cp-books-history', component: CpBooksHistoryComponent },
      { path: 'cp-case-study-history', component: CpCaseStudyHistoryComponent },
      { path: 'cp-images-history', component: CpImagesHistoryComponent },
      { path: 'cp-video-clip-history', component: CpVideoClipHistoryComponent },
      { path: '', redirectTo: 'cp-articles-history', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

