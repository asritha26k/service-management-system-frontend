import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateManagerFormContainerComponent } from './create-manager-form.component';

describe('CreateManagerFormContainerComponent', () => {
  let component: CreateManagerFormContainerComponent;
  let fixture: ComponentFixture<CreateManagerFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateManagerFormContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateManagerFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
