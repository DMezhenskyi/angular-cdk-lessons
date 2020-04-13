import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Observable, merge } from 'rxjs';
import { map, filter, mapTo, startWith } from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatInput } from '@angular/material/input';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

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

  @ViewChild(MatInput, { read: ElementRef, static: true })
  private inputEl: ElementRef;

  @ViewChild(CdkConnectedOverlay, { static: true })
  private connectedOverlay: CdkConnectedOverlay;

  private isPanelVisible$: Observable<boolean>;
  private isPanelHidden$: Observable<boolean>;

  constructor(private focusMonitor: FocusMonitor) {}

  ngOnInit(): void {
    this.isPanelHidden$ = this.connectedOverlay.backdropClick.pipe(
      mapTo(false)
    );
    this.isPanelVisible$ = this.focusMonitor.monitor(this.inputEl).pipe(
      filter((focused) => !!focused),
      mapTo(true)
    );
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
