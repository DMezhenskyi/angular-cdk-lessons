import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueAccessorExampleComponent } from './value-accessor-example/value-accessor-example.component';
import { LockInputComponent } from './lock-input/lock-input.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ValueAccessorExampleComponent, LockInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [ValueAccessorExampleComponent],
})
export class ComplexFormControlModule {}
