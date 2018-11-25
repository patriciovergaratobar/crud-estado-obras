import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoSimpleComponent } from './dialogo-simple.component';

describe('DialogoSimpleComponent', () => {
  let component: DialogoSimpleComponent;
  let fixture: ComponentFixture<DialogoSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
