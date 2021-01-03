import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  url_data = 'https://api.covid19api.com/summary'

  url_volunteer = 'http://localhost:5000/volunteer'

  headers = this.getHeaders()

  months = [
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

  country: string = ''

  getHeaders() {
    const config = {
      headers: new HttpHeaders(),
    };
    return config;
  }

  getData() {
    return this.http.get(this.url_data, this.headers);
  }

  getVolunteer() {
    return this.http.get(this.url_volunteer, this.headers);
  }

  postVolunteer(body) {
    return this.http.post(this.url_volunteer, body, this.headers);
  }

  putVolunteer(id, body) {
    const url = `${this.url_volunteer}/${id}`
    return this.http.patch(url, body, this.headers);
  }

  deleteVolunteer(id) {
    const url = `${this.url_volunteer}/${id}`
    return this.http.delete(url, this.headers);
  }

  fetchCountryList(res) {
    const list = res.Countries.map((el) => el.Country) 
    return list
  }

  fetchStats(url) {
    const config = this.getHeaders()
    return this.http.get(url, config);
  }


  
}
