import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  let checkAuth = localStorage.getItem('isUserLoggedIn');
    // console.log('storeData = >' + checkAuth);
    if( checkAuth === null) {
      this.router.navigate(['/loginPage']);
    }
  }

}
