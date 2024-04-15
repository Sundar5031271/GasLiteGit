import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CaseComponent } from './case/case.component';
import { ChannelComponent } from './channel/channel.component';
import { DialogElementsModal, SearchOperationsComponent } from './search-operations/search-operations.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { DashRoutingModule } from './dash-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatNativeDateModule } from '@angular/material/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent,
    CaseComponent,
    ChannelComponent,
    SearchOperationsComponent,
    HomeComponent,
    SideNavComponent,
    MainBodyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    NgSelectModule,
    MatNativeDateModule,
    PdfViewerModule

  ],
  providers: [
    DatePipe
  ]
})
export class DashModule { }
