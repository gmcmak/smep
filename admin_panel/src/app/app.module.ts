import { NgModule, APP_INITIALIZER } from '@angular/core'
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { NgUploaderModule } from 'ngx-uploader';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ToastyModule } from 'ng2-toasty';
import { DndModule } from 'ng2-dnd';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { LocalStorageModule } from 'angular-2-local-storage';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from './modules/shared.module';

import { AboutComponent } from './views/pages/core/about/about.component';
import { HomeComponent } from './views/pages/core/home/home.component';
import { ContactComponent } from './views/pages/core/contact/contact.component';
import { UserDashboardComponent } from './views/pages/core/userdashboard/userdashboard.component';
import {DataTableModule} from "angular2-datatable";

//import { Content_providerComponent} from './views/forms/content_provider/content_provider.component';

import { StartupService } from './services/settings/application-startup.service';

import { ToastService } from './services/toast/toast.service';
import { ToastCommunicationService } from './services/toast/toast-communication.service';

import { DialogsService } from './services/dialog/dialogs.service';
import { DialogsModule } from './services/dialog/dialogs.module';

import { LocalStorageStore } from './services/storage/local-storage.service';
import { DataTableComponent } from './views/widgets/widget/data-table/data-table.component';

/**
 * backend connectivity
 */
import { UserService } from "./services/businessservices/core/user/user.service";

import 'hammerjs';
// d3 and nvd3 should be included somewhere
import 'd3';
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
import { ViewAuthorComponent } from './views/pages/core/admin/settings/author/view-author/view-author.component';
import { AddAuthorComponent } from './views/pages/core/admin/settings/author/add-author/add-author.component';
import { ViewCategoryComponent } from './views/pages/core/admin/settings/category/view-category/view-category.component';
import { AddCategoryComponent } from './views/pages/core/admin/settings/category/add-category/add-category.component';
import { ViewExploreComponent } from './views/pages/core/admin/settings/explore/view-explore/view-explore.component';
import { AddExploreComponent } from './views/pages/core/admin/settings/explore/add-explore/add-explore.component';
import { ViewKeywordComponent } from './views/pages/core/admin/settings/keyword/view-keyword/view-keyword.component';
import { AddKeywordComponent } from './views/pages/core/admin/settings/keyword/add-keyword/add-keyword.component';
import { ViewRoleComponent } from './views/pages/core/admin/settings/role/view-role/view-role.component';
import { AddRoleComponent } from './views/pages/core/admin/settings/role/add-role/add-role.component';
//import { ViewIndividualComponent } from './views/pages/core/admin/content-provider/individual/view-individual/view-individual.component';
//import { AddIndividualComponent } from './views/pages/core/admin/content-provider/individual/add-individual/add-individual.component';
import { ViewInstituteComponent } from './views/pages/core/admin/institute/view-institute/view-institute.component';
import { AddInstituteComponent } from './views/pages/core/admin/institute/add-institute/add-institute.component';
import { ProfileComponent } from './views/pages/core/admin/profile/profile.component';

//content Authorizer
import { ContentAuthorizationComponent } from './views/pages/core/content-authorizer/content-authorization/content-authorization.component';
import { AuthorizationHistoryComponent } from './views/pages/core/content-authorizer/authorization-history/authorization-history.component';
import { ViewContentProvidersComponent } from './views/pages/core/content-authorizer/view-content-providers/ca-content-provider.component';
import { ArticlesComponent } from './views/pages/core/content-authorizer/content-authorization/articles/ca-articles.component';
import { AudioClipComponent } from './views/pages/core/content-authorizer/content-authorization/audio-clip/ca-audio-clip.component';
import { BooksComponent } from './views/pages/core/content-authorizer/content-authorization/books/ca-books.component';
import { CaseStudyComponent } from './views/pages/core/content-authorizer/content-authorization/case-study/ca-case-study.component';
import { ImagesComponent } from './views/pages/core/content-authorizer/content-authorization/images/ca-images.component';
import { VideoClipComponent } from './views/pages/core/content-authorizer/content-authorization/video-clip/ca-video-clip.component';
import { ArticlesHistoryComponent } from './views/pages/core/content-authorizer/authorization-history/articles/articles-history.component';
import { AudioClipHistoryComponent } from './views/pages/core/content-authorizer/authorization-history/audio-clip/audio-clip-history.component';
import { BooksHistoryComponent } from './views/pages/core/content-authorizer/authorization-history/books/books-history.component';
import { CaseStudyHistoryComponent } from './views/pages/core/content-authorizer/authorization-history/case-study/case-study-history.component';
import { ImagesHistoryComponent } from './views/pages/core/content-authorizer/authorization-history/images/images-history.component';
import { VideoClipHistoryComponent } from './views/pages/core/content-authorizer/authorization-history/video-clip/video-clip-history.component';

//content provider
import { SingleSubmissionComponent } from './views/pages/core/content-provider/cp-submissions/single-submission/single-submission.component';
import { MultipleSubmissionComponent } from './views/pages/core/content-provider/cp-submissions/multiple-submission/multiple-submission.component';
import { ContentProviderHistoryComponent } from './views/pages/core/content-provider/cp-history/content-provider-history.component';
import { CpArticlesComponent } from './views/pages/core/content-provider/cp-submissions/multiple-submission/articles/cp-articles.component';
import { CpAudioClipComponent } from './views/pages/core/content-provider/cp-submissions/multiple-submission/audio-clip/cp-audio-clip.component';
import { CpBooksComponent } from './views/pages/core/content-provider/cp-submissions/multiple-submission/books/cp-books.component';
import { CpCaseStudyComponent } from './views/pages/core/content-provider/cp-submissions/multiple-submission/case-study/cp-case-study.component';
import { CpImagesComponent } from './views/pages/core/content-provider/cp-submissions/multiple-submission/images/cp-images.component';
import { CpVideoClipComponent } from './views/pages/core/content-provider/cp-submissions/multiple-submission/video-clip/cp-video-clip.component';
import { CpArticlesHistoryComponent } from './views/pages/core/content-provider/cp-history/articles/cp-articles-history.component';
import { CpAudioClipHistoryComponent } from './views/pages/core/content-provider/cp-history/audio-clip/cp-audio-clip-history.component';
import { CpBooksHistoryComponent } from './views/pages/core/content-provider/cp-history/books/cp-books-history.component';
import { CpCaseStudyHistoryComponent } from './views/pages/core/content-provider/cp-history/case-study/cp-case-study-history.component';
import { CpImagesHistoryComponent } from './views/pages/core/content-provider/cp-history/images/cp-images-history.component';
import { CpVideoClipHistoryComponent } from './views/pages/core/content-provider/cp-history/video-clip/cp-video-clip-history.component';

// AoT requires an exported function for factories
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, 'app/globalization/', '.json');
}

export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    DataTableComponent,
    UserDashboardComponent,
    ContentProviderComponent,
    ContentAuthorizerComponent,
    AdminDashboardComponent, //admin dashboard
    ViewUsersComponent, //admin view users
    AddUsersComponent,  //admin add users
    ChangePasswordComponent, //admin user's password changing
    ViewAuthorizersComponent, //admin view authorizers
    AddAuthorizersComponent, //admin add athorizers
    AddProvidersComponent, //admin add content providers
    ViewProvidersComponent, //admin add content providers
    //ViewIndividualComponent,
    //AddIndividualComponent,
    ViewInstituteComponent,
    AddInstituteComponent,
    ViewConsumersComponent, //admin view content consumers
    AddConsumersComponent, //admin add content consumers
    ContentAuthorizerReportComponent, //admin content authorizer report
    ContentProviderReportComponent, //admin content provider report
    LoginComponent, //login page
    ViewAuthorComponent,
    AddAuthorComponent,
    ViewCategoryComponent,
    AddCategoryComponent,
    ViewExploreComponent,
    AddExploreComponent,
    ViewKeywordComponent,
    AddKeywordComponent,
    ViewRoleComponent,
    AddRoleComponent,
    ProfileComponent,

    ContentAuthorizationComponent, //content authorizers
    AuthorizationHistoryComponent,
    ViewContentProvidersComponent,

    ArticlesComponent,
    AudioClipComponent,
    BooksComponent,
    CaseStudyComponent,
    ImagesComponent,
    VideoClipComponent,

    ArticlesHistoryComponent,
    AudioClipHistoryComponent,
    BooksHistoryComponent,
    CaseStudyHistoryComponent,
    ImagesHistoryComponent,
    VideoClipHistoryComponent,

    SingleSubmissionComponent, //content provider
    MultipleSubmissionComponent,
    ContentProviderHistoryComponent,

    CpArticlesComponent, //multiple submission component @ content provider
    CpAudioClipComponent,
    CpBooksComponent,
    CpCaseStudyComponent,
    CpImagesComponent,
    CpVideoClipComponent,

    CpArticlesHistoryComponent, //multiple submission history
    CpAudioClipHistoryComponent,
    CpBooksHistoryComponent,
    CpCaseStudyHistoryComponent,
    CpImagesHistoryComponent,
    CpVideoClipHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
      }
    }),
    ToastyModule.forRoot(), 
    DndModule.forRoot(), 
    SlimLoadingBarModule.forRoot(),
    DialogsModule,
    LocalStorageModule.withConfig({
        prefix: 'iecd-citizen-app',
        storageType: 'localStorage'
    }),
    NgxDatatableModule,
    NgUploaderModule,
    NgxChartsModule
  ],
  providers: [
    StartupService,
    {
      // Provider for APP_INITIALIZER
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    UserService,
    ToastService,
    ToastCommunicationService,
    DialogsService,
    LocalStorageStore
  ],
  exports: [
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
