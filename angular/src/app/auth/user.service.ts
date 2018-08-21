import { Injectable } from '@angular/core';

import { CoreService } from '../core/core.service';

import { User } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  userInfo: User = new User();

  constructor(private coreService: CoreService, public http: HttpClient) {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('pms_user') !== null
    ) {
      const user = JSON.parse(localStorage.getItem('pms_user') || '');
      this.userInfo = user ? user : new User();

      if (!this.isLoggedIn()) {
        this.coreService.navigateTo('/auth');
      }
    }
  }

  storeUserInfo(res: any) {
    this.userInfo = {
      userId: res.id,
      userName: res.name,
      userEmail: res.email,
      role: res.role
    };
    localStorage.setItem('pms_token', res.token);
    localStorage.setItem('pms_user', JSON.stringify(this.userInfo));
  }

  isLoggedIn(): boolean {
    let isLoggedIn = false;

    if (typeof window !== 'undefined') {
      isLoggedIn = localStorage.getItem('pms_token') !== null;
    }

    return isLoggedIn;
  }

  clearUserData() {
    localStorage.removeItem('pms_token');
    localStorage.removeItem('pms_user');
    this.userInfo = new User();
  }
  // login api call
  login(data) {
    return this.http.post('auth/login', data);
  }
}
