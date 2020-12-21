const obj = [
    {
        "Global": {
          "NewConfirmed": 100282,
          "TotalConfirmed": 1162857,
          "NewDeaths": 5658,
          "TotalDeaths": 63263,
          "NewRecovered": 15405,
          "TotalRecovered": 230845
        },
        "Countries": [
          {
            "Country": "Albania",
            "CountryCode": "AL",
            "Slug": "albania",
            "NewConfirmed": 29,
            "TotalConfirmed": 333,
            "NewDeaths": 3,
            "TotalDeaths": 20,
            "NewRecovered": 10,
            "TotalRecovered": 99,
            "Date": "2020-04-05T06:37:00Z"
          },
          {
            "Country": "Algeria",
            "CountryCode": "DZ",
            "Slug": "algeria",
            "NewConfirmed": 80,
            "TotalConfirmed": 1251,
            "NewDeaths": 25,
            "TotalDeaths": 130,
            "NewRecovered": 28,
            "TotalRecovered": 90,
            "Date": "2020-04-05T06:37:00Z"
          }
        ]
    }
]

const months = [
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

const monthsFound = months.map(({text}) => text)

console.log(monthsFound)

/* let result = obj.Countries.map(el => el.Country); */

const found = obj[0].Countries.find((el) => el.Country === 'Algeria')

const list = obj[0].Countries.map(el => el.Country)

console.log(list)
