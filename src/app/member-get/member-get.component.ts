import { Component, OnInit } from '@angular/core';
import Member from '../models/members';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-member-get',
  templateUrl: './member-get.component.html',
  styleUrls: ['./member-get.component.css']
})
export class MemberGetComponent implements OnInit {

  members: Member[];
  constructor(private ms: MembersService) { }



  deleteMember(id) {
    /*
    this.ms.deleteMember(id).subscribe(res => {
      this.members.splice(id, 1);
    });

     */
  }


  ngOnInit() {
    this.ms
      .getMembers()
      .subscribe((data: Member[]) => {
        this.members = data;
        console.log('members from memberService: ' + data.length.toString());
      });
  }

}
