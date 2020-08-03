import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormFieldControlComponent } from './custom-form-field-control/custom-form-field-control.component';
import { SearchFormFieldContainerComponent } from './search-form-field-container/search-form-field-container.component';

@NgModule({
  declarations: [
    CustomFormFieldControlComponent,
    SearchFormFieldContainerComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  exports: [SearchFormFieldContainerComponent, CustomFormFieldControlComponent],
})
export class AdvancedSearchControlModule {}
