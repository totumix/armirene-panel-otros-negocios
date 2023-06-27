import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { BUSINESS_DATA, Storage } from 'src/app/core/storage';
import { DashboardLayoutVm } from 'src/app/core/view-model/dashboard-layout.vm';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';
@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  isCollapsed = false;
  drawerRef;
  showDrawerRef = true;
  business
  menuOptions = [
    { label: 'Inicio', icon: 'home', route: ['start-view'] },
    { label: 'Pedidos', icon: 'file-done', route: ['orders'] },
    { label: 'Clientes', icon: 'user', route: ['clients'] },
  ]
  constructor(private drawerService: NzDrawerService,
    private drawerEvent: DrawerEvent,
    private vm: DashboardLayoutVm,
    private router: Router,
    public _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.business = Storage.getAll(BUSINESS_DATA);
    this.changeRoute();
    this.drawerEvent.closeComponent.subscribe(() => {
      this.drawerRef.close()
    })
    this.drawerEvent.getComponent.subscribe(res => {
      this.openComponent(res)
    })
    this.drawerEvent.getWidthDrawer.subscribe(res => {
      this.drawerRef.nzWidth = res.width
    })
  }

  changeRoute() {
    this.router.events.subscribe((event: Event) => {
      if ((event instanceof NavigationStart && event.url.includes('business')) || this.router.url.includes('business')) {
        this.showDrawerRef = false;
      }
      if ((event instanceof NavigationStart && !event.url.includes('business')) || !this.router.url.includes('business')) {
        this.showDrawerRef = true;
      }
    });
  }

  openComponent({ component, data }: any): void {
    this.drawerRef = this.drawerService.create({
      nzTitle: '',
      nzWidth: '40%',
      nzContent: component,
      nzContentParams: {
        dataForm: data
      }
    });

    this.drawerRef.afterOpen.subscribe(() => {
    });

    this.drawerRef.afterClose.subscribe(data => {
    });
  }

  logout() {
    this.vm.logout();
  }

  onActivate(event) {
    window.scroll(0, 0);
  }
}
