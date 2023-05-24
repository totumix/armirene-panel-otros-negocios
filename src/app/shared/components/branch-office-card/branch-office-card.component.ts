import { Component, Input, OnInit } from '@angular/core';
import { BranchOffice } from '../../interfaces/branch-office.type';
import { BranchOfficeFormComponent } from 'src/app/pages/start-view/branch-office-form/branch-office-form.component';
import { DrawerEvent } from '../../event-listeners/drawer.event';

@Component({
  selector: 'app-branch-office-card',
  templateUrl: './branch-office-card.component.html',
  styleUrls: ['./branch-office-card.component.scss']
})
export class BranchOfficeCardComponent implements OnInit {
  @Input() branchOffice: BranchOffice;
  color = '';

  constructor(private drawerEvent: DrawerEvent) { }

  ngOnInit(): void {
    this.getRandomColor();
  }

  getRandomColor() {
    this.color = '#' + ('000000' + Math.floor(0x1000000 * Math.random()).toString(16)).slice(-6);
  }

  editBranchOffice(branchOffice: BranchOffice) {
    this.drawerEvent.changeOpenComponent({ component: BranchOfficeFormComponent, data: branchOffice })
  }

}
