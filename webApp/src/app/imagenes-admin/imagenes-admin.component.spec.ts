import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesAdminComponent } from './imagenes-admin.component';

describe('ImagenesAdminComponent', () => {
  let component: ImagenesAdminComponent;
  let fixture: ComponentFixture<ImagenesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
