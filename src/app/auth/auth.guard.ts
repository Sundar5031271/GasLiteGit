import { CanActivateFn, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Injectable, inject } from '@angular/core';


// export class AuthGuard implements CanActivate {

//   constructor(
//     private router: Router,
//     private store: LocalStorageService,
//     private auth: AuthService
//   ) { }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //   let url: string = state.url;

  //       return this.checkLogin(url);
  //   }
  //   checkLogin(url: string): true {
  //     console.log("Url: " + url)
  //     let val: string = this.store.retrieve('username');

  //     if(val != null && val == "true"){
  //         if(url == "/login")
  //           this.router.parseUrl('/expenses');
  //         else 
  //           return true;
  //     } else {
  //         return this.router.parseUrl('/login');
  //     }
  //   }
  

//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     alert('hi')
//     // let username = this.store.retrieve('username') || null;
//     let username = this.store.retrieve('isUserLoggedIn') || null;
//     console.log(username)
//     if (username != null) {
//       return true;
//     }
//     this.router.navigate(['loginPage']);
//     return false;
//   }
// }

// export const AuthGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ):
//   Observable<boolean | UrlTree> 
//   | Promise<boolean | UrlTree> 
//   | boolean 
//   | UrlTree=> {

//   return inject(authService).isAuthenticated()
//     ? true
//     : inject(Router).createUrlTree(['/loginPage']);

// };

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {  
    // console.log(this.authService.isAuthenticated());
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/loginPage']);
      return false;
    }
  }
}

// @Injectable()
//  export class authGuard {

//  constructor(
//  public router: Router,
//  private store: LocalStorageService
//  ) { }

//  canActivate(): boolean {
//   console.log(this.store.retrieve('isUserLoggedIn'));
//  if (this.store.retrieve('isUserLoggedIn')) {
//    return true
//  } else {
//    this.router.navigate(['/loginPage']);
//    return false
//    }
//  }

//  }

// export const authGuardGuard: CanActivateFn = (route, state) => {
//   return inject(authGuard).canActivate();
// };

// export class authGuard implements CanActivate {
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
//     throw new Error('Method not implemented.');
//   }
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if (this.authService.isAuthenticated()) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }

// }
// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
