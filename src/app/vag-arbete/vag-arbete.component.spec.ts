import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VagArbeteComponent } from './vag-arbete.component';

describe('VagArbeteComponent', () => {
  let component: VagArbeteComponent;
  let fixture: ComponentFixture<VagArbeteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VagArbeteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VagArbeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
