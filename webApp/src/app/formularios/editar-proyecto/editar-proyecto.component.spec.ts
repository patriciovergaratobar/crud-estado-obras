import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProyectoComponent } from './editar-proyecto.component';

describe('EditarProyectoComponent', () => {
  let component: EditarProyectoComponent;
  let fixture: ComponentFixture<EditarProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
