import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogServiceContainerComponent } from './catalog-service-container.component';

describe('CatalogServiceContainerComponent', () => {
  let component: CatalogServiceContainerComponent;
  let fixture: ComponentFixture<CatalogServiceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogServiceContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogServiceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
