import { MatInput } from '@angular/material/input';
import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  Input,
  Self,
  Optional,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import {
  NgControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export interface SearchQuery {
  query: string;
  scope: number;
}

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: CustomInputComponent },
  ],
})
export class CustomInputComponent
  implements
    OnInit,
    OnDestroy,
    MatFormFieldControl<SearchQuery>,
    ControlValueAccessor {
  static nextId = 0;

  form: FormGroup;

  @ViewChild(MatInput, { read: ElementRef, static: true }) input: ElementRef;

  set value(value: SearchQuery | null) {
    this.onChange(value);
    this.form.patchValue(value || {});
    this.stateChanges.next();
  }
  get value() {
    return this.form.value;
  }

  readonly stateChanges = new Subject<void>();

  @HostBinding() id = `example-tel-input-${CustomInputComponent.nextId++}`;

  @Input()
  get placeholder() {
    return this._placeholder || 'Enter search term';
  }
  set placeholder(plh: string) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  focused = false;

  get empty() {
    return !!this.value;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return true;
  }
  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = true;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _disabled = false;

  controlType = 'example-tel-input';
  autofilled?: boolean;
  errorState: boolean;

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private fb: FormBuilder
  ) {
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
    this.form = this.fb.group({
      scope: new FormControl(''),
      query: new FormControl(''),
    });
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => this.onChange(this.value));
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  setDescribedByIds(): void {
    // throw new Error('Method not implemented.');
  }
  onContainerClick(event: Event): void {
    this.focused = true;
    // throw new Error('Method not implemented.');
  }

  setQueryString(val) {
    // this.writeValue({ ...this.value, query: val });
    this.onChange({ ...this.value, query: val });
  }
  setScope(val) {
    // this.writeValue({ ...this.value, query: val });
    this.onChange({ ...this.value, scope: val });
  }
}
