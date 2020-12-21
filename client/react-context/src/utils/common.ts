import Volunteer from '../components/volunteer/Volunteer'
import { ICountry } from '../utils/interfaces'

export const url_data: string = 'https://api.covid19api.com/summary'
export const url_volunteer: string = 'http://localhost:5000/volunteer'

export const httpGET: {} = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: {
      'content-type': 'application/json'
    },
}

export const httpDEL: {} = {
  method: 'DELETE',
  mode: 'cors',
  cache: 'default',
  headers: {
    'content-type': 'application/json'
  },
}

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

export const getCountry = (res: ICountry) => {
    return {
      country: res.Country
    }
  }

  



