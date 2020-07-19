import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WidgetWrapperComponent } from './widget-wrapper/widget-wrapper.component';
import { WeatherWidgetComponent } from './widgets/weather-widget/weather-widget.component';
import { VelocityWidgetComponent } from './widgets/velocity-widget/velocity-widget.component';

@NgModule({
  declarations: [
    WidgetWrapperComponent,
    WeatherWidgetComponent,
    VelocityWidgetComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    WidgetWrapperComponent,
    WeatherWidgetComponent,
    VelocityWidgetComponent,
  ],
})
export class PatternsExampleModule {}
