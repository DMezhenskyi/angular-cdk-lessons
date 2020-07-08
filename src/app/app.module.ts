import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayExampleModule } from './overlay-example/overlay-example.module';
import { CustomInputModule } from './custom-input/custom-input.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    OverlayExampleModule,
    MatButtonModule,
    LayoutModule,
    CustomInputModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
