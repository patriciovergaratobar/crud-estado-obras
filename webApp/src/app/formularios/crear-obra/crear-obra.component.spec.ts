import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearObraComponent } from './crear-obra.component';

describe('CrearObraComponent', () => {
  let component: CrearObraComponent;
  let fixture: ComponentFixture<CrearObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
