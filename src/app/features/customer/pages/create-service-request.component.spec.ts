import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceRequestComponent } from './create-service-request.component';

describe('CreateServiceRequestComponent', () => {
  let component: CreateServiceRequestComponent;
  let fixture: ComponentFixture<CreateServiceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateServiceRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
