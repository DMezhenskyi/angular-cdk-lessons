import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { DropDownSearchComponent } from './drop-down-search/drop-down-search.component';

@NgModule({
  declarations: [DropDownSearchComponent],
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatIconModule],
  exports: [DropDownSearchComponent],
})
export class OverlayExampleModule {}
