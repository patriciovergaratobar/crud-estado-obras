import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrasAdminComponent } from './obras-admin.component';

describe('ObrasAdminComponent', () => {
  let component: ObrasAdminComponent;
  let fixture: ComponentFixture<ObrasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObrasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
