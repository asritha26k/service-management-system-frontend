import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type NotificationType = 'success' | 'danger' | 'info' | 'warning';

@Injectable({
  providedIn: 'root'
})
//its like global notification controller
export class NotificationService {
  // BehaviorSubjects for reactive state
  private _message = new BehaviorSubject<string | null>(null);
  private _type = new BehaviorSubject<NotificationType>('info');
  private _title = new BehaviorSubject<string | null>(null);
  private _show = new BehaviorSubject<boolean>(false);

  // Public observables
  message$: Observable<string | null> = this._message.asObservable();
  type$: Observable<NotificationType> = this._type.asObservable();
  title$: Observable<string | null> = this._title.asObservable();
  show$: Observable<boolean> = this._show.asObservable();

  // getters for templates
  message(): string | null {
    return this._message.value;
  }

  type(): NotificationType {
    return this._type.value;
  }

  title(): string | null {
    return this._title.value;
  }

  show(): boolean {
    return this._show.value;
  }

  showSuccess(message: string, title: string = 'Success') {
    this.notify(message, title, 'success');
  }

  showError(message: string, title: string = 'Error') {
    this.notify(message, title, 'danger');
  }

  showInfo(message: string, title: string = 'Information') {
    this.notify(message, title, 'info');
  }

  showWarning(message: string, title: string = 'Warning') {
    this.notify(message, title, 'warning');
  }

  private notify(message: string, title: string, type: NotificationType) {
    this._message.next(message);
    this._title.next(title);
    this._type.next(type);
    this._show.next(true);
  }

  hide() {
    this._show.next(false);
  }
}
