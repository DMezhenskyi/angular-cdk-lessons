import { FormControl } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectSearchComponent implements OnInit {
  formControl = new FormControl();
  constructor() {}

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((s) => console.log('Test: ', s));
  }
}
