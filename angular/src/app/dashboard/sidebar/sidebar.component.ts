import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../core/menu.service';

@Component({
  selector: 'pms-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuService;
  sidebarItems: any = [];
  constructor(private ms: MenuService) {
    this.menuService = ms;
  }

  ngOnInit() {
    this.sidebarItems = [
      { link: '/', label: 'Dashboard', icon: 'dashboard' },
      { link: '/charts', label: 'Charts', icon: 'show_chart' },
      { link: '/auth', label: 'Login', icon: 'account_box' }
    ];
  }
}
