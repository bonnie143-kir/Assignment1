import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAssistComponent } from './group-assist.component';

describe('GroupAssistComponent', () => {
  let component: GroupAssistComponent;
  let fixture: ComponentFixture<GroupAssistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupAssistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
