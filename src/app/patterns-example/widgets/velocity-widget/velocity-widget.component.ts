import { Component } from '@angular/core';

@Component({
  selector: 'app-velocity-widget',
  templateUrl: './velocity-widget.component.html',
  styleUrls: ['./velocity-widget.component.scss'],
})
export class VelocityWidgetComponent {
  isRefreshing = false;

  load() {
    console.log('Load data from JIRA API... ');
  }
  refresh() {
    this.isRefreshing = true;
    setTimeout(() => {
      this.isRefreshing = false;
    }, 2500);
  }
}
