import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SelectSearchComponent } from './select-search/select-search.component';
import { CustomInputComponent } from './custom-input/custom-input.component';

@NgModule({
  declarations: [SelectSearchComponent, CustomInputComponent],
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SelectSearchComponent, CustomInputComponent],
})
export class CustomInputModule {}
