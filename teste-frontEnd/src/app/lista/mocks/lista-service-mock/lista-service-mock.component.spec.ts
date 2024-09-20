import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaServiceMockComponent } from './lista-service-mock.component';

describe('ListaServiceMockComponent', () => {
  let component: ListaServiceMockComponent;
  let fixture: ComponentFixture<ListaServiceMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaServiceMockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaServiceMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
