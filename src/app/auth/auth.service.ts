import { Injectable } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: LocalStorageService
  ) { }

  isUserLoggedIn: boolean = false;

  login(userName: string, password: string) : Observable<any> {
    console.log(userName);
    console.log(password);
    this.store.store('username', userName)
    this.isUserLoggedIn = userName !== '' && password !== '';
    // this.store.store('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false"); 
    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
    // if(userName !== '' && password !== '') {
    //   this.isUserLoggedIn = true;
    //   this.store.store('isUserLoggedIn', this.isUserLoggedIn)
    // } else {
    //   this.isUserLoggedIn = false;
    //   this.store.store('isUserLoggedIn', this.isUserLoggedIn)
    // }
    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val => { 
         console.log("Is User Authentication is successful: " + val); 
        //  this.store.store('isUserLoggedIn', val)
        //  localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn);
      })
    );
    
  }

  logout():void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
  }

  isAuthenticated(): boolean {
    // Check if user is authenticated, return true/false accordingly
    // let checkAuth = this.store.retrieve('isUserLoggedIn');
    let checkAuth = localStorage.getItem('isUserLoggedIn')
    if(checkAuth) {
      return true;
    } else {
      return false;
    }
  }
}
