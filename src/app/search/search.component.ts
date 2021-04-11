import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Member from '../models/members';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  searchResults: Member[] = [];
  searchDict = {};
  searchResultsVisible = false;

  constructor(private ms: MembersService, private fb: FormBuilder) {
    this.createSearchForm();
  }

  ngOnInit() {
  }

  exportSearchResults(theresults) {
    console.log('exportSearchResults');
    this.ms.exportCsv(theresults);
  }

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
    this.searchResultsVisible = false;
  }



  doSearch() {
    console.log('doSearch');
    const formValues = this.searchForm.value;
    console.log('formValues: ' + JSON.stringify(formValues));
    this.searchDict = {};
    if (formValues._last_name.length > 0) {
      this.searchDict['last_name'] = formValues._last_name;
    }
    if (formValues._first_name.length > 0) {
      this.searchDict['first_name'] = formValues._first_name;
    }
    if (formValues._status.length > 0) {
      this.searchDict['status'] = formValues._status;
    }
    if (formValues._county.length > 0) {
      this.searchDict['county'] = formValues._county;
    }
    if (formValues._member) {
      this.searchDict['member'] = 'y';
    }
    if (formValues._practice_areas.length > 0) {
      this.searchDict['practice_areas'] = formValues._practice_areas;
    }
    if (formValues._sbn.length > 0) {
      this.searchDict['sbn'] = formValues._sbn;
    }
    if (formValues._nibl) {
      this.searchDict['nibl'] = 'y';
    }

    console.log('searchDict: ' + JSON.stringify(this.searchDict));
    this.ms
      .doSearch(this.searchDict)
      .subscribe((searchResults: Member[]) => {
        this.searchResults = searchResults;
        // console.log('From backend: ' + JSON.stringify(this.searchResults));
        if (this.searchResults.length > 0) {
          this.searchResultsVisible = true;
          console.log('members from memberService: ' + this.searchResults.length.toString());
          // sort for presentation
          this.searchResults.sort((a, b) => (a.last_name > b.last_name) ? 1 : (a.last_name === b.last_name) ? ((a.first_name > b.first_name) ? 1 : -1) : -1 );
        } else {
          this.searchResultsVisible = false;
        }
      });

  }


}
