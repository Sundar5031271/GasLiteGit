import { Component, ViewChild, } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from '../../services/crud.service';
import { disableDebugTools } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent {
  caseSearchForm!: FormGroup; 
  newCaseForm!: FormGroup;

  constructor(
    private crd: CrudService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource1: any;
  displayedColumns1 = ['caseId', 'agreementId', 'leadId', 'prospectId','custId', 'Actions']; 
  tableValuesobj: any;
  showCaseTable: boolean = false;
  caseButtonFlag: boolean = true;
  caseFormFlag: boolean = false;

  caseList = [
    {id: 'agreementId', name: 'agreementId'},
    {id: 'leadId', name: 'leadId'},
    {id: 'prospectId', name: 'prospectId'},
    {id: 'custId', name: 'custId'}
  ];

  caseidinputVal: FormControl = new FormControl('',[
    Validators.required,
    Validators.pattern(/^-?(0|[1-9]\d*)?$/)
  ]);

  keyValueVal: FormControl = new FormControl('',[
    Validators.required,
    Validators.pattern(/^-?(0|[1-9]\d*)?$/)
  ]);

  keyVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  agreementValueVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  leadValueVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  prospectValueVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  custValueVal: FormControl = new FormControl('',[
    Validators.required
  ]);

  ngOnInit(): void {
    this.caseSearchForm = this.formBuilder.group({
      caseidinput: this.caseidinputVal,
      value: [''],
      fromdate: [''],
      todate: ['']
    });

    this.newCaseForm =  this.formBuilder.group({
      // caseId: ['', Validators.required],
      // keyvalue: this.keyValueVal,
      // key: this.keyVal,
      LeadId: ['Lead ID'],
      leadValue: this.leadValueVal,
      prospectId: ['Prospect ID'],
      prospectValue: this.prospectValueVal,
      custId: ['Customer ID'],
      custValue: this.custValueVal,

      caseAgreement: this.formBuilder.group({
        agreementId: ['Agreement ID'],
        agreementValue: this.agreementValueVal
      }),
      caseLead: this.formBuilder.group({
        LeadId: ['Lead ID'],
        leadValue: this.leadValueVal
      }),
      caseProspect: this.formBuilder.group({
        prospectId: ['Prospect ID'],
        prospectValue: this.prospectValueVal
      }),
      caseCust: this.formBuilder.group({
        custId: ['Customer ID'],
      custValue: this.custValueVal
      })
    });

    // this.newCaseForm.controls['agreementId'].disable();
    // this.newCaseForm.controls['LeadId'].disable();
    // this.newCaseForm.controls['prospectId'].disable();
    // this.newCaseForm.controls['custId'].disable();
    
  }

  fdate: any;
  tdate: any;
  nodataFound: any = [];
  searchCase() { 
    // if(this.caseSearchForm.valid) {
      this.spinner.show();
      
      if(this.caseSearchForm.value.caseidinput === null || this.caseSearchForm.value.caseidinput === '') {
        var caseid = '';
      } else {
        caseid = this.caseSearchForm.value.caseidinput;
      }
      if(this.caseSearchForm.value.value === null || this.caseSearchForm.value.value === '') {
        var val = '';
      } else {
        val = this.caseSearchForm.value.value;
      }
      if(this.caseSearchForm.value.fromdate === null || this.caseSearchForm.value.fromdate === '') { 
        this.fdate = '';
      } else {
        this.fdate = this.datePipe.transform(this.caseSearchForm.value.fromdate, 'dd/MM/yyyy');
      }
      if(this.caseSearchForm.value.todate === null || this.caseSearchForm.value.todate === '') {
        this.tdate = '';
      } else {
        this.tdate = this.datePipe.transform(this.caseSearchForm.value.todate, 'dd/MM/yyyy');
      }
      // this.caseArray.push(this.caseAgreementval, this.caseLeadval, this.caseProspectval, this.caseCustval)
      // this.searchData = this.caseArray.filter(obj => {
      //   return Object.values(obj).some(value => value !== '' && value !== null);
      // });

      this.crd.getCase(caseid, val, this.fdate, this.tdate)
      // this.crd.getCase(caseid)
      .subscribe((data: any) => {
        if(data['status'] === 'S') {
          this.caseSearchForm.reset();
          this.spinner.hide();
          this.showCaseTable = true;
          this.tableValuesobj = data.obj;
          console.log(this.tableValuesobj);
          this.dataSource1 = new MatTableDataSource(this.tableValuesobj);
          setTimeout(() => {
            this.dataSource1.paginator = this.paginator;
            this.dataSource1.sort = this.sort;
          }, 100);
        } else {
          if(data.obj === null) {
            this.nodataFound = [];
          }
          this.dataSource1 = new MatTableDataSource(this.nodataFound);
          setTimeout(() => {
            this.dataSource1.paginator = this.paginator;
            this.dataSource1.sort = this.sort;
          }, 100);
          this.spinner.hide();
          this.toastr.error(data['statusMsg'], 'Error');
        }
      });
    // } else {
    //   this.caseSearchForm.markAllAsTouched();
    // }
  }

  getCase() {

  }

  newCase() {
    this.caseButtonFlag = false;
    this.caseFormFlag = true;
    this.createCaseFlag = true;
    this.newCaseForm.reset();
    this.newCaseForm.enable();
    this.newCaseForm.markAsUntouched();
  }

  showCase() {
    this.caseButtonFlag = true;
    this.caseFormFlag = false;
    this.newCaseForm.markAsUntouched();
  }
  
  caseKey: any;
  caseValue: any;
  // caseInputKey(eve: any, input: string) {
  //   if(eve.target.value.length > 0 && eve.target.value !== '') {
  //     switch (input) {
  //       case 'agreementId': {
  //         this.caseKey = 'agreementId';
  //         this.caseValue =  this.newCaseForm.controls['agreementValue'].value;
  //         this.newCaseForm.controls['leadValue'].disable();  
  //         this.newCaseForm.controls['prospectValue'].disable();  
  //         this.newCaseForm.controls['custValue'].disable(); 
  //         this.newCaseForm.clearValidators();
  //         this.newCaseForm.updateValueAndValidity();
  //         break; 
  //       }
  //       case 'LeadId': {
  //         this.caseKey = 'leadId';
  //         this.caseValue =  this.newCaseForm.controls['leadValue'].value;
  //         this.newCaseForm.controls['agreementValue'].disable();  
  //         this.newCaseForm.controls['prospectValue'].disable();  
  //         this.newCaseForm.controls['custValue'].disable(); 
  //         this.newCaseForm.clearValidators();
  //         this.newCaseForm.updateValueAndValidity(); 
  //         break;         
  //       }
  //       case 'prospectId': {
  //         this.caseKey = 'prospectId';
  //         this.caseValue =  this.newCaseForm.controls['prospectValue'].value;
  //         this.newCaseForm.controls['agreementValue'].disable();  
  //         this.newCaseForm.controls['leadValue'].disable();  
  //         this.newCaseForm.controls['custValue'].disable(); 
  //         this.newCaseForm.clearValidators();
  //         this.newCaseForm.updateValueAndValidity();
  //         break;         
  //       }
  //       case 'custId': {
  //         this.caseKey = 'custId';
  //         this.caseValue =  this.newCaseForm.controls['custValue'].value;
  //         this.newCaseForm.controls['agreementValue'].disable();  
  //         this.newCaseForm.controls['prospectValue'].disable();  
  //         this.newCaseForm.controls['leadValue'].disable(); 
  //         this.newCaseForm.clearValidators();
  //         this.newCaseForm.updateValueAndValidity();
  //         break;         
  //       }
  //       default: {
  //         break;         
  //       }
  //     }
  //   } else {
  //     this.newCaseForm.controls['agreementValue'].enable();  
  //     this.newCaseForm.controls['leadValue'].enable();  
  //     this.newCaseForm.controls['prospectValue'].enable();  
  //     this.newCaseForm.controls['custValue'].enable(); 
  //   }
  // }

  formArray: any [] = [];
  caseArray : any[] = [];
  createCaseFlag: boolean = true;
  inputValues: any = [];

  jsonData: any;
  filterEmptyData() {
    this.jsonData = Object.keys(this.jsonData)
      .filter(key => this.jsonData[key] !== null && this.jsonData[key] !== "")
      .reduce((obj: any, key) => {
        obj[key] = this.jsonData[key];
        console.log(obj);
        return obj;
      }, {});
  }
  obj: any;
  filterEmptyDataFromMultiJson() {
    this.jsonArray.forEach((jsonObj:any, index:any) => {
      this.jsonArray[index] = Object.keys(jsonObj)
        .filter(key => jsonObj[key] !== null && jsonObj[key] !== "")
        .reduce((obj:any, key) => {
          obj[key] = jsonObj[key];
          console.log(obj);
          this.obj = obj;
          return obj;
        }, {});
    });
    // this.inputValues.push(this.obj);
    // console.log(this.inputValues);
  }
  jsonArray: any = [];
  jsonObjects: any[] = [
    { name: 'John', age: 25, city: 'New York' },
    { name: '', age: null, city: '' },
    { name: 'Alice', age: 30, city: 'Los Angeles' },
    // Add more JSON objects as needed
  ];
  filteredData: any[] = [];
  filterEmptyDatajsonObjects() {
    this.filteredData = this.jsonObjects.filter(obj => {
      // Filter out objects with empty strings or null values
      return Object.values(obj).some(value => value !== '' && value !== null);
    });
    console.log(this.filteredData);
  }
  caseAgreementval: any;
  caseLeadval: any;
  caseProspectval: any;
  caseCustval: any;
  insertCase() { 

    let caseAgreement = this.newCaseForm.get('caseAgreement')?.get('agreementValue')?.value;
    let caseLead = this.newCaseForm.get('caseLead')?.get('leadValue')?.value;
    let caseProspect = this.newCaseForm.get('caseProspect')?.get('prospectValue')?.value;
    let caseCust = this.newCaseForm.get('caseCust')?.get('custValue')?.value;

    if(caseAgreement === '' && caseLead === '' && caseProspect === '' && caseCust === '') {
      this.newCaseForm.markAllAsTouched(); 
    } else {
      this.caseInsert();
      // console.log(this.caseArray);
    }

    
    // console.log(this.caseArray);
    // let agreementValue = this.newCaseForm.controls['agreementValue'].value;  
    // let leadValue = this.newCaseForm.controls['leadValue'].value;  
    // let prospectValue = this.newCaseForm.controls['prospectValue'].value;  
    // let custValue = this.newCaseForm.controls['custValue'].value; 
    // if(agreementValue === '' && leadValue === '' && prospectValue === '' && custValue === '') {
    //   this.newCaseForm.markAllAsTouched();
    // } else if(agreementValue === '') {

    // } else {
    //   console.log("agreementValue => "+agreementValue);
    //   console.log("leadValue => "+leadValue);
    //   console.log("prospectValue => "+prospectValue);
    //   console.log("custValue => "+custValue);
    // }
    // if(this.newCaseForm.valid) {
    //   this.spinner.show();
    //   this.crd.createCase( this.caseKey, this.caseValue)
    //   .subscribe((data: any) => {
    //     console.log(data);
    //     if(data['status'] === 'S') {
    //       // this.toastr.success('Success', 'Success')
    //       this.spinner.hide();
    //       this.caseFormFlag = false;
    //       this.caseButtonFlag = true;
    //       this.newCaseForm.reset();
    //       this.caseSearchForm.reset();
    //     } else {
    //       this.toastr.error(data['statusMsg'], 'Error');
    //       this.spinner.hide();
    //       this.newCaseForm.reset();
    //     }
    //   });
    // } else {
    //   this.newCaseForm.markAllAsTouched();
    // }
    
  }

  updateCase() {
    let caseAgreement = this.newCaseForm.get('caseAgreement')?.get('agreementValue')?.value;
    let caseLead = this.newCaseForm.get('caseLead')?.get('leadValue')?.value;
    let caseProspect = this.newCaseForm.get('caseProspect')?.get('prospectValue')?.value;
    let caseCust = this.newCaseForm.get('caseCust')?.get('custValue')?.value;

    // this.updatecaseId
    // this.updateagree
    // this.updatelead
    // this.updateprospect
    // this.updatecust 
    console.log(this.updatecaseId);
    console.log(this.updateagree);
    console.log(this.updatelead);
    console.log(this.updateprospect);
    console.log(this.updatecust);
    if(caseAgreement === '' && caseLead === '' && caseProspect === '' && caseCust === '') {
      this.newCaseForm.markAllAsTouched(); 
    } else {
      this.caseArray = []; 
      if(this.updateagree !== undefined || caseAgreement === null ) {
        this.caseAgreementval = { "value": ''}
      } else {
        // this.newCaseForm.get('caseAgreement')?.get('agreementValue')?.markAsTouched();
        this.caseAgreementval = {"key": "agreementId", "value": this.newCaseForm.get('caseAgreement')?.get('agreementValue')?.value};
      }
      if(this.updatelead !== undefined || caseLead === null) {
        this.caseLeadval = { "value": ''}
      } else {
        // this.newCaseForm.get('caseLead')?.get('leadValue')?.markAsTouched();
        this.caseLeadval = {"key": "leadId", "value": this.newCaseForm.get('caseLead')?.get('leadValue')?.value};
      }
      if(this.updateprospect !== undefined || caseProspect === null) {
        this.caseProspectval = { "value": ''}
      } else {
        // this.newCaseForm.get('caseProspect')?.get('prospectValue')?.markAsTouched();
        this.caseProspectval = {"key": "prospectId", "value": this.newCaseForm.get('caseProspect')?.get('prospectValue')?.value};
      }
      if(this.updatecust !== undefined || caseCust === null) {
        this.caseCustval = { "value": ''}
      } else {
        // this.newCaseForm.get('caseCust')?.get('custValue')?.markAsTouched();
        this.caseCustval = {"key": "custId", "value": this.newCaseForm.get('caseCust')?.get('custValue')?.value};
      }
      this.caseArray.push(this.caseAgreementval, this.caseLeadval, this.caseProspectval, this.caseCustval)
      this.filteredData = this.caseArray.filter(obj => {
        return Object.values(obj).some(value => value !== '' && value !== null);
      });
      console.log(this.filteredData.length);
      console.log(this.filteredData);
      if(this.filteredData.length === 0) {
        this.newCaseForm.markAllAsTouched();
      } else {
        this.caseUpdate(this.updatecaseId, this.filteredData);
      }
      // this.caseUpdate(this.updatecaseId, this.filteredData);
    }
  }

  caseInsert() {
    this.caseArray = []; 
    let caseAgreement = this.newCaseForm.get('caseAgreement')?.get('agreementValue')?.value;
    let caseLead = this.newCaseForm.get('caseLead')?.get('leadValue')?.value;
    let caseProspect = this.newCaseForm.get('caseProspect')?.get('prospectValue')?.value;
    let caseCust = this.newCaseForm.get('caseCust')?.get('custValue')?.value;
    if(caseAgreement === '' || caseAgreement === null) {
      this.caseAgreementval = {"value": this.newCaseForm.get('caseAgreement')?.get('agreementValue')?.value};
    } else {
      this.caseAgreementval = {"key": "agreementId", "value": this.newCaseForm.get('caseAgreement')?.get('agreementValue')?.value};
    }
    if(caseLead === '' || caseLead === null) {
      this.caseLeadval = {"value": this.newCaseForm.get('caseLead')?.get('leadValue')?.value};
    } else {
      this.caseLeadval = {"key": "leadId", "value": this.newCaseForm.get('caseLead')?.get('leadValue')?.value};
    }
    if(caseProspect === '' || caseProspect === null) {
      this.caseProspectval = {"value": this.newCaseForm.get('caseProspect')?.get('prospectValue')?.value};
    } else {
      this.caseProspectval = {"key": "prospectId", "value": this.newCaseForm.get('caseProspect')?.get('prospectValue')?.value};
    }
    if(caseCust === '' || caseCust === null) {
      this.caseCustval = {"value": this.newCaseForm.get('caseCust')?.get('custValue')?.value};
    } else {
      this.caseCustval = {"key": "custId", "value": this.newCaseForm.get('caseCust')?.get('custValue')?.value};
    }
    this.caseArray.push(this.caseAgreementval, this.caseLeadval, this.caseProspectval, this.caseCustval)
    this.filteredData = this.caseArray.filter(obj => {
      return Object.values(obj).some(value => value !== '' && value !== null);
    });
    console.log(this.filteredData);
    this.crd.createCase(this.filteredData)
      .subscribe((data: any) => {
        console.log(data);
      if(data['status'] === 'S') {
        this.toastr.success(data['statusMsg'], 'Success')
        this.spinner.hide();
        this.caseFormFlag = false;
        this.caseButtonFlag = true;
        this.newCaseForm.reset();
        this.caseSearchForm.reset();
      } else {
        this.toastr.error(data['statusMsg'], 'Error');
        this.spinner.hide();
        this.newCaseForm.reset();
      }
    });
  }
  
  caseUpdate(caseid: any, filteredData: any) {
    this.spinner.show();
    this.crd.updateCase(caseid, filteredData)
      .subscribe((data: any) => {
        console.log(data);
      if(data['status'] === 'S') {
        this.toastr.success(data['statusMsg'], 'Success')
        this.spinner.hide();
        this.caseFormFlag = false;
        this.caseButtonFlag = true;
        this.caseSearchForm.reset();
        this.updategetcase(caseid);
      } else {
        this.toastr.error(data['statusMsg'], 'Error');
        this.spinner.hide();
        this.newCaseForm.reset();
      }
    });
  }

  updategetcase(caseid: any) {
    this.crd.updategetCase(caseid).subscribe((searchdata: any) => {
      if(searchdata['status'] === 'S') {
        this.tableValuesobj = searchdata.obj;
        this.dataSource1 = new MatTableDataSource(this.tableValuesobj);
        setTimeout(() => {
          this.dataSource1.paginator = this.paginator;
          this.dataSource1.sort = this.sort;
        }, 100);
      } else {
        this.toastr.error(searchdata['statusMsg'], 'Error');
      }
    });
  }

  caseSelect(eve: any) {
    console.log(eve.name);
  } 

  updatecaseId: any;
  updateagree: any;
  updatelead: any;
  updateprospect: any;
  updatecust: any;
  viewCase(eve: any) {
    this.createCaseFlag = false;
    this.caseFormFlag = true;
    this.caseButtonFlag = false;
    this.newCaseForm.reset();
    this.newCaseForm.enable();
    console.log(eve);
    this.updatecaseId = eve.caseId;
    this.updateagree = eve.data.agreementId;
    this.updatelead = eve.data.leadId;
    this.updateprospect = eve.data.prospectId;
    this.updatecust = eve.data.custId;
    console.log(this.updatecaseId);
    if(this.updateagree !== undefined) {
      this.newCaseForm.get('caseAgreement')?.get('agreementValue')?.setValue(eve.data.agreementId);
      this.newCaseForm.get('caseAgreement')?.get('agreementValue')?.disable();
    }
    if(this.updatelead !== undefined) {
      this.newCaseForm.get('caseLead')?.get('leadValue')?.setValue(eve.data.leadId);
      this.newCaseForm.get('caseLead')?.get('leadValue')?.disable();
    }
    if(this.updateprospect !== undefined) {
      this.newCaseForm.get('caseProspect')?.get('prospectValue')?.setValue(eve.data.prospectId);
      this.newCaseForm.get('caseProspect')?.get('prospectValue')?.disable();
    }
    if(this.updatecust !== undefined) {
      this.newCaseForm.get('caseCust')?.get('custValue')?.setValue(eve.data.custId);
      this.newCaseForm.get('caseCust')?.get('custValue')?.disable();
    }
  }
}
