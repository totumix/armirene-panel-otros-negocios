import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() listOfData: any[] = [];
  @Input() listOfColumn: any[] = [];
  @Input() objectKeys: any;
  @Output() deleteItem = new EventEmitter();
  @Output() editItem = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.objectKeys = Object.keys(this.objectKeys);
  }

  sendDeleteItem(data: any) {
    this.deleteItem.emit(data)
  }

  sendEditItem(data: any) {
    this.editItem.emit(data)
  }
}
