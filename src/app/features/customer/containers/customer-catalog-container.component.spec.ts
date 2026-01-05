import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCatalogContainerComponent } from './customer-catalog-container.component';

describe('CustomerCatalogContainerComponent', () => {
  let component: CustomerCatalogContainerComponent;
  let fixture: ComponentFixture<CustomerCatalogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCatalogContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCatalogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
