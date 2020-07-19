import { Widget } from './../widgets/widget.interface';
import { WIDGET } from './../widgets/widget.token';
import { Component, OnInit, ContentChild } from '@angular/core';

@Component({
  selector: 'app-widget-wrapper',
  templateUrl: './widget-wrapper.component.html',
  styleUrls: ['./widget-wrapper.component.scss'],
})
export class WidgetWrapperComponent implements OnInit {
  @ContentChild(WIDGET as any, { static: true })
  widget: Widget;

  ngOnInit() {
    this.widget.load();
  }

  onRefresh() {
    this.widget.refresh();
  }
}
