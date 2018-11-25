import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasEstadoObrasComponent } from './listas-estado-obras.component';

describe('ListasEstadoObrasComponent', () => {
  let component: ListasEstadoObrasComponent;
  let fixture: ComponentFixture<ListasEstadoObrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListasEstadoObrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasEstadoObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
