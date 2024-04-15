import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = '310';
  constructor(
    private auth: AuthService,
    private store: LocalStorageService,
    private router: Router
  ) {}

  isUserLoggedIn = false;

  ngOnInit() {
    // let checkAuth = localStorage.getItem('isUserLoggedIn'); 
    // // let storeData = this.store.retrieve('isUserLoggedIn');
    // console.log('storeData = >' + checkAuth);
    // if( checkAuth === null) {
    //   // this.isUserLoggedIn = false;
    //   this.router.navigate(['/loginPage']);
    // }
  }

}
