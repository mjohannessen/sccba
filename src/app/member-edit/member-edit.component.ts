import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from '../members.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private ms: MembersService, private fb: FormBuilder) {
    this.createForm();
  }


  createForm() {
    this.editForm = this.fb.group({
      phone: [''],
      fax: [''],
      email: [''],
      member: [''],
      comments: ['']
    });
  }



  updateMemberInfo() {
    console.log('updateMemberInfo');
    const formValues = this.editForm.value;
    console.log('editForm values: ' + JSON.stringify(this.editForm.value));
    console.log('updateMemberInfo');
    console.log('phone: ' + formValues.phone);
    console.log('fax: ' + formValues.fax);
    console.log('email: ' + formValues.email);
    console.log('member: ' + formValues.member);
    console.log('comments: ' + formValues.comments);
    this.route.params.subscribe(params => {
      this.ms.updateMember(
        formValues.phone,
        formValues.fax,
        formValues.email,
        formValues.member,
        formValues.comments,
        params.id);
      this.router.navigate(['home']);
    });
  }

  /*
  updateMemberInfo(
    phone,
    fax,
    email,
    member,
    comments) {
    console.log('updateMemberInfo');
    console.log('member: ' + member);
    this.route.params.subscribe(params => {
      this.ms.updateMember(
        phone,
        fax,
        email,
        member,
        comments,
        params.id);
      this.router.navigate(['home']);
    });
  }
   */




  ngOnInit() {
    console.log('onInit');
    this.route.params.subscribe(params => {
      console.log('params ngInit edit:' + JSON.stringify(params));
      console.log('params.id: ' + params.id);
      this.ms.editMember(params.id).subscribe(res => {
        this.theMember = res;
        console.log('from init theMember: ' + JSON.stringify(this.theMember));
        // set intial values of form fields
        this.editForm.controls.phone.setValue(this.theMember.phone);
        this.editForm.controls.fax.setValue(this.theMember.fax);
        this.editForm.controls.email.setValue(this.theMember.email);
        this.editForm.controls.member.setValue(this.theMember.member);
        this.editForm.controls.comments.setValue(this.theMember.comments);
        this.memberName = this.theMember.last_name;
        if (this.theMember.member === 'y') {
          this.isMember = true;
        } else {
          this.isMember = false;
        }
      });
    });
  }
}
