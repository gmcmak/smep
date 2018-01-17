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
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

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
import { AuthorizersComponent } from './views/pages/core/admin/institute/authorizers/authorizers.component';
import { ProvidersComponent } from './views/pages/core/admin/institute/providers/providers.component';
import { AuthorService } from './services/businessservices/core/settings/author.service';
import { CategoryService } from './services/businessservices/core/settings/category.service';
import { ExploreService } from './services/businessservices/core/settings/explore.service';
import { KeywordService } from './services/businessservices/core/settings/keyword.service';
import { RoleService } from './services/businessservices/core/settings/role.service';
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
import { InstituteService } from './services/businessservices/core/institute/institute.service';
import { EditProfileComponent } from './views/pages/core/admin/profile/edit-profile/edit-profile.component';
import { AuthorizerService } from './services/businessservices/core/content-authorizer/authorizer.service';
import { ProviderService } from './services/businessservices/core/content-provider/provider.service';
import { ConsumerService } from './services/businessservices/core/content-consumer/consumer.service';
import { ModuleService } from './services/businessservices/core/module/module.service';
import { AddModuleComponent } from './views/pages/core/admin/settings/module/add-module/add-module.component';
import { UpdateModuleComponent } from './views/pages/core/admin/settings/module/update-module/update-module.component';
import { ViewModuleComponent } from './views/pages/core/admin/settings/module/view-module/view-module.component';
import { AddSubjectComponent } from './views/pages/core/admin/settings/subject-area/add-subject/add-subject.component';
import { UpdateSubjectComponent } from './views/pages/core/admin/settings/subject-area/update-subject/update-subject.component';
import { ViewSubjectComponent } from './views/pages/core/admin/settings/subject-area/view subject/view-subject.component';
import { SubjectService } from './services/businessservices/core/subject-area/subject.service';
import { CountryService } from './services/businessservices/core/country/country.service';
import { ProviderProfileComponent } from './views/pages/core/content-authorizer/view-content-providers/provider-profile/provider-profile.component';
import { AddSubmissionComponent } from './views/pages/core/content-provider/cp-submissions/add-submission/add-submission.component';
import { ViewSubmissionComponent } from './views/pages/core/content-provider/cp-submissions/view-submission/view-submission.component';
import { UpdateSubmissionComponent } from './views/pages/core/content-provider/cp-submissions/update-submission/update-submission.component';
import { SubmissionService } from './services/businessservices/core/submission/submission.service';
import { ContentService } from './services/businessservices/core/content/content.service';

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
    UpdateUsersComponent,
    ChangePasswordComponent, //admin user's password changing
    ViewAuthorizersComponent, //admin view authorizers
    AddAuthorizersComponent, //admin add athorizers
    UpdateAuthorizersComponent,
    AddProvidersComponent, //admin add content providers
    ViewProvidersComponent, //admin add content providers
    UpdateProvidersComponent,
    //ViewIndividualComponent,
    //AddIndividualComponent,
    ViewInstituteComponent,
    AddInstituteComponent,
    UpdateInstituteComponent,
    AuthorizersComponent,
    ProvidersComponent,
    ViewConsumersComponent, //admin view content consumers
    AddConsumersComponent, //admin add content consumers
    UpdateConsumersComponent,
    ContentAuthorizerReportComponent, //admin content authorizer report
    ContentProviderReportComponent, //admin content provider report
    LoginComponent, //login page
    ViewAuthorComponent,
    AddAuthorComponent,
    UpdateAuthorComponent,
    ViewCategoryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    ViewExploreComponent,
    AddExploreComponent,
    UpdateExploreComponent,
    ViewKeywordComponent,
    AddKeywordComponent,
    UpdateKeywordComponent,
    ViewRoleComponent,
    AddRoleComponent,
    UpdateRoleComponent,
    ProfileComponent,
    EditProfileComponent,

    ContentAuthorizationComponent, //content authorizers
    AuthorizationHistoryComponent,
    ViewContentProvidersComponent,
    ProviderProfileComponent,

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

    AddSubmissionComponent,
    ViewSubmissionComponent,
    UpdateSubmissionComponent,
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
    CpVideoClipHistoryComponent,

    AddModuleComponent,
    UpdateModuleComponent,
    ViewModuleComponent,

    AddSubjectComponent,
    UpdateSubjectComponent,
    ViewSubjectComponent
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
    AngularMultiSelectModule,
    MultiselectDropdownModule,
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
    AuthorService,
    CategoryService,
    ExploreService,
    KeywordService,
    RoleService,
    InstituteService,
    AuthorizerService,
    ProviderService,
    ConsumerService,
    ModuleService,
    SubjectService,
    CountryService,
    ContentService,
    ToastService,
    ToastCommunicationService,
    DialogsService,
    SubmissionService,
    LocalStorageStore
  ],
  exports: [
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
