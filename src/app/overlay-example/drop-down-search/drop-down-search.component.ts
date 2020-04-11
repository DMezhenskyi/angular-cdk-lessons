import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-drop-down-search',
  templateUrl: './drop-down-search.component.html',
  styleUrls: ['./drop-down-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropDownSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
