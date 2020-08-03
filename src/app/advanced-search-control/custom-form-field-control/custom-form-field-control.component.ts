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
  Optional,
  Self,
  DoCheck,
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import {
  NgControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import {
  ErrorStateMatcher,
  CanUpdateErrorStateCtor,
  mixinErrorState,
  mixinDisabled,
  CanDisableCtor,
} from '@angular/material/core';
import { take } from 'rxjs/operators';

export interface FormFieldValue {
  query: string;
  scope: string;
}

export class CustomErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl): boolean {
    return control.dirty && control.invalid;
  }
}

class SearchInputBase {
  constructor(
    public _parentFormGroup: FormGroupDirective,
    public _parentForm: NgForm,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public ngControl: NgControl
  ) {}
}

const _SearchInputMixiBase: CanUpdateErrorStateCtor &
  CanDisableCtor = mixinDisabled(mixinErrorState(SearchInputBase));

@Component({
  selector: 'app-custom-form-field-control',
  templateUrl: './custom-form-field-control.component.html',
  styleUrls: ['./custom-form-field-control.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomFormFieldControlComponent,
    },
    {
      provide: ErrorStateMatcher,
      useClass: CustomErrorMatcher,
    },
  ],
})
export class CustomFormFieldControlComponent extends _SearchInputMixiBase
  implements
    OnInit,
    OnDestroy,
    MatFormFieldControl<FormFieldValue>,
    ControlValueAccessor,
    DoCheck {
  static nextId = 0;
  @ViewChild(MatInput, { read: ElementRef, static: true })
  input: ElementRef;
  @Input()
  set value(value: FormFieldValue) {
    this.form.patchValue(value);
    this.stateChanges.next();
  }
  get value() {
    return this.form.value;
  }

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

  controlType = 'custom-form-field';

  @HostBinding('attr.aria-describedby') describedBy = '';

  onChange: (value: FormFieldValue) => void;
  onToutch: () => void;

  form: FormGroup;

  constructor(
    private focusMonitor: FocusMonitor,
    @Optional() @Self() public ngControl: NgControl,
    private fb: FormBuilder,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.form = this.fb.group({
      scope: new FormControl(''),
      query: new FormControl(''),
    });
  }

  writeValue(obj: FormFieldValue): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onToutch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.form.disable();
    this.stateChanges.next();
  }

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
    this.focusMonitor
      .monitor(this.input)
      .pipe(take(1))
      .subscribe(() => {
        this.onToutch();
      });
    this.form.valueChanges.subscribe((value) => this.onChange(value));
  }

  ngDoCheck() {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.input);
    this.stateChanges.complete();
  }
}
