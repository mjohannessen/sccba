import { Component, OnInit } from '@angular/core';
import Member from '../Members';
import { MembersService } from '../members.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  members: Member[] = [];
  searchResults: Member[] = [];
  nextMember = new Member();
  angForm1: FormGroup;
  angForm2: FormGroup;
  // basic stats
  santaCruzAttorneys: Member[] = [];
  montereyCountyAttorneys: Member[] = [];
  sccbaMembers_attorneys: Member[] = [];
  sccbaMembers_nonattorneys: Member[] = [];
  sccbaMembers_attorneys_inarea: Member[] = [];
  sccbaMembers_attorneys_outofarea: Member[] = [];
  sccbaMembers: Member[] = [];

  searchDict = {};

  // production
  //entryVisible = true;
  //statsVisible = false;
  //searchVisible = false;
  //searchResultsVisible = false;

  // testing
  entryVisible = true;
  statsVisible = true;
  searchVisible = true;
  searchResultsVisible = false;






  constructor(private ms: MembersService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.createForm();
    this.createSearchForm();
  }


  exportSearchResults(theresults) {
    console.log('exportSearchResults');
    this.ms.exportCsv(theresults);
  }

  ngOnInit() {
    // console.log('ngOnInt');
    this.ms
      .getMembers()
      .subscribe((data: Member[]) => {
        this.members = data;
        if (this.members.length > 0) {
          // console.log('members from memberService: ' + this.members.length.toString());
          this.dataSnapshot();
        }
      });
  }


  createSearchForm() {
    this.angForm2 = this.fb.group({
      last_name: '',
      first_name: '',
      bar_status: '',
      county: '',
      sccba_member: ''
    });
  }

  createForm() {
    this.angForm1 = this.fb.group({
      key1: ['', Validators.required ],
      key2: ['', Validators.required ]
    });
  }


  clearForm() {
    console.log('clearForm');
    this.angForm2.reset();
    this.angForm2 = this.fb.group({
      last_name: '',
      first_name: '',
      bar_status: '',
      county: '',
      sccba_member: ''
    });
  }

  auth(key1, key2) {
    // console.log('auth');
    if (key1 === 'thou' && key2 === 'maker13'){
      this.statsVisible = true;
      this.entryVisible = false;
      this.searchVisible = true;
      //this.dataSnapshot();
    }

  }


  dataSnapshot() {
    // console.log('dataSnapshot');
    // console.log('db length: ' + this.members.length);
    // console.log('member[0]: ' + JSON.stringify(this.members[0]));
    for ( const member of this.members) {
      //  get member data
      if (member.sccba_member === 'y') {
        this.sccbaMembers.push(member);
        if(member.sbn !== '') {
          this.sccbaMembers_attorneys.push(member);
          if (member.county === 'Monterey') {
            this.montereyCountyAttorneys.push(member);
          }
          if (member.county === 'Santa Cruz') {
            this.santaCruzAttorneys.push(member);
          }
          if (member.county !== 'Monterey' && member.county !== 'Santa Cruz') {
            this.sccbaMembers_attorneys_outofarea.push(member);
          }
        } else {
          this.sccbaMembers_nonattorneys.push(member);
        }
      }
    }
    /*
    console.log('sccbaMembers length: ' + this.sccbaMembers.length);
    console.log('sccbaMembers_attorneys length: ' + this.sccbaMembers_attorneys.length);
    console.log('montereyCountyAttorneys length: ' + this.montereyCountyAttorneys.length);
    console.log('santaCruzAttorneys length: ' + this.santaCruzAttorneys.length);
    console.log('sccbaMembers_attorneys_outofarea length: ' + this.sccbaMembers_attorneys_outofarea.length);
    console.log('sccbaMembers_nonattorneys length: ' + this.sccbaMembers_nonattorneys.length);
     */

  }

  doSearch() {
    console.log('doSearch');
    const formValues = this.angForm2.value;
    console.log('formValues: ' + JSON.stringify(formValues));
    this.searchDict = {};
    if (formValues.last_name !== '') {
      this.searchDict['last_name'] = formValues.last_name;
    }
    if (formValues.first_name !== '') {
      this.searchDict['first_name'] = formValues.first_name;
    }
    if (formValues.bar_status !== '') {
      this.searchDict['bar_status'] = formValues.bar_status;
    }
    if (formValues.county !== '') {
      this.searchDict['county'] = formValues.county;
    }
    if (formValues.sccba_member !== '') {
      this.searchDict['sccba_member'] = formValues.sccba_member;
    }

    console.log('searchDict: ' + JSON.stringify(this.searchDict));
    this.ms
      .doSearch(this.searchDict)
      .subscribe((searchResults: Member[]) => {
        this.searchResults = searchResults;
        console.log('From backend: ' + JSON.stringify(this.searchResults));
        if (this.searchResults.length > 0) {
          this.searchResultsVisible = true;
          console.log('members from memberService: ' + this.searchResults.length.toString());
          /*
          for (let i = 0; i < this.members.length; i++) {
            console.log('this.members[i] ' + JSON.stringify(this.members[i]));
          }
          */
        } else {
          this.searchResultsVisible = false;
        }
      });

  }






}



function GetSortOrder(prop) {
  // tslint:disable-next-line:only-arrow-functions
  return function(a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}
