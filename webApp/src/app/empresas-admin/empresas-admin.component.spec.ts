import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasAdminComponent } from './empresas-admin.component';

describe('EmpresasAdminComponent', () => {
  let component: EmpresasAdminComponent;
  let fixture: ComponentFixture<EmpresasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
