import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProyectosComponent } from './home-proyectos.component';

describe('HomeProyectosComponent', () => {
  let component: HomeProyectosComponent;
  let fixture: ComponentFixture<HomeProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
