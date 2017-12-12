import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';

import { HttpModule, Http,XHRBackend,RequestOptions } from '@angular/http';

import { HighlightDirective }  from '../directives/highlight.directive';



@NgModule({
  imports:      [ 
    CommonModule,
    HttpModule,    
    MaterialModule,
    MdDatepickerModule, 
    MdNativeDateModule
  ],
  declarations: [ 
    HighlightDirective
 ],
  exports:      [ 
    HighlightDirective,
    CommonModule, 
    HighlightDirective,
    HttpModule,
    TranslateModule,
    MaterialModule 
  ]
})
export class SharedModule { }