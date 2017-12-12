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
import { FAQComponent } from './views/pages/core/faq/faq.component';
import { HomeComponent } from './views/pages/page/home/home.component';
import { LoginComponent } from './views/pages/page/login/login.component';
import { ResultsPage } from './views/pages/page/results/results.component';
import { AdvancedSearch } from './views/pages/page/advanced/advanced.component';
import { FiltermanagerComponent } from './views/pages/page/filtermanager/filtermanager.component';
// import { ProvidersComponent } from './views/pages/core/providers/providers.component';
// import { AuthorizersComponent } from './views/pages/core/authorizers/authorizers.component';
// import { VendersComponent } from './views/pages/core/venders/venders.component';

import { ResultComponent } from './views/pages/page/result/result.component';
import { ContactComponent } from './views/pages/core/contact/contact.component';
import { UserDashboardComponent } from './views/pages/core/userdashboard/userdashboard.component';


import { StartupService } from './services/settings/application-startup.service';
import { CommonService } from './services/settings/common.service';
import { SearchService } from './services/businessservices/domain/search/search.service';
import { UserService } from './services/businessservices/domain/social/user.service';
import { MenuService } from './services/businessservices/domain/menu/menu.service';

import { ToastService } from './services/toast/toast.service';
import { ToastCommunicationService } from './services/toast/toast-communication.service';

import { DialogsService } from './services/dialog/dialogs.service';
import { DialogsModule } from './services/dialog/dialogs.module';

import { LocalStorageStore } from './services/storage/local-storage.service';
import { DataTableComponent } from './views/widgets/core/data-table/data-table.component';

import { Angular2SocialLoginModule } from "angular2-social-login";

import 'hammerjs';
// d3 and nvd3 should be included somewhere
import 'd3';

// AoT requires an exported function for factories
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, 'app/globalization/', '.json');
}

export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

let providers = {
    "google": {
      "clientId": "460823695595-ftdfgd0jlgmh2dqefatsuv7uveghf3bj.apps.googleusercontent.com"
    },
    "linkedin": {
      "clientId": "81cksmo53s75x1"
    },
    "facebook": {
      "clientId": "371079366643574",
      "apiVersion": "v2.4"
    }
  };


    //   ProvidersComponent,
    // AuthorizersComponent,
    // VendersComponent

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    DataTableComponent,
    UserDashboardComponent,
    ResultsPage,
    ResultComponent,
    LoginComponent,
    AdvancedSearch,
    FiltermanagerComponent,
    FAQComponent,
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    Angular2SocialLoginModule,
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
    CommonService,
    ToastService,
    SearchService,
    UserService,
    MenuService,
    ToastCommunicationService,
    DialogsService,
    LocalStorageStore
  ],
  exports: [
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
Angular2SocialLoginModule.loadProvidersScripts(providers);
