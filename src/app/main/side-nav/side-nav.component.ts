import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  constructor(
    private store: LocalStorageService,
    private auth: AuthService,
    private router: Router
  ) {}

  userName: any;

  ngOnInit(): void {
    this.userName = this.store.retrieve('username')
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
