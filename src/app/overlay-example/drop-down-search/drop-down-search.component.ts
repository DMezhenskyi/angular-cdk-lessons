import { CustomInputComponent } from './../../custom-input/custom-input/custom-input.component';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Observable, merge, iif, EMPTY } from 'rxjs';
import {
  map,
  filter,
  mapTo,
  startWith,
  switchMap,
  delay,
  pluck,
} from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  CdkConnectedOverlay,
  ConnectedPosition,
  ScrollStrategy,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { OverlayReference } from '@angular/cdk/overlay/overlay-reference';

export interface State {
  flag: string;
  name: string;
  population: string;
  country: string;
}

@Component({
  selector: 'app-drop-down-search',
  templateUrl: './drop-down-search.component.html',
  styleUrls: ['./drop-down-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownSearchComponent implements OnInit {
  showPanel$: Observable<boolean>;

  states: State[] = [
    {
      name: 'Vienna',
      population: '1.897M',
      flag:
        '//upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Flag_of_Salzburg%2C_Vienna%2C_Vorarlberg.svg/100px-Flag_of_Salzburg%2C_Vienna%2C_Vorarlberg.svg.png',
      country: 'at',
    },
    {
      name: 'Salzburg',
      population: '152.367K',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Salzburg_%28state%29.svg/1280px-Flag_of_Salzburg_%28state%29.svg.png',
      country: 'at',
    },
    {
      name: 'Kiev',
      population: '2.884M',
      flag:
        'https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_Kyiv_Kurovskyi.svg',
      country: 'ua',
    },
    {
      name: 'Novopskov',
      population: '9,891K',
      flag:
        '//upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Flag_of_Novopskovskiy_Raion_in_Luhansk_Oblast.png/100px-Flag_of_Novopskovskiy_Raion_in_Luhansk_Oblast.png',
      country: 'ua',
    },
  ];
  stateCtrl = new FormControl();
  filteredStates$: Observable<State[]>;
  isCaseSensitive = false;
  positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: -21,
    },
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      panelClass: 'no-enogh-space-at-bottom',
    },
  ];

  scrollStrategy: ScrollStrategy;

  @ViewChild(CustomInputComponent, { static: true })
  private inputEl: CustomInputComponent;

  @ViewChild(CdkConnectedOverlay, { static: true })
  private connectedOverlay: CdkConnectedOverlay;

  private isPanelVisible$: Observable<boolean>;
  private isPanelHidden$: Observable<boolean>;
  private isOverlayDetached$: Observable<void>;

  constructor(private focusMonitor: FocusMonitor) {}

  ngOnInit(): void {
    this.scrollStrategy = new ConfirmScrollStrategy(this.inputEl.input);

    this.isPanelVisible$ = this.focusMonitor.monitor(this.inputEl.input).pipe(
      filter((focused) => !!focused),
      mapTo(true)
    );
    this.isOverlayDetached$ = this.isPanelVisible$.pipe(
      delay(0),
      switchMap(() =>
        iif(
          () => !!this.connectedOverlay.overlayRef,
          this.connectedOverlay.overlayRef.detachments(),
          EMPTY
        )
      )
    );
    this.isPanelHidden$ = merge(
      this.isOverlayDetached$,
      this.connectedOverlay.backdropClick
    ).pipe(mapTo(false));
    this.showPanel$ = merge(this.isPanelHidden$, this.isPanelVisible$);

    this.filteredStates$ = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((searchTerms) =>
        searchTerms ? this._filterStates(searchTerms) : this.states.slice()
      )
    );
  }

  setCaseSensitive({ checked }: MatSlideToggleChange) {
    this.isCaseSensitive = checked;
  }

  private _filterStates(value: any): State[] {
    const filterValue = this.caseCheck(value.query);

    return this.states
      .filter((state) => state.country === value.scope)
      .filter((state) => this.caseCheck(state.name).indexOf(filterValue) === 0);
  }

  private caseCheck(value: string) {
    return this.isCaseSensitive ? value : value.toLowerCase();
  }
}

class ConfirmScrollStrategy implements ScrollStrategy {
  _overlay: OverlayReference;

  constructor(private inputRef: ElementRef) {}

  attach(overlayRef: OverlayReference) {
    this._overlay = overlayRef;
  }

  enable() {
    document.addEventListener('scroll', this.scrollListener);
  }

  disable() {
    document.removeEventListener('scroll', this.scrollListener);
  }

  private scrollListener = () => {
    if (confirm('The overlay will be closed. Procced?')) {
      this._overlay.detach();
      this.inputRef.nativeElement.blur();
      return;
    }
    this._overlay.updatePosition();
  };
}
