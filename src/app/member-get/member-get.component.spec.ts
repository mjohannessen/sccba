import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberGetComponent } from './member-get.component';

describe('ShowGetComponent', () => {
  let component: MemberGetComponent;
  let fixture: ComponentFixture<MemberGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
