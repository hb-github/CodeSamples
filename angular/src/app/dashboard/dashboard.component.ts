import { Component, OnInit, AfterViewChecked, Renderer2 } from '@angular/core';
import { MenuService } from '../core/menu.service';
import {
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  NavigationEnd,
  Router
} from '@angular/router';

@Component({
  selector: 'pms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewChecked {
  menuService;
  constructor(
    private router: Router,
    private ms: MenuService,
    private renderer: Renderer2
  ) {
    this.menuService = ms;
    // NProgress.configure({ showSpinner: false });
    this.renderer.addClass(document.body, 'preload');
  }

  ngOnInit() {
    this.router.events.subscribe((obj: any) => {
      if (obj instanceof RouteConfigLoadStart) {
        // NProgress.start();
        // NProgress.set(0.4);
      } else if (obj instanceof RouteConfigLoadEnd) {
        // NProgress.set(0.9);
        setTimeout(() => {
          // NProgress.done();
          // NProgress.remove();
        }, 500);
      } else if (obj instanceof NavigationEnd) {
        this.ms.navbarToggleValue = false;
        this.ms.sidebarToggleValue = true;
        window.scrollTo(0, 0);
      }
    });
  }

  ngAfterViewChecked() {
    setTimeout(() => {
      this.renderer.removeClass(document.body, 'preload');
    }, 300);
  }
}
