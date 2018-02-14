import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAddComponent } from './change-add.component';

describe('ChangeAddComponent', () => {
  let component: ChangeAddComponent;
  let fixture: ComponentFixture<ChangeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
