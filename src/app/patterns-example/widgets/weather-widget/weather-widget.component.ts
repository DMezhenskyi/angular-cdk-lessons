import { WIDGET } from './../widget.token';
import { Component } from '@angular/core';
import { Widget } from '../widget.interface';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
  providers: [
    {
      provide: WIDGET,
      useExisting: WeatherWidgetComponent,
    },
  ],
})
export class WeatherWidgetComponent implements Widget {
  isLoading = false;
  load() {
    console.log('Load data from WEATHER API... ');
  }
  refresh() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
