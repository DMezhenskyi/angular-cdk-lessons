import { DialogComponent } from './overlay-example/dialog/dialog.component';
import { Component } from '@angular/core';
import { Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-cdk-lessons';

  constructor(
    private overly: Overlay,
    private positionBuilder: OverlayPositionBuilder
  ) {}

  createDialog() {
    const overlayRef = this.overly.create({
      hasBackdrop: true,
      positionStrategy: this.positionBuilder
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
    const dialogPortal = new ComponentPortal(DialogComponent);
    overlayRef.attach(dialogPortal);
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }
}
