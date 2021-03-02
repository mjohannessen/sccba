

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent implements OnInit {

  addVisible = false;
  member: any = {};

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private ms: MembersService) {
    this.createForm();
  }


  createForm() {

    this.angForm = this.fb.group({
      /*
    sbn: "",
    admission_date: ['', Validators.required ],
    last_name: ['', Validators.required ],
    first_name: ['', Validators.required ],
    status: ['', Validators.required ],
    address_1: ['', Validators.required ],
    address_2: ['', Validators.required ],
    city: ['', Validators.required ],
    state: ['', Validators.required ],
    zip: ['', Validators.required ],
    zip_plus4: ['', Validators.required ],
    district: ['', Validators.required ],
    county: ['', Validators.required ],
    phone: ['', Validators.required ],
    fax: ['', Validators.required ],
    email: ['', Validators.required ],
    firm: ['', Validators.required ],
    law_school: ['', Validators.required ],
    comments: ['', Validators.required ]
    */
      sbn: '',
      admission_date: '',
      last_name: '',
      first_name: '',
      status: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      zip: '',
      zip_plus4: '',
      district: '',
      county: '',
      phone: '',
      fax: '',
      email: '',
      firm: '',
      law_school: '',
      comments: ''

});


  }

  sbnClicked($event) {
    console.log('sbnClicked');
    this.addVisible = !this.addVisible;
  }


  addMember(
    sbn,
    admission_date,
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
    comments
  ) {
    console.log('addMember');

    // tslint:disable-next-line:max-line-length
    this.ms.addMember(
      sbn,
      admission_date,
      first_name + ' ' + last_name,
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
      'y',
      comments
    );
  }

  ngOnInit() {
  }


}

