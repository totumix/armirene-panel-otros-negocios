import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Business } from 'src/app/core/models/business.class';
import { SharedModule } from '../../shared.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, NzIconModule]
})
export class BusinessCardComponent {
  @Input() business: Business;

  constructor() { }

  ngOnInit(): void {
  }

  editBusiness(business: Business) {
  }
}
