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
} from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatInput } from '@angular/material/input';
import {
  CdkConnectedOverlay,
  ConnectedPosition,
  ScrollStrategyOptions,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayReference } from '@angular/cdk/overlay/overlay-reference';

export interface State {
  flag: string;
  name: string;
  population: string;
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
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Vienna.svg/800px-Flag_of_Vienna.svg.png',
    },
    {
      name: 'Salzburg',
      population: '152.367K',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Salzburg_%28state%29.svg/1280px-Flag_of_Salzburg_%28state%29.svg.png',
    },
    {
      name: 'Kiev',
      population: '2.884M',
      flag:
        'https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_Kyiv_Kurovskyi.svg',
    },
    {
      name: 'Novopskov',
      population: '9,891K',
      flag:
        '//upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Flag_of_Novopskovskiy_Raion_in_Luhansk_Oblast.png/100px-Flag_of_Novopskovskiy_Raion_in_Luhansk_Oblast.png',
    },
  ];
  stateCtrl = new FormControl();
  filteredStates$: Observable<State[]>;
  isCaseSensitive: boolean = false;
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

  @ViewChild(MatInput, { read: ElementRef, static: true })
  private inputEl: ElementRef;

  @ViewChild(CdkConnectedOverlay, { static: true })
  private connectedOverlay: CdkConnectedOverlay;

  private isPanelVisible$: Observable<boolean>;
  private isPanelHidden$: Observable<boolean>;
  private isOverlayDetached$: Observable<void>;

  constructor(
    private focusMonitor: FocusMonitor,
    private scrollStrategies: ScrollStrategyOptions
  ) {}

  ngOnInit(): void {
    this.scrollStrategy = new ConfirmScrollStrategy(this.inputEl);

    this.isPanelVisible$ = this.focusMonitor.monitor(this.inputEl).pipe(
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
      map((state) => (state ? this._filterStates(state) : this.states.slice()))
    );
  }

  setCaseSensitive({ checked }: MatSlideToggleChange) {
    this.isCaseSensitive = checked;
  }

  private _filterStates(value: string): State[] {
    const filterValue = this.caseCheck(value);

    return this.states.filter(
      (state) => this.caseCheck(state.name).indexOf(filterValue) === 0
    );
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
