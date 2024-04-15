import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeocodingServiceService {
  // opencagedata : https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
  // nomin     const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
// pelias http://your-pelias-server/search/reverse?point.lat=${latitude}&point.lon=${longitude}
nominErr:boolean=false;
  async getCountryName(lat: number, lng: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
 //  const url='http://your-pelias-server/search/reverse?point.lat=${latitude}&point.lon=${longitude}';
    // console.log("geocoding service");

 
    
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.address && data.address.country) {
      // console.log("data from geocoding service",data);
      // console.log("country name from service",data.address.country);
      // this.nominErr=true;
      // if(this.nominErr===true){
      //   console.log("nomin is error");
      //   }
      return data.address.country;
      
    }
    throw new Error('Failed to get country name.');

   
 
  }

  

  


  constructor() {
  
   }

  
}
