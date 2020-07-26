import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

import { OverlayExampleModule } from './overlay-example/overlay-example.module';
import { ComplexFormControlModule } from './complex-form-control/complex-form-control.module';
import { PatternsExampleModule } from './patterns-example/patterns-example.module';
import { AdvancedSearchControlModule } from './advanced-search-control/advanced-search-control.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    OverlayExampleModule,
    MatButtonModule,
    LayoutModule,
    ComplexFormControlModule,
    PatternsExampleModule,
    AdvancedSearchControlModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
