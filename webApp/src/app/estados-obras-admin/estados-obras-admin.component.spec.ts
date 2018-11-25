import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosObrasAdminComponent } from './estados-obras-admin.component';

describe('EstadosObrasAdminComponent', () => {
  let component: EstadosObrasAdminComponent;
  let fixture: ComponentFixture<EstadosObrasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadosObrasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadosObrasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
