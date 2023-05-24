import { Component, Input, OnInit } from '@angular/core';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  @Input() dataForm: any;

  current : number = 0;
  firstContent: boolean = true;
  secondContent: boolean = false;
  thirdContent: boolean = false;
  fourthContent: boolean = false;




  constructor(private drawerEvent: DrawerEvent) { }

  ngOnInit(): void {
    console.log(this.dataForm)
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.firstContent = true;
        this.secondContent = false;
        this.thirdContent = false;
        this.fourthContent = false;
        this.drawerEvent.changeWidthComponent({ width: '40%' })
        break;
      }
      case 1: {
        this.firstContent = false;
        this.secondContent = true;
        this.thirdContent = false;
        this.fourthContent = false;
        break;
      }
      case 2: {
        this.firstContent = false;
        this.secondContent = false;
        this.thirdContent = true;
        this.fourthContent = false;
        this.drawerEvent.changeWidthComponent({ width: '40%' })
        break;
      }
      case 3: {
        this.firstContent = false;
        this.secondContent = false;
        this.thirdContent = false;
        this.fourthContent = true;
        this.drawerEvent.changeWidthComponent({ width: '90%' })
        break;
      }
      default: {
        console.log("error")
      }
    }
  }

}
