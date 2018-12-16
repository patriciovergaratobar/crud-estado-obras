import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEstadosComponent } from './home-estados.component';

describe('HomeEstadosComponent', () => {
  let component: HomeEstadosComponent;
  let fixture: ComponentFixture<HomeEstadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEstadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
