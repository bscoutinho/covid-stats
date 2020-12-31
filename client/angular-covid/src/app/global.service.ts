import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export const url_data = 'https://api.covid19api.com/summary'
export const url_volunteer = 'http://localhost:5000/volunteer'

export const months = [
  {
    "text": "Jan",
    "number": "01"
  },
  {
    "text": "Feb",
    "number": "02"
  },
  {
    "text": "Mar",
    "number": "03"
  },
  {
    "text": "Apr",
    "number": "04"
  },
  {
    "text": "May",
    "number": "05"
  },
  {
    "text": "Jun",
    "number": "06"
  },
  {
    "text": "Jul",
    "number": "07"
  },
  {
    "text": "Aug",
    "number": "08"
  },
  {
    "text": "Sep",
    "number": "09"
  },
  {
    "text": "Oct",
    "number": "10"
  },
  {
    "text": "Nov",
    "number": "11"
  },
  {
    "text": "Dec",
    "number": "12"
  },
]

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  getHeaders() {
    const config = {
      headers: new HttpHeaders(),
    };
    return config;
  }

  getData() {
    const config = this.getHeaders()
    const url = url_data
    return this.http.get(url, config);
  }

  fetchCountryList(res) {
    const list = res.Countries.map((el) => el.Country) 
    return list
  }


  
}
