import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DocgeniTemplateModule } from '@docgeni/template';
import { DOCGENI_SITE_PROVIDERS, RootComponent } from './content/index';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    DocgeniTemplateModule,
  ],
  providers: [...DOCGENI_SITE_PROVIDERS],
  bootstrap: [RootComponent]
})
export class AppModule { }
