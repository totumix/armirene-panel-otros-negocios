import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() ifDisable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
