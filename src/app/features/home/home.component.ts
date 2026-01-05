import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeContainerComponent } from './containers/home-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeContainerComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
