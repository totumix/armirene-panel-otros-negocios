import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { DashboardLayoutVm } from 'src/app/core/view-model/dashboard-layout.vm';
import { AuthService } from 'src/app/services/auth.service';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';
@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  isCollapsed = false;
  drawerRef;
  menuOptions = [
    { label: 'Inicio', icon: 'home', route: ['/start-view/list'] },
    { label: 'Pedidos', icon: 'file-done', route: ['/orders/list'] },
    { label: 'Clientes', icon: 'user', route: ['/clients/list'] },
  ]
  constructor(private drawerService: NzDrawerService,
    private drawerEvent: DrawerEvent,
    private vm : DashboardLayoutVm
  ) { }

  ngOnInit(): void {
    this.drawerEvent.getComponent.subscribe(res => {
      this.openComponent(res)
    })
    this.drawerEvent.getWidthDrawer.subscribe(res => {
      this.drawerRef.nzWidth = res.width
    })
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

  logout(){
    this.vm.logout();
  }
}
