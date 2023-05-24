import { Component, OnInit } from '@angular/core';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';
import { BranchOffice } from 'src/app/shared/interfaces/branch-office.type';
import { BranchOfficeFormComponent } from './branch-office-form/branch-office-form.component';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.scss']
})
export class StartViewComponent implements OnInit {
  listOfData: BranchOffice[] =
    [{
      "id": "1", "name": "Aubrette MacKilroe", "city": "DU119BZ", "municipality": "amackilroe0@github.com", "address": "Apt 1225", "phone": "917-291-7177", "img": "https://picsum.photos/500/300"
    },
    { "id": "2", "name": "Clarette Driffill", "city": "0X9G3ZZ", "municipality": "cdriffill1@lycos.com", "address": "P sherman calle wallaby 42 sydney", "phone": "923-935-5396", "img": "https://picsum.photos/600/300" },
    { "id": "3", "name": "Lizzie Zebedee", "city": "B51", "municipality": "lzebedee2@oaic.gov.au", "address": "Apt 419", "phone": "819-458-3365", "img": '' },
    { "id": "4", "name": "Lurlene McIlwrath", "city": "0NBS3ZX", "municipality": "lmcilwrath3@deliciousdays.com", "address": "Room 446", "phone": "437-876-3159", "img": "https://picsum.photos/800/300" },
    { "id": "5", "name": "Linc Springtorp", "city": "09UN07Z", "municipality": "lspringtorp4@weibo.com", "address": "PO Box 4053", "phone": "604-216-4378", "img": "https://picsum.photos/900/300" },
    { "id": "6", "name": "Dulcine Gonnely", "city": "HZ81ZZZ", "municipality": "dgonnely5@ox.ac.uk", "address": "PO Box 23364", "phone": "555-949-4158", "img": "https://picsum.photos/1000/300" },
    { "id": "7", "name": "Karlotte Filler", "city": "10Y04ZG", "municipality": "kfiller6@java.com", "address": "Suite 40", "phone": "416-404-3139", "img": "https://picsum.photos/1100/300" },
    { "id": "8", "name": "Shelia Carlone", "city": "0UTF4ZZ", "municipality": "scarlone7@ft.com", "address": "Room 1249", "phone": "126-736-5284", "img": "https://picsum.photos/1200/300" },
    { "id": "9", "name": "Tiena Lehr", "city": "3E0J329", "municipality": "tlehr8@trellian.com", "address": "PO Box 837", "phone": "167-449-7358", "img": "https://picsum.photos/1300/300" },
    { "id": "10", "name": "Ross Kirdsch", "city": "02NN3ZZ", "municipality": "rkirdsch9@ow.ly", "address": "Apt 1310", "phone": "272-851-6868", "img": "https://picsum.photos/1400/300" },
    ];

  constructor(private drawerEvent: DrawerEvent) { }

  ngOnInit(): void {
  }

  createBranchOffice() {
    this.drawerEvent.changeOpenComponent({ component: BranchOfficeFormComponent })
  }
}
