import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';


import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import { MatDialog,
  MatDialogRef, 
  MAT_DIALOG_DATA, MatDialogClose
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent {

  constructor(
    private crd: CrudService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private store: LocalStorageService,
    private datePipe: DatePipe
  ) {}

  searchForm: FormGroup = new FormGroup({
    filter: new FormControl('')
  })

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    
  }

  dataSource1: any;
  displayedColumns1 = ['channelId', 'channel', 'sourceId', 'sourceName', 'sourceDesc','active', 'actions'];
  tableValues: any;
  tableValuesobj: any;
  createFlag: boolean = true;
  channelTableFlag: boolean = true;
  sorceList = [
    {id: 'omp', name: 'OMPL'},
    {id: 'csp', name: 'CSPL'},
    {id: 'dp', name: 'DPL'}
  ];

  channelList = [
    {id: 'W11', name: 'WEB'},
    {id: 'W11', name: 'Whatsapp'},
    {id: 'Sa1', name: 'Saathi'}
  ]

  channelForm!: FormGroup;
  filterForm!: FormGroup;
  loginName: any;

  createdByVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  updatedByVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  sourceidVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  sourcenameVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  sourceDescVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  channelVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  osNamespaceVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  osBucketnameVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  notesVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  ngOnInit(): void {

    this.channelForm = this.formBuilder.group({
      sourceid: this.sourceidVal,
      sourcename: this.sourcenameVal,
      sourceDesc: this.sourceDescVal,
      channel: this.channelVal,
      osNamespace: this.osNamespaceVal,
      osBucketname: this.osBucketnameVal,
      notes: this.notesVal,
      createdBy: [''],
      updatedBy: ['']
    });

    this.route.queryParams.subscribe(params => {
      this.loginName = params['user'];
    });
    
    this.loginName = this.store.retrieve('username')
    // if (this.isLocalStorageAvailable) {
    //   this.loginName = this.storage.getItem('username');
    //   // alert(this.loginName)
    // }

    this.filterForm = this.formBuilder.group({
      filter: ['', Validators.required]
    });
    
    this.getChannel() 
    // const currentDateAndTime = this.Date_time.transform(new Date(), 'YYYY-MM-dh:mm:ssazzzz');
    // console.log(currentDateAndTime);

  }

  isChecked: boolean = true;
  activeChange(eve: any, element: any) {
    console.log(eve.target.checked)
    console.log(element)
    this.spinner.show();
    // this.crd.toggleChannel(1, 'Test')
    this.crd.toggleChannel(element.channelId, element.sourceId)
    .subscribe((data:any) => {
      if(data['status'] === 'S') {
        this.spinner.hide();
        this.toastr.success(data['statusMsg'], 'Success');
      } else {
        this.spinner.hide();
        this.toastr.error(data['statusMsg'], 'Error');
      }
    })
  }

  nodataFound: any = [];
  getChannel() { 
    this.spinner.show();
    this.channelTableFlag = true;
    this.channelButtonFlag = true;
    this.channelForm.reset();
    this.crd.getChannel('')
    .subscribe((data: any) => {
      if(data['status'] === 'S') {
        this.spinner.hide();
        this.tableValuesobj = data.obj;
        console.log(this.tableValuesobj);
        console.log(this.tableValuesobj.length);
        // let selectedItem = this.tableValuesobj.find(item => item.id === id);
        // this.tableValuesobj[3].isActive = 'N';
        // console.log(this.tableValuesobj[3].isActive)
        for(var i =0; this.tableValuesobj.length > i; i++) {
          if(this.tableValuesobj[i].isActive === 'Y') {
            this.isChecked = true; 
          } else {
            // console.log(this.tableValuesobj[i].isActive)
            this.isChecked = false;
          }
        }
        this.dataSource1 = new MatTableDataSource(this.tableValuesobj);
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
      } else {
        if(data.obj === null) {
          this.nodataFound = [];
        }this.dataSource1 = new MatTableDataSource(this.nodataFound);
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
        this.spinner.hide();
        this.toastr.error(data['statusMsg'], 'Error');
      }
    });
  }

  viewChannel(element: any) {
    // this.dialog.open(DialogElementsExampleDialog);
    const dialogRef = this.dialog.open(DialogElementsModal, {
      // width: '250px',
      data: element
    });
  }

  newChannel() {
    this.channelForm.controls['createdBy'].disable();
    this.channelForm.controls['createdBy'].setValue(this.loginName);
    this.channelTableFlag = false;
    this.createdByFlag = true;
    this.channelButtonFlag = false;
    this.createFlag = true;
  }

  showChannel() {
    this.getChannel();
  }

  chennlId: any;
  sourceId: any;
  sourceName: any;
  sourceDesc: any;
  channel: any;
  osNamespace: any;
  osBucketname: any;
  notes: any;
  createdBy: any;
  createdByFlag: boolean = true;
  channelButtonFlag: boolean = true;

  editChannel(e: any) {
    this.createFlag = false;
    this.createdByFlag = false;
    this.channelTableFlag = false;
    this.channelButtonFlag = false;
    this.chennlId = e.channelId;
    this.channelForm.controls['sourceid'].setValue(e.sourceId);
    this.channelForm.controls['sourcename'].setValue(e.sourceName);
    this.channelForm.controls['sourceDesc'].setValue(e.sourceDesc);
    this.channelForm.controls['channel'].setValue(e.channel);
    this.channelForm.controls['osNamespace'].setValue(e.osNamespace);
    this.channelForm.controls['osBucketname'].setValue(e.osBucketname);
    this.channelForm.controls['notes'].setValue(e.notes);
    this.channelForm.controls['updatedBy'].setValue(this.loginName);
    this.channelForm.controls['updatedBy'].disable();
    // this.channelForm.controls['updatedBy'].setValue(e.updatedBy);
    // let sourceId = this.channelForm.controls['createdBy'].setValue(e.createdBy);
  }

  channelSelect(eve: any, input: any) {
    if(input === 'source') {
      console.log(eve.name + 'source')
      this.sourceId = eve.id;
      this.sourceName = eve.name;
    } else if(input === 'channel') {
      console.log(eve.name + 'channel')
      this.channel = eve.name;
    }
  }

  channelSubmit() { 
    this.channelForm.controls['updatedBy'].clearValidators();
    this.channelForm.controls['updatedBy'].updateValueAndValidity();
    if(this.channelForm.valid) {
      this.sourceId = this.channelForm.controls['sourceid'].value;
    this.sourceName = this.channelForm.controls['sourcename'].value;
    this.sourceDesc = this.channelForm.controls['sourceDesc'].value;
    this.channel = this.channelForm.controls['channel'].value;
    this.osNamespace = this.channelForm.controls['osNamespace'].value;
    this.osBucketname = this.channelForm.controls['osBucketname'].value;
    this.notes = this.channelForm.controls['notes'].value;
    this.createdBy = this.channelForm.controls['createdBy'].value;
    this.spinner.show();
    this.crd.createChannel(this.sourceId, this.sourceName, this.sourceDesc, 
      this.channel, this.osNamespace, this.osBucketname, this.notes, this.createdBy)
      .subscribe((data: any) => {
        console.log(data);
        if(data['status'] === 'S') {
          this.getChannel();
          this.spinner.hide();
          this.toastr.success(data['statusMsg'], 'Success');
        } else {
          this.spinner.hide();
          this.toastr.error(data['statusMsg'], 'Error');
        }
      });
    } else {
      this.channelForm.markAllAsTouched();
    }   

  }

  channelUpdate() {
    this.channelForm.controls['createdBy'].clearValidators();
    this.channelForm.controls['createdBy'].updateValueAndValidity();
    if(this.channelForm.valid) {
    this.sourceId = this.channelForm.controls['sourceid'].value;
    this.sourceName = this.channelForm.controls['sourcename'].value;
    this.sourceDesc = this.channelForm.controls['sourceDesc'].value;
    this.channel = this.channelForm.controls['channel'].value;
    this.osNamespace = this.channelForm.controls['osNamespace'].value;
    this.osBucketname = this.channelForm.controls['osBucketname'].value;
    this.notes = this.channelForm.controls['notes'].value;
    let updateBy = this.channelForm.controls['updatedBy'].value;
    // this.createdByFlag = false;
    this.spinner.show();
    this.crd.modifyChannel(this.chennlId, this.sourceId, this.sourceName, this.sourceDesc, 
      this.channel, this.osNamespace, this.osBucketname, this.notes, updateBy)
      .subscribe((data: any) => {
        console.log(data);
        if(data['status'] === 'S') {
          this.spinner.hide();
          this.getChannel();
          this.toastr.success(data['statusMsg'], 'Success');
        } else {
          this.spinner.hide();
          this.toastr.error(data['statusMsg'], 'Error');
        }
      });
    } else {
      this.channelForm.markAllAsTouched();
    }
  }

  change() {

  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource1.filter);
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

}


@Component({
  selector: 'modal',
  templateUrl: 'modal.html',
  // standalone: true,
  // imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DialogElementsModal {
  constructor(
    private datePipe: DatePipe,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogElementsModal>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    createdDate: any;
    apiDate: any;
    updatedDate: any;
    starArray: any[] = [];
    apiKey: any;
    
    ngOnInit(): void {
      this.createdDate = this.datePipe.transform(this.data.createdOn, 'yyyy-MM-dd HH:mm:ss');
      this.apiDate = this.datePipe.transform(this.data.apiValidUntil, 'yyyy-MM-dd HH:mm:ss'); 
      this.updatedDate = this.datePipe.transform(this.data.updatedOn, 'yyyy-MM-dd HH:mm:ss');

      for(var i = 0; this.data.apiKey.length > i; i++) {
        this.starArray.push('*');
      }
      let api = this.starArray.join();
      this.apiKey = api.replace(/,/g," ");
    }

    close() {
      this.dialog.closeAll();
    }
    
}