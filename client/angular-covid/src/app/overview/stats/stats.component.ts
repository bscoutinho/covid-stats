import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  year = 2020;
  @Input() country: string
  stats: any[]
  urlStats: string

  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {}

  ngOnChanges() {
    this.createStats()
  }

  clickRadio(param) {
    this.year = param
    this.createStats()
  }

  createStats() {
    const urlStats = `https://api.covid19api.com/total/country/${this.country}`

    if (this.country) {

      const dataStats = this.globalService.fetchStats(urlStats)
      dataStats.subscribe((res: any) => { 

        const objArrAux = []

        this.globalService.months.map((el) => { 
          const date = `${this.year}-${el.number}-28T00:00:00Z`
          const objFound = res.find((el) => el.Date === date)
          if (objFound === undefined) {
            objArrAux.push(
              {
                Month: el.text,
                Confirmed: 0,
                Deaths: 0
              }
            )
          } else {
            objArrAux.push(
              {
                Month: el.text,
                Confirmed: objFound.Confirmed,
                Deaths: objFound.Deaths
              }
            )
          }
        })
        this.stats = objArrAux
      })
    }

  }

}
