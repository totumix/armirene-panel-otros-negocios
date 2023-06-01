import { Component, OnInit } from '@angular/core';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';
import { BranchOfficeFormComponent } from '../../shared/components/branch-office-form/branch-office-form.component';
import { BranchOffice } from 'src/app/core/models/branch-office.class';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.scss']
})
export class StartViewComponent implements OnInit {
  listOfData: BranchOffice[] = [];

  constructor(private drawerEvent: DrawerEvent) { }

  ngOnInit(): void {
  }

  createBranchOffice() {
    this.drawerEvent.changeOpenComponent({ component: BranchOfficeFormComponent })
  }
}
