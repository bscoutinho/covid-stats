import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { global } from '@angular/compiler/src/util';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  providers: [GlobalService]
})
export class OverviewComponent implements OnInit {

  country: string
  countries: any
  isLoading: boolean = false
  totalConfirmed: number
  totalRecovered: number
  totalDeath: number
  totalActive: number
  percentRecovered: number
  percentDeath: number
  percentActive: number
  newConfirmed: number
  newDeath: number
  newRecovered: number
  newActive: number

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.fetchDataGlobal()
  }

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.countries
        : this.countries.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  fetchDataCountry() {
    
    this.isLoading = true
    const globalData = this.globalService.getData()
    globalData.subscribe((res: any) => {

      const obj = res.Countries.find((el) => el.Country === this.country)

      if (obj === undefined) {
        alert("Não foi possível encontrar o país")
      } else {
        this.totalConfirmed = obj.TotalConfirmed
        this.totalRecovered = obj.TotalRecovered
        this.totalDeath = obj.TotalDeaths
        this.totalActive = obj.TotalConfirmed - obj.TotalRecovered - obj.TotalDeaths
        this.percentRecovered = obj.TotalRecovered / obj.TotalConfirmed * 100
        this.percentDeath = obj.TotalDeaths / obj.TotalConfirmed * 100
        this.percentActive = 100 - (obj.TotalDeaths / obj.TotalConfirmed * 100) - (obj.TotalRecovered / obj.TotalConfirmed * 100)
        this.newConfirmed = obj.NewConfirmed
        this.newDeath = obj.NewDeaths
        this.newRecovered = obj.NewRecovered
        this.newActive = obj.NewConfirmed - obj.NewDeaths - obj.NewRecovered
      }
    })
    this.isLoading = false


  }

  fetchDataGlobal() {

    this.isLoading = true

    const globalData = this.globalService.getData()
    globalData.subscribe((res: any) => {
      this.countries = this.globalService.fetchCountryList(res)
      this.totalConfirmed = res.Global.TotalConfirmed
      this.totalRecovered = res.Global.TotalRecovered
      this.totalDeath = res.Global.TotalDeaths
      this.totalActive = res.Global.TotalConfirmed - res.Global.TotalRecovered - res.Global.TotalDeaths
      this.percentRecovered = res.Global.TotalRecovered / res.Global.TotalConfirmed * 100
      this.percentDeath = res.Global.TotalDeaths / res.Global.TotalConfirmed * 100
      this.percentActive = 100 - (res.Global.TotalDeaths / res.Global.TotalConfirmed * 100) - (res.Global.TotalRecovered / res.Global.TotalConfirmed * 100)
      this.newConfirmed = res.Global.NewConfirmed
      this.newDeath = res.Global.NewDeaths
      this.newRecovered = res.Global.NewRecovered
      this.newActive = res.Global.NewConfirmed - res.Global.NewDeaths - res.Global.NewRecovered
    });

    this.isLoading = false
  }
}
