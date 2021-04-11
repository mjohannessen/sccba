

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MembersService } from '../services/members.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})

export class MemberAddComponent implements OnInit {

  addVisible = false;
  member: any = {};
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ms: MembersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
  }


  createForm() {

    this.addForm = this.fb.group({
      _sbn: [''],
      _admission_date: '',
      _last_name: '',
      _first_name: '',
      _status: '',
      _address_1: '',
      _address_2: '',
      _city: '',
      _state: '',
      _zip: '',
      _zip_plus4: '',
      _district: '',
      _county: '',
      _phone: '',
      _fax: '',
      _email: '',
      _firm: '',
      _law_school: '',
      _member: '',
      _comments: '',
      _practice_areas: ''

    });
  }

  sbnClicked($event){
    console.log('sbnClicked');
    this.addVisible = !this.addVisible;
  }


  addMember() {

    console.log('addMember');
    const formValues = this.addForm.value;
    console.log('formValues: ' + JSON.stringify(formValues));

    this.route.params.subscribe(params => {
      this.ms.addMember(
        formValues._sbn,
        formValues._admission_date,
        formValues._last_name,
        formValues._first_name,
        formValues._status,
        formValues._address_1,
        formValues._address_2,
        formValues._city,
        formValues._state,
        formValues._zip,
        formValues._zip_plus4,
        formValues._district,
        formValues._county,
        formValues._phone,
        formValues._fax,
        formValues._email,
        formValues._firm,
        formValues._law_school,
        formValues._member,
        formValues._comments,
        formValues._practice_areas,
        params.id);
      this.router.navigate(['home']);
    });

  }
}

