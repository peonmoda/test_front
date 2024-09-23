import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressAddEditComponent } from './address-add-edit.component';

describe('AddressAddEditComponent', () => {
  let component: AddressAddEditComponent;
  let fixture: ComponentFixture<AddressAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
