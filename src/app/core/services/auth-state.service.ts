import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../../features/authentication/types/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  // BehaviorSubjects for reactive state
  private _currentUser = new BehaviorSubject<User | null>(null);
  private _token = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  private _needsPasswordChange = new BehaviorSubject<boolean>(
    localStorage.getItem('needsPasswordChange') === 'true'
  );

  // Derived observables (computed values)
  private _isAuthenticated$: Observable<boolean> = this._currentUser.pipe(
    map(user => !!user)
  );
  private _userRole$: Observable<string | undefined> = this._currentUser.pipe(
    map(user => user?.role)
  );

  // Public read-only observables
  currentUser$: Observable<User | null> = this._currentUser.asObservable();
  isAuthenticated$: Observable<boolean> = this._isAuthenticated$;
  userRole$: Observable<string | undefined> = this._userRole$;
  needsPasswordChange$: Observable<boolean> = this._needsPasswordChange.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  // Synchronous getters for guards and components that need immediate values
  isAuthenticated(): boolean {
    return !!this._currentUser.value;
  }

  currentUser(): User | null {
    return this._currentUser.value;
  }

  userRole(): string | undefined {
    return this._currentUser.value?.role;
  }

  needsPasswordChange(): boolean {
    return this._needsPasswordChange.value;
  }

  getToken(): string | null {
    return this._token.value;
  }

  setSession(token: string, user: User, needsChange: boolean = false) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('needsPasswordChange', String(needsChange));
    this._token.next(token);
    this._currentUser.next(user);
    this._needsPasswordChange.next(needsChange);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('needsPasswordChange');
    this._token.next(null);
    this._currentUser.next(null);
    this._needsPasswordChange.next(false);
  }

  private loadUserFromStorage() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this._currentUser.next(user);
      } catch (e) {
        console.error('Failed to parse user from storage', e);
        this.logout();
      }
    }
  }
}
