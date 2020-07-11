import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  MatDateRangeInput,
  MatCalendarCellCssClasses,
  MatDateRangePicker,
} from '@angular/material/datepicker';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  comparisonStart = new Date('2020-06-27');
  comparisonEnd = new Date('2020-07-15');
  startAt = new Date('2020-07-3');

  @ViewChild(MatDateRangeInput) private rangeInput: MatDateRangeInput<Date>;
  @ViewChild(MatDateRangePicker) private rangePicker: MatDateRangePicker<Date>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      daterange: new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
      }),
    });
  }

  ngAfterViewInit() {
    console.log(
      'DialogComponent -> ngAfterViewInit -> this.rangeInput.focused',
      this.rangeInput.focused
    );
  }

  onSubmit() {
    console.log(this.form.value);
  }

  unavailableDays(calendarDate: Date): boolean {
    return calendarDate > new Date();
  }

  cellClass(date: Date): MatCalendarCellCssClasses {
    return date > new Date() ? 'test-cell-class' : 'test-another-cell-class';
  }
}
