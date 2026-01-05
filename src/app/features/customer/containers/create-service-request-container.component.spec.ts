import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceRequestContainerComponent } from './create-service-request-container.component';

describe('CreateServiceRequestContainerComponent', () => {
  let component: CreateServiceRequestContainerComponent;
  let fixture: ComponentFixture<CreateServiceRequestContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateServiceRequestContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceRequestContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
