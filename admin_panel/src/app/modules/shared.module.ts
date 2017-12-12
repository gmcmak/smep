import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';

import { HttpModule, Http,XHRBackend,RequestOptions } from '@angular/http';


@NgModule({
  imports:      [ 
    CommonModule,
    HttpModule,    
    MaterialModule,
    MdDatepickerModule, 
    MdNativeDateModule
  ],
  declarations: [ 
 ],
  exports:      [ 
    CommonModule, 
    HttpModule,
    TranslateModule,
    MaterialModule 
  ]
})
export class SharedModule { }