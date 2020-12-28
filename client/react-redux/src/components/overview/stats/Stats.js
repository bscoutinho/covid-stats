import { MenuItem, Select } from '@material-ui/core';
import { FormControl, InputLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { months, httpOptions } from '../../../utils/common'

import  './Stats.css'

function Stats() {

  const result = useSelector( state => {
    console.log(state.stats)
    return state.stats
  })

  const [stats, setStats] = useState([])

  const [year, setYear] = useState('2020');

  const urlStats = `https://api.covid19api.com/total/country/${result}`

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  const createObjArr = () => {

    if (result) {
      fetch(urlStats, httpOptions('GET'))
          .then((response) => response.json())
          .then((data) => {
              const objArrAux = []

              //assembly an object to populate the list
              months.map((el) => { 
                const date = `${year}-${el.number}-28T00:00:00Z`
                const objFound = data.find((el) => el.Date === date)
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
              setStats(objArrAux)
          })
          .catch(err => {
            console.log(err)
          }) 
    }
  }

  useEffect(() => {
    createObjArr()
  }, [year])

  return (
    <div className='main-stats'>
      <div className='select'>
        <FormControl variant="outlined" >
          <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={year}
            onChange={handleChange}
            label="Year"
            className='year'
          >
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
          </Select>
        </FormControl>
      </div>
      
      <div className="panel-stats">
        <span className='title-panel-stats'>Cases/Deaths Montly</span>
        
        {stats.map((el) => {  
           return (
            <div className='row-stats' key={el.Month}>
              <span className='row-month'>{el.Month}</span>
              <span className='row-value'>{el.Confirmed.toLocaleString('de-DE')}</span>
              <span className='row-amount'>{el.Deaths.toLocaleString('de-DE')}</span>
            </div>
           ) 
        })}
      </div>  
    </div>  
  )
}

export default Stats;
