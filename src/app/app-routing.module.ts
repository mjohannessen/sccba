import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberAddComponent } from './member-add/member-add.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberGetComponent } from './member-get/member-get.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard} from './helpers';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'member/create',
    component: MemberAddComponent
  },
  {
    path: 'search',
    component: SearchComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: MemberEditComponent, canActivate: [AuthGuard]
  },
  {
    path: 'members',
    component: MemberGetComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
