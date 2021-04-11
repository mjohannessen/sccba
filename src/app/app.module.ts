import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { MemberAddComponent } from './member-add/member-add.component';
import { MemberGetComponent } from './member-get/member-get.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { MembersService } from './services/members.service';
import { AuthService} from './services/auth.service';

// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';
import { JwtInterceptor } from './helpers';
import { ErrorInterceptor } from './helpers';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberAddComponent,
    MemberGetComponent,
    MemberEditComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    MembersService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
