import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasObrasComponent } from './listas-obras.component';

describe('ListasObrasComponent', () => {
  let component: ListasObrasComponent;
  let fixture: ComponentFixture<ListasObrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListasObrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
