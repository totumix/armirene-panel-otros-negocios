import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  @Input() listOfData: any[] = [];
  @Input() listOfColumn: any[] = [];
  @Input() objectKeys: any;
  @Input() isEditable: boolean = true;
  @Input() isErasable: boolean = true;
  @Input() isCancelable: boolean = true;
  @Output() sendItem = new EventEmitter();
  actions
  constructor() { }

  ngOnInit(): void {
    this.actions = [{ tooltipText: 'Editar', show: this.isEditable, icon: 'edit', type: 'edit' },
    { tooltipText: 'Eliminar', show: this.isErasable, icon: 'delete', type: 'delete' },
    { tooltipText: 'Cancelar', show: this.isCancelable, icon: 'close-circle', type: 'cancel' }]
    this.objectKeys = Object.keys(this.objectKeys);
  }

  sendEventItem(type, data) {
    console.log(type, data)
    this.sendItem.emit({ type: type, data })
  }
}
