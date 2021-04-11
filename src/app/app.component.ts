import {Component, OnInit} from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { MembersService } from './services/members.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router } from '@angular/router';


import Member from './models/members';
import { AuthService } from './services/auth.service';
import { User } from './models/users';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'sccba';
  faCoffee = faCoffee;
  currentUser: User;

  constructor(private loadingBar: SlimLoadingBarService,
              private router: Router,
              private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);

    //  whole page background color
    document.body.style.background = '#ffffff';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  ngOnInit() {
  }


}
