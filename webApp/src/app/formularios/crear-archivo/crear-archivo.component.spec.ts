import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearArchivoComponent } from './crear-archivo.component';

describe('CrearArchivoComponent', () => {
  let component: CrearArchivoComponent;
  let fixture: ComponentFixture<CrearArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
