import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 

import { NgxSliderModule } from 'ngx-slider-v2';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DropdownModule } from 'primeng/dropdown';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { LoginPageComponent } from './login-page/login-page.component';


import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashRoutingModule } from './main/dash-routing.module';
// import { AngularFontAwesomeModule } from 'angular-font-awesome'
// import { UnsignComponent } from './unsign/unsign.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogElementsModal, DialogElementsModalPDF } from './main/search-operations/search-operations.component';
import { DatePipe } from '@angular/common';
import { NgImageSliderModule } from 'ng-image-slider';
import { PinchZoomModule } from '@meddv/ngx-pinch-zoom';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DialogElementsModal,
    DialogElementsModalPDF
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule,
    DropdownModule,
    PdfViewerModule,
    NgSelectModule,
    NgxWebstorageModule.forRoot(),
    BackButtonDisableModule.forRoot({
      preserveScroll: true
    }),
    NgxDocViewerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FontAwesomeModule,
    DashRoutingModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgImageSliderModule,
    PinchZoomModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
