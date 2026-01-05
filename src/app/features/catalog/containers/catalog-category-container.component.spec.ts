import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCategoryContainerComponent } from './catalog-category-container.component';

describe('CatalogCategoryContainerComponent', () => {
  let component: CatalogCategoryContainerComponent;
  let fixture: ComponentFixture<CatalogCategoryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogCategoryContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogCategoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
