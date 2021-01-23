export const url_data = 'https://api.covid19api.com/summary'
export const url_volunteer = 'http://localhost:5000/volunteer'

export const httpOptions = (method) => {
  return {
    method: method,
    mode: 'cors',
    cache: 'default',
    headers: {
      'content-type': 'application/json'
    },
  }
}

export const httpOptionsBody = (method, body) => {
  return {
    method: method,
    mode: 'cors',
    cache: 'default',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  }
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

  export const getCountry = (res) => {
    return {
      country: res.Country
    }
  }