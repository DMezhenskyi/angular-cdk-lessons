import { MatInput } from '@angular/material/input';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import { NgControl } from '@angular/forms';

export interface FormFieldValue {
  query: string;
  scope: string;
}

@Component({
  selector: 'app-custom-form-field-control',
  templateUrl: './custom-form-field-control.component.html',
  styleUrls: ['./custom-form-field-control.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomFormFieldControlComponent,
    },
  ],
})
export class CustomFormFieldControlComponent
  implements OnInit, OnDestroy, MatFormFieldControl<FormFieldValue> {
  static nextId = 0;
  @ViewChild(MatInput, { read: ElementRef, static: true })
  input: ElementRef;
  @Input()
  set value(value: FormFieldValue) {
    this._value = value;
    this.stateChanges.next();
  }
  get value() {
    return this._value;
  }
  private _value: FormFieldValue;

  stateChanges = new Subject<void>();

  @HostBinding()
  id = `custom-form-field-id-${CustomFormFieldControlComponent.nextId++}`;

  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  get placeholder() {
    return this._placeholder;
  }
  private _placeholder: string;

  ngControl: NgControl = null;

  focused: boolean;

  get empty(): boolean {
    return !this.value.query && !this.value.scope;
  }

  @HostBinding('class.floated')
  get shouldLabelFloat(): boolean {
    return true;
  }

  @Input()
  required: boolean;

  @Input()
  disabled: boolean;

  errorState = false;

  controlType = 'custom-form-field';

  @HostBinding('attr.aria-describedby') describedBy = '';

  constructor(private focusMonitor: FocusMonitor) {}

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }
  onContainerClick(): void {
    this.focusMonitor.focusVia(this.input, 'program');
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.input).subscribe((focused) => {
      this.focused = !!focused;
      this.stateChanges.next();
    });
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.input);
    this.stateChanges.complete();
  }
}
