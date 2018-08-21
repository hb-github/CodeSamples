import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CoreService {
  constructor(
    private router: Router
  ) {}

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
