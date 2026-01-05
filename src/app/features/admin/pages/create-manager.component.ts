import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateManagerFormContainerComponent } from '../containers/create-manager-form.component';

@Component({
  selector: 'app-create-manager',
  standalone: true,
  imports: [CommonModule, CreateManagerFormContainerComponent],
  templateUrl: './create-manager.component.html'
})
export class CreateManagerComponent {}
