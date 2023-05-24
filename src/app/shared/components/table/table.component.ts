import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() listOfData : any[] = [];
  @Input() listOfColumn : any[] = [];
  @Output() deleteItem = new EventEmitter();
  @Output() editItem = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  sendDeleteItem(data : any){
    this.deleteItem.emit(data)
  }

  sendEditItem(data : any){
    this.editItem.emit(data)
  }
}
