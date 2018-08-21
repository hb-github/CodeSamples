import { Component, HostListener } from '@angular/core';
import { MenuService } from '../../core/menu.service';
import * as $ from 'jquery';
@Component({
  selector: 'pms-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  previousScroll = 0;
  menuService;
  constructor(private ms: MenuService) {
    this.menuService = ms;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    const currentScroll = window.pageYOffset;
    if (
      currentScroll > 60 &&
      currentScroll < $(document).height() - $(window).height()
    ) {
      if (currentScroll > this.previousScroll) {
        this.hideNavbar();
      } else {
        this.showNavbar();
      }
      this.previousScroll = currentScroll;
    }
  }

  hideNavbar = () => {
    setTimeout(() => {
      this.ms.navbarToggleValue = true;
    }, 300);
  };

  showNavbar = () => {
    setTimeout(() => {
      this.ms.navbarToggleValue = false;
    }, 300);
  };
}
