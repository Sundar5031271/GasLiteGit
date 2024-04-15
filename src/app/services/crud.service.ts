import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private http: HttpClient,
    
  ) { }
    // cloud URL 
    
  // private otpUrl =   'https://stpcspluatoci.tvscredit.com/stp/cso/310/';
  // private otpUrl =   'https://intranetstpcspluatoci.tvscredit.com/stp/cso/310/';


  // UAT URL
  // private otpUrl = 'https://stpcspluat.tvscredit.com/stp/cso/310/';
  // LIVE URL
   private otpUrl = 'https://stpcspl.tvscredit.com/stp/cso/310/';
  // appsfyer
  // private appsfyrUrl = 'https://api2.appsflyer.com/inappevent/com.tvscs.tvscreditapp';

  // public appsFlyer(eventData: any, lead: any, mobile_no: any) {
  //   const body = {
  //     "appsflyer_id": '1234567890123-1234567',
  //     "eventName": eventData,
  //     "eventValue": lead,
  //     "customer_user_id": mobile_no
  //   }
  //   return this.http.post(`${this.appsfyrUrl}`, body, {headers:{ accept: 'application/json','Content-Type': 'application/json', authentication:'rfNoF5gHodHivMRqBFGdjT',responseType: 'string'}});
  // }

  private baseUrl = 'http://tvscsuatapp147.uatappprvsnet.uatvcn.oraclevcn.com:8082/objectStorage/api/v0/';

  public getChannel(channelID: any) {
    const auth_token = "1234567890";
    const payload = new HttpParams()
      .set('channelID', channelID)
    return this.http.get(`${this.baseUrl}` + 'channel/getChannel',
    { headers: { 'Content-Type': 'application/json', 'X-API-KEY': `1234567890` } });
  }

  public createChannel(sourceId: any, sourceName: any, sourceDesc: any, 
    channel: any, osNamespace: any, osBucketname: any, notes: any, createdBy: any) {
      const payload = {
        'sourceId': sourceId,
        'isActive': 'Y',
        'sourceName': sourceName,
        'sourceDesc': sourceDesc,
        'channel': channel,
        'osNamespace': osNamespace,
        'osBucketname': osBucketname,
        'notes': notes,
        'createdBy': createdBy
      }
      return this.http.post(`${this.baseUrl}` + 'channel/createChannel', payload,
      { headers: { 'Content-Type': 'application/json', 'X-API-KEY': `1234567890` } });
  }

  public modifyChannel(channelId: any, sourceId: any, sourceName: any, sourceDesc: any, 
    channel: any, osNamespace: any, osBucketname: any, notes: any, updatedBy: any) {
      const payload = {
        'channelId': channelId,
        'sourceId': sourceId,
        'sourceName': sourceName,
        'sourceDesc': sourceDesc,
        'channel': channel,
        'osNamespace': osNamespace,
        'osBucketname': osBucketname,
        'notes': notes,
        'updatedBy': updatedBy
      } 
      return this.http.patch(`${this.baseUrl}` + 'channel/modifyChannel', payload,
      { headers: { 'Content-Type': 'application/json', 'X-API-KEY': `1234567890` } });
  }

  public toggleChannel(channelId: any, sourceId: any) {
    const payload = new HttpParams()
      .set('channelID', channelId)
      .set('sourceId', sourceId);
    return this.http.patch(`${this.baseUrl}channel/toggleChannel?${payload}`, payload,
    { headers: { 'X-API-KEY': `1234567890` } });
  }

  public searchOperation(caseid: any, casevalue: any) {
    const payload = new HttpParams()
      .set('caseId', caseid)
      .set('caseValue', casevalue);
    return this.http.post(`${this.baseUrl}obj/getObjByCaseID?${payload}`, payload,
    { headers: { 'Content-Type': 'application/json', 'X-API-KEY': `1234567890` } });
  }

  public uploadObj(docType: any, caseid: any, docFile: any) {
    const param = new HttpParams()
      .set('documentType', docType)
      .set('caseId', caseid);
    const body: FormData = new FormData(); 
    for (var i = 0; i < docFile.length; i++) {
      body.append('file', docFile[i])
    }
    return this.http.post(`${this.baseUrl}obj/uploadObj?${param}`, body,
    { headers: { 'X-API-KEY': `1234567890` } });
  }

  payload: any;
  public getCase(caseid: any, val: any, fDate: any, tDate: any) {
    // public getCase(caseid: any) {
      if(caseid !== '' && fDate !== '' && tDate !== '') {
        alert(fDate)
        this.payload = new HttpParams()
        .set('caseId', caseid)
        .set('fromDate', fDate)
        .set('toDate', tDate)
      } else if(val !== '' && fDate !== '' && tDate !== '') {
        this.payload = new HttpParams()
        .set('value', val)
        .set('fromDate', fDate)
        .set('toDate', tDate)
      } else if(fDate !== '' && tDate !== '') {
        this.payload = new HttpParams()
        .set('fromDate', fDate)
        .set('toDate', tDate)
      } else if(caseid !== '') {
        this.payload = new HttpParams()
        .set('caseId', caseid)
      } else if(val !== '') {
        this.payload = new HttpParams()
        .set('value', val)
      } else {
        this.payload = new HttpParams()
        .set('caseId', caseid)
        .set('value', val)
        .set('fromDate', fDate)
        .set('toDate', tDate)
      }
      
    // const payload = new HttpParams()
    //   .set('caseId', caseid)
      // .set('value', val)
      // .set('fromDate', fDate)
      // .set('toDate', tDate)
    return this.http.get(`${this.baseUrl}case/getCase?${this.payload}`,
    { headers: { 'Content-Type': 'application/json', 'X-API-KEY': `1234567890` } });
  }

  public updategetCase(caseid: any) {
    const payload = new HttpParams()
    .set('caseId', caseid)
    return this.http.get(`${this.baseUrl}case/getCase?${payload}`,
    { headers: { 'Content-Type': 'application/json', 'X-API-KEY': `1234567890` } });
  }

  public createCase(caseArray: any) {
      const payload = {
        "data": caseArray
      }
      console.log(caseArray);
      return this.http.post(`${this.baseUrl}` + 'case/createCase', payload,
      { headers: { 'Content-Type': 'application/json', 'X-API-KEY': `1234567890` } });
  }

  public updateCase(caseid: any, caseArray: any) {
    const payload = {
      "caseId": caseid,
      "data": caseArray
    }
    console.log(caseArray);
    return this.http.post(`${this.baseUrl}` + 'case/createCase', payload,
    { headers: { 'Content-Type': 'application/json', 'X-API-KEY': `1234567890` } });
  }

  public getAccessKey(data: any) {
    const payload = new HttpParams()
      .set('apikey', 'BZSV4IuKjEA')
      .set('mobile_no', data)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public getOfferDetails(data: any) {
    const payload = new HttpParams()
      .set('apikey', 'zMkS0kOVpex')
      .set('accessKey', data)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public insertOfferDetails(data: any, id: any, ch_box1: any, ch_box2: any, is_bank: any, is_address: any,loanTypeChanged:any,textBoxValue:any) {
    const payload = new HttpParams()
      .set('apikey', '7njAZ4NFVU0')
      .set('accessKey', data)
      .set('cust_scheme_id', id)
      .set('ch_box1',ch_box1)
      .set('ch_box2',ch_box2)
      .set('is_bank',is_bank)
      .set('is_address',is_address)
      .set('purpose_loan_code',loanTypeChanged) // textBoxValue
      .set('purpose_remarks',textBoxValue)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public resetKey(data: any) {
    const payload = new HttpParams()
      .set('apikey', 'BZSV4IuKjEA')
      .set('mobile_no', data)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public getCityState(accessKey:any){
    const payload=new HttpParams()
    .set('accessKey',accessKey)
    .set('apikey','EFeu9cnYZIC')
    .set('pincode','600008')
    // console.log("citystate executed");

    return this.http.post(this.otpUrl + 'Process/InProgress',payload)

  }
   public geoUrl="https://nominatim.openstreetmap.org/reverse?format=jsonv2&";
  public reverseGeoCode(latitude:number,longitude:number){
    const payload=new HttpParams()
    .set('lat',latitude.toString())
    .set('lon',longitude.toString())

    return this.http.post(this.geoUrl,{payload})

  }


  

  public sendotp(data: any) {
    const payload = new HttpParams()
      .set('apikey', 'y6zyZqnraAB')
      .set('mobile_no', data)
      .set('source', 'STP_DEV')
      .set('source_key', 'b7PxMrkSDpW')
      .set('lead_id', '')
    return this.http.post(this.otpUrl + 'Process/InProgress', payload)
  }

  public saathi_sendotp(data: any, lead_id: any, sourceKey: any) {
    const payload = new HttpParams()
      .set('apikey', 'y6zyZqnraAB')
      .set('mobile_no', data)
      .set('source', 'STP_SAATHI')
      .set('source_key', sourceKey)
      .set('lead_id', lead_id)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public decrypt(data: any) {
    const payload = new HttpParams()
      .set('apikey', '1m0eYTHhEpJ')
      .set('session_key', data)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public resendotp(data: any, accessKey: any) {
    const payload = new HttpParams()
      .set('apikey', 'kMZ35UaOnX9')
      .set('mobile_no', data)
      .set('accessKey', accessKey)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public verifyotp(data: any, accessKey: any) {
    const payload = new HttpParams()
      .set('apikey', 'zrsRL9tCFul')
      .set('otp_no', data)
      .set('accessKey', accessKey)
      // .set('source_key', 'VWDYR2YsVYa')
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public getProcessStage(accessKey: any) {
    const payload = new HttpParams()
      .set('apikey', 'NLE4mXarPFQ')
      .set('accessKey', accessKey)
      // .set('source_key', 'VWDYR2YsVYa')
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public getAddon(accessKey: any) {
    const payload = new HttpParams()
      .set('apikey', 'MDjEi0P1t7t')
      .set('accessKey', accessKey)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public insertAddon(access_key: any, cs_flag: any, credit_map_id: any, cs_nominee_name: any, 
    cs_rel_nominee: any, cs_mob_no: any, vasArrayStringfy: any, vas_flag: any) {
    const payload = new HttpParams()
      .set('apikey', 'YjOiq59sYKD')
      .set('accessKey', access_key)
      .set('cs_flag', cs_flag)
      .set('ncs_flag', 'N')
      .set('chr_flag', 'N')
      .set('mb_flag', 'N')
      .set('insta_flag', 'N')
      .set('credit_map_id', credit_map_id)
      .set('chr_id', '')
      .set('medibuddy_id', '')
      .set('instacard_id', '')
      .set('non_credit_map_id', '')
      .set('cs_nominee_name', cs_nominee_name)
      .set('cs_rel_nominee', cs_rel_nominee)
      .set('cs_mob_no', cs_mob_no)
      .set('ncs_nominee_name', '')
      .set('ncs_rel_nominee', '')
      .set('ncs_mob_no', '')
      .set('email', '')
      .set('alt_mob_no', '')
      .set('vas_details', vasArrayStringfy)
      .set('vas_flag', vas_flag)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public getDisbursal(access_key: any) {
    const payload = new HttpParams()
      .set('apikey', 'zu5dHuiRO87')
      .set('accessKey', access_key)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public countryCheck(access_key:any,latitude:any,longitude:any){
    // console.log("country called",access_key,latitude,longitude);
    const payload = new HttpParams()
      .set('apikey', 'Aq5e2MJxERe')
     .set('accessKey', access_key)
     .set('lat',latitude)
     .set('lang',longitude)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public esignsendOtp(access_key: any) {
    const payload = new HttpParams()
      .set('apikey', 'qMQ35UaOiY6')
      .set('accessKey', access_key)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public esignverityOtp(access_key: any, otp_no: any) {
    const payload = new HttpParams()
      .set('apikey', 'gdsRL9tNucl')
      .set('accessKey', access_key)
      .set('otp_no', otp_no)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public esignresendOtp(access_key: any) {
    const payload = new HttpParams()
      .set('apikey', 'qTQ35QtOiZ6')
      .set('accessKey', access_key)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public dropout(access_key: any, code: any) {
    const payload = new HttpParams()
      .set('apikey', 'T5XFEZpyXOD')
      .set('accessKey', access_key)
      .set('drop_out_code', code)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public getIRE(access_key: any) {
    const payload = new HttpParams()
      .set('apikey', 'SEZ35UaOGF5')
      .set('accessKey', access_key)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public insertDisbursal(access_key: any, lat: any, lang: any, ip: any) {
    const payload = new HttpParams()
      .set('apikey', 'qAIfmZFgixE')
      .set('accessKey', access_key)
      .set('lat', lat)
      .set('lang', lang)
      .set('ip_address', ip)
      .set('app_name', '')
      .set('app_version', '')
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public insertMFI(access_key: any, Mincome: any, marital: any, Sincome: any, Childincome: any, Fincome: any,
    Motherincome: any, Totalincome: any) {
    const payload = new HttpParams()
      .set('apikey', 'T2fHXKRTbkX')
      .set('accessKey', access_key)
      .set('income_per_month', Mincome)
      .set('marital_status', marital)
      .set('spouse_income', Sincome)
      .set('unmarried_children_income', Childincome)
      .set('father_income', Fincome)
      .set('mother_income', Motherincome)
      .set('total_income', Totalincome)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  
  public getBankDetails(access_key: any) {
    const payload = new HttpParams()
      .set('apikey', 'xPVxY5XcX2H')
      .set('accessKey', access_key)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public getBranchDetails(access_key: any, bank_code: any) {
    const payload = new HttpParams()
      .set('apikey', 'B6bi6yP67Zb')
      .set('accessKey', access_key)
      .set('bank_code', bank_code)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }
  
  public getCustBank(access_key: any) {
    const payload = new HttpParams()
      .set('accessKey', access_key)
      .set('apikey', 'cpJzFmyym4s')
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public getBankValidationDetails(access_key: any) {
    const payload = new HttpParams()
      .set('apikey', '5koMonR8H4u')
      .set('accessKey', access_key)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }
  
  public getIFSCCodeValidation(access_key: any, ifscCode:any) {
    const payload = new HttpParams()
      .set('apikey', 'GT7Pjp2y45W')
      .set('accessKey', access_key)
      .set('ifsc_code',ifscCode)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }
  public TpAddon(access_key:any,bankAccNumber:any,ifscCode:any,acc_holder_name:any,account_code:any,mandate_code:any,bank_code:any,branch_code:any,
    parent_bank:any){
    const payload: FormData = new FormData();
    payload.append('apikey', 'L4iVvg3Y6ts')
    payload.append('accessKey', access_key)
    payload.append('bank_acc_no', bankAccNumber)
    payload.append('bank_ifsc', ifscCode)
    payload.append('acc_holder_name', acc_holder_name)
    payload.append('account_code', account_code)
    payload.append('mandate_code', mandate_code)
    payload.append('bank_code', bank_code)
    payload.append('branch_code', branch_code)
    payload.append('parent_bank', parent_bank)
    return this.http.post(this.otpUrl + 'Process/InProgress' ,payload);
  }
  public getTechProBankValidation(access_key: any,bankAccNo:any,ifsc:any,accName:any, accCode: any, mandCode: any, bankCode: any, branchCode: any, parentBank: any,branchName: any,upi:any) {
    const payload: FormData = new FormData();
    payload.append('apikey', 'L4iVvg3Y6ts')
    payload.append('accessKey', access_key)
    payload.append('bank_acc_no', bankAccNo)
    payload.append('bank_ifsc', ifsc)
    payload.append('acc_holder_name', accName)
    payload.append('account_code', accCode)
    payload.append('mandate_code', mandCode)
    payload.append('bank_code', bankCode)
    payload.append('branch_code', branchCode)
    payload.append('parent_bank', parentBank)
    payload.append('branch_name', branchName) // 
    payload.append('upi_id',upi)
    return this.http.post(this.otpUrl + 'Process/InProgress' ,payload);
  }

  public getAchMandate(access_key:any,bank_code:any) {
    const payload: FormData = new FormData();
    payload.append('apikey','SphkrbrRdMt')
    payload.append('accessKey',access_key)
    payload.append('bank_code',bank_code)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public getEmandate(access_key:any) {
    const payload: FormData = new FormData();
    payload.append('apikey','UEOdmmITmRS')
    payload.append('accessKey',access_key)
    payload.append('call_back_url_flag', 'Y')
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  } 

  public getBankValidDet(access_key:any) {
    const payload: FormData = new FormData();
    payload.append('apikey','5VkHSHToPB3')
    payload.append('accessKey',access_key)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public insertBankDetails(access_key:any, bank_name: any, bank_acc_no: any, bank_ifsc: any, acc_holder_name: any, bank_code: any, branch_code: any, branch_name: any, parent_bank: any, ach_mandate_id: any, upiID:any) {
    const payload: FormData = new FormData();
    payload.append('apikey','MyLjARKRP7f')
    payload.append('accessKey',access_key)
    payload.append('bank_name', bank_name)
    payload.append('bank_acc_no', bank_acc_no)
    payload.append('bank_ifsc', bank_ifsc)
    payload.append('acc_holder_name', acc_holder_name)
    payload.append('bank_code', bank_code)
    payload.append('branch_code', branch_code)
    payload.append('branch_name', branch_name)
    payload.append('parent_bank', parent_bank)
    payload.append('ach_mandate_id', ach_mandate_id)
    payload.append('upi_id', upiID)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public getemandateStatus(access_key: any) {
    const payload = new HttpParams()
      .set('apikey', '76Q6kfHJDaq')
      .set('accessKey', access_key)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public initiateVKYC(access_key: any) {
    const payload = new HttpParams()
      .set('apikey', 'u6tfyR2SQOJ')
      .set('accessKey', access_key)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public VerifyUPI(access_key: any, upiId: any) {
    const payload = new HttpParams()
      .set('apikey', 'ITkAFaRAW0C')
      .set('accessKey', access_key)
      .set('upiId', upiId)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  public riskApi(access_key: any) {
    const payload = new HttpParams()
      .set('apikey', 'cUg6avYMO1z')
      .set('accessKey', access_key)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }
  public LMScall(access_key: any) {
    const payload = new HttpParams()
      .set('apikey', 'FIPZi4ZK5IZ')
      .set('accessKey', access_key)
    return this.http.post(this.otpUrl + 'Process/InProgress', payload);
  }

  private ckycDocURL =   'https://intranetstpcspluatoci.tvscredit.com/stp/cso/310/';
  public getDoc(mobile: any) {
    const payload = new HttpParams()
      .set('apikey', 'jbdaC6WuCBV')
      .set('mobile_no', mobile)
    return this.http.post(this.ckycDocURL + 'Process/InProgress', payload);
  }

  public getTable(mobile: any) {
    const payload = new HttpParams()
      .set('apikey', 'jkRm3nG47DD')
      .set('mobile_no', mobile)
    return this.http.post(this.ckycDocURL + 'Process/InProgress', payload);
  }



}
