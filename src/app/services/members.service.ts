import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ExportToCsv } from 'export-to-csv';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  // local link for testing (start api first)
  uri = 'http://localhost:4001/api/sccba';
  // production link
  //uri = 'https://api.omicrondelta.space/api/sccba';

  constructor(private http: HttpClient) { }


  exportCsv(searchResults) {
    console.log('members.service - exportCsv');
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      filename: 'sccba_search_results',
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
    // console.log('member.service getMembers: ' + this.uri);
    return this
      .http
      .get(`${this.uri}/`);
  }


  doSearch(searchDict) {
    console.log('getMembers (memberService)');
    console.log('members.service - passed searchDict to backend: ' + JSON.stringify(searchDict));
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
    practice_areas: any,
    sbn: any,
    id: any
  ) {
    console.log('Updating member: ' + id);
    const obj = {
      phone,
      fax,
      email,
      member,
      comments,
      practice_areas,
      sbn
    };
    console.log('params passed to backend: ' + JSON.stringify(obj));
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('member after update: ' + JSON.stringify(res)));
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
    comments,
    practice_areas
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
      comments,
      practice_areas
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
      comments,
      practice_areas
    };
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'));
  }






  deleteMember(id) {
    console.log('deleteMember');
    /*
    return this
      .http
      .get(`${this.uri}/delete/${id}`);

     */
  }






}


/*

sbn
admission_date
name
last_name
first_name
bar_status
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
sccba_member
comments
practice_areas

*/

