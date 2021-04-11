import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  editForm: FormGroup;
  theMember: any = {};
  isMember = true;
  memberName = '';

  constructor(
    private route: ActivatedRoute, private router: Router, private ms: MembersService, public fb: FormBuilder
  ) {
    this.createForm();
  }




  createForm() {
    this.editForm = this.fb.group({
      _phone: [''],
      _fax: [''],
      _email: [''],
      _member: [''],
      _comments: [''],
      _practice_areas: ['']
    });
  }



  cancelEdit(){
    console.log('cancelEdit');
    this.router.navigate(['home']);
  }



  updateMemberInfo() {
    console.log('updateMemberInfo');
    const formValues = this.editForm.value;
    console.log('editForm values: ' + JSON.stringify(this.editForm.value));
    console.log('updateMemberInfo');
    console.log('phone: ' + formValues._phone);
    console.log('fax: ' + formValues._fax);
    console.log('email: ' + formValues._email);
    console.log('member: ' + formValues._member);
    console.log('comments: ' + formValues._comments);
    console.log('practice_areas: ' + formValues._practice_areas);

    // for practice areas, convert " * " separator to "|"
    const pracAreas = this.theMember.practice_areas;
    const modPracAreas = pracAreas.replace(' * ', '|');
    formValues._practice_areas = modPracAreas;
    this.route.params.subscribe(params => {
      this.ms.updateMember(
        formValues._phone,
        formValues._fax,
        formValues._email,
        formValues._member,
        formValues._comments,
        formValues._practice_areas,
        formValues._sbn,
        params.id);
      this.router.navigate(['home']);
    });
  }


  ngOnInit() {
    console.log('onInit');
    this.theMember = {};
    this.route.params.subscribe(params => {
      console.log('params ngInit edit:' + JSON.stringify(params));
      console.log('params.id: ' + params.id);
      this.ms.editMember(params.id).subscribe(res => {
        this.theMember = res[0];
        console.log('from init theMember: ' + JSON.stringify(this.theMember));
        console.log('phone: ' + this.theMember.phone);
        // set initial values of form fields

        // for practice areas, convert "|" separator to " * "
        const pracAreas = this.theMember.practice_areas;
        const modPracAreas = pracAreas.replace('|', ' * ');


        this.editForm = this.fb.group({
          _phone: this.theMember.phone,
          _fax: this.theMember.fax,
          _email: this.theMember.email,
          _member: this.theMember.member,
          _comments: this.theMember.comments,
          _practice_areas: modPracAreas,
        });
        this.memberName = this.theMember.last_name;
        this.isMember = this.theMember.member === 'y';
      });
    });
  }
}
