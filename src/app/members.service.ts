import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ExportToCsv } from 'export-to-csv';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  // use local link
  uri = 'http://localhost:4001/api/members';

  constructor(private http: HttpClient) { }


  exportCsv(searchResults) {
    console.log('members.service - exportCsv');
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'SCCBA',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(searchResults);
    return 'ok';
  }

  getMembers() {
    console.log('getMembers');
    return this
      .http
      .get(`${this.uri}/`);
  }


  doSearch(searchDict) {
    console.log('getMembers (memberService)');
    console.log('passed searchDict: ' + JSON.stringify(searchDict));
    return this.http.post(`${this.uri}/search`, searchDict)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


  editMember(id) {
    console.log('member.service editMember id: ' + id);
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
  }



  updateMember(
    phone: any,
    fax: any,
    email: any,
    member: any,
    comments: any,
    id: any
  ) {
    console.log('Updating member: ' + id);
    const obj = {
      phone,
      fax,
      email,
      member,
      comments
    };
    console.log('params passed to backend: ' + JSON.stringify(obj));
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('member after updae: ' + JSON.stringify(res)));
  }




  addMember(
    sbn,
    admission_date,
    name,
    last_name,
    first_name,
    status,
    address_1,
    address_2,
    city,
    state,
    zip,
    zip_plus4,
    district,
    county,
    phone,
    fax,
    email,
    firm,
    law_school,
    member,
    comments
  ) {
    console.log(
      sbn,
      admission_date,
      name,
      last_name,
      first_name,
      status,
      address_1,
      address_2,
      city,
      state,
      zip,
      zip_plus4,
      district,
      county,
      phone,
      fax,
      email,
      firm,
      law_school,
      member,
      comments
    );
    const obj = {
      sbn,
      admission_date,
      name,
      last_name,
      first_name,
      status,
      address_1,
      address_2,
      city,
      state,
      zip,
      zip_plus4,
      district,
      county,
      phone,
      fax,
      email,
      firm,
      law_school,
      member,
      comments
    };
    this.http.post(`${this.uri}/members/add`, obj)
      .subscribe(res => console.log('Done'));
  }






  deleteMember(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }






}


/*

sbn
admission_date
name
last_name
first_name
status
address_1
address_2
city
state
zip
zip_plus4
district
county
phone
fax
email
firm
law_school
member
comments

*/

