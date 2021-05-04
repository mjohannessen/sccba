import { Component, OnInit } from '@angular/core';
import Member from '../models/members';
import { MembersService } from '../services/members.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import { User } from '../models/users';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';


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
  searchForm: FormGroup;
  // basic stats
  santaCruzAttorneys: Member[] = [];
  montereyCountyAttorneys: Member[] = [];
  sccbaMembers_attorneys: Member[] = [];
  sccbaMembers_nonattorneys: Member[] = [];
  // sccbaMembers_attorneys_inarea: Member[] = [];
  sccbaMembers_attorneys_outofarea: Member[] = [];
  sccbaMembers: Member[] = [];
  searchDict = {};
  loading = false;
  users: User[];
  authorized = false;
  currentUser = {};

  // production
  // entryVisible = true;
  statsVisible = false;
  // searchVisible = false;
  // searchResultsVisible = false;

  // testing
  // entryVisible = true;
  // statsVisible = true;
  // searchVisible = true;
  // searchResultsVisible = false;


  constructor(private ms: MembersService, private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService) {
    // this.createForm();
    // this.createSearchForm();
  }

/*
  exportSearchResults(theresults) {
    console.log('exportSearchResults');
    this.ms.exportCsv(theresults);
  }

 */

  ngOnInit() {
    console.log('home.component ngOnInt');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });


    this.ms
      .getMembers()
      .subscribe((data: Member[]) => {
        this.members = data;
        if (this.members.length > 0) {
          console.log('members from memberService: ' + this.members.length.toString());
          this.dataSnapshot(this.members);
        }
      });

  }

/*
  createSearchForm() {
    this.searchForm = this.fb.group({
      _last_name: '',
      _first_name: '',
      _status: '',
      _county: '',
      _member: '',
      _practice_areas: '',
      _nibl: '',
      _sbn: ''
    });
  }



  createForm() {
    this.angForm1 = this.fb.group({
      key1: ['', Validators.required ],
      key2: ['', Validators.required ]
    });
  }
    */


/*
  clearForm() {
    console.log('clearForm');
    this.searchForm.reset();
    this.searchForm = this.fb.group({
      _last_name: '',
      _first_name: '',
      _status: '',
      _county: '',
      _member: '',
      _nibl: '',
      _practice_areas: '',
      _sbn: ''
    });
  }
  */


  /*
  auth(key1, key2) {
    // console.log('auth');
    if (key1 === 'thou' && key2 === 'maker13'){
      this.statsVisible = true;
      this.entryVisible = false;
      this.searchVisible = true;
      this.authorized = true;
      // window.location.reload();
      // this.dataSnapshot();
    }

  }
*/

  dataSnapshot(dbEntries) {
    // console.log('dataSnapshot');
    console.log('db length: ' + dbEntries.length);
    // console.log('dbEntries[0]: ' + JSON.stringify(dbEntries[100]));
    for ( const member of dbEntries) {
      //  get member data
      if (member.member === 'y') {
        this.sccbaMembers.push(member);
        if(member.sbn !== 0) {
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

    console.log('sccbaMembers length: ' + this.sccbaMembers.length);
    console.log('sccbaMembers_attorneys length: ' + this.sccbaMembers_attorneys.length);
    console.log('montereyCountyAttorneys length: ' + this.montereyCountyAttorneys.length);
    console.log('santaCruzAttorneys length: ' + this.santaCruzAttorneys.length);
    console.log('sccbaMembers_attorneys_outofarea length: ' + this.sccbaMembers_attorneys_outofarea.length);
    console.log('sccbaMembers_nonattorneys length: ' + this.sccbaMembers_nonattorneys.length);

    console.log(this.sccbaMembers_attorneys_outofarea[1]['county']);

    for ( const item of this.sccbaMembers_attorneys_outofarea) {
      console.log(item['county']);
    }


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
