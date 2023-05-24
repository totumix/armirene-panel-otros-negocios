import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DrawerEvent {

  private openDrawer = new Subject<any>();
  getComponent = this.openDrawer.asObservable();

  private changeWidthDrawer = new Subject<any>();
  getWidthDrawer = this.changeWidthDrawer.asObservable();

  changeOpenComponent(attributes: any) {
    this.openDrawer.next(attributes);
  }

  changeWidthComponent(attributes: any) {
    this.changeWidthDrawer.next(attributes);
  }

}
