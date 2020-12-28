import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import Stats from './stats/Stats';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, CircularProgress } from '@material-ui/core';
import { url_data, httpOptions } from '../../utils/common'
import { selectCountry } from '../../redux/Stats.actions'

import './Overview.css';

function Overview() {

  const dispatch = useDispatch()

  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalConfirmed, setTotalConfirmed] = useState(0)
  const [totalRecovered, setTotalRecovered] = useState(0)
  const [totalDeath, setTotalDeath] = useState(0)
  const [totalActive, setTotalActive] = useState(0)
  const [percentRecovered, setPercentRecovered] = useState(0)
  const [percentDeath, setPercentDeath] = useState(0)
  const [percentActive, setPercentActive] = useState(0)
  const [newConfirmed, setNewConfirmed] = useState(0)
  const [newDeath, setNewDeath] = useState(0)
  const [newRecovered, setNewRecovered] = useState(0)
  const [newActive, setNewActive] = useState(0)

  const handleChangeCountry = (event, newValue) => {
      setCountry(newValue);
      (newValue !== null) ? fetchDataCountry(url_data, newValue) : fetchDataGlobal(url_data)
      dispatch(selectCountry(newValue))
      
  }

  const fetchCountryList = async (url) => {
    await fetch(url, httpOptions('GET'))
      .then((response) => response.json())
      .then((data) => {
        setCountries((data.Countries.map((el) => el.Country)).sort())
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchDataGlobal = async (url) => {
    setIsLoading(true)

    await fetch(url, httpOptions('GET'))
      .then((response) => response.json())
      .then((res) => {
        setTotalConfirmed(res.Global.TotalConfirmed)
        setTotalRecovered(res.Global.TotalRecovered)
        setTotalDeath(res.Global.TotalDeaths)
        setTotalActive(res.Global.TotalConfirmed - res.Global.TotalRecovered - res.Global.TotalDeaths)
        setPercentRecovered(res.Global.TotalRecovered / res.Global.TotalConfirmed * 100)
        setPercentDeath(res.Global.TotalDeaths / res.Global.TotalConfirmed * 100)
        setPercentActive(100 - (res.Global.TotalDeaths / res.Global.TotalConfirmed * 100) - (res.Global.TotalRecovered / res.Global.TotalConfirmed * 100))
        setNewConfirmed(res.Global.NewConfirmed)
        setNewDeath(res.Global.NewDeaths)
        setNewRecovered(res.Global.NewRecovered)
        setNewActive(res.Global.NewConfirmed - res.Global.NewDeaths - res.Global.NewRecovered)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        alert(err)
      })
  }

  const fetchDataCountry = async (url, newValue) => {
    setIsLoading(true)

    await fetch(url, httpOptions('GET'))
      .then((response) => response.json())
      .then((res) => {

        const obj = res.Countries.find((el) => el.Country === newValue)

        setTotalConfirmed(obj.TotalConfirmed)
        setTotalRecovered(obj.TotalRecovered)
        setTotalDeath(obj.TotalDeaths)
        setTotalActive(obj.TotalConfirmed - obj.TotalRecovered - obj.TotalDeaths)
        setPercentRecovered(obj.TotalRecovered / obj.TotalConfirmed * 100)
        setPercentDeath(obj.TotalDeaths / obj.TotalConfirmed * 100)
        setPercentActive(100 - (obj.TotalDeaths / obj.TotalConfirmed * 100) - (obj.TotalRecovered / obj.TotalConfirmed * 100))
        setNewConfirmed(obj.NewConfirmed)
        setNewDeath(obj.NewDeaths)
        setNewRecovered(obj.NewRecovered)
        setNewActive(obj.NewConfirmed - obj.NewDeaths - obj.NewRecovered)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        alert(err)
      })
  }

  useEffect(() => {
    fetchCountryList(url_data)
    fetchDataGlobal(url_data)
  }, [])

  return (
    <div>
      {isLoading ? (
        <div className='main-overview'>
          <CircularProgress className='loading' />
        </div>

      ) : (
            <div className='main-overview'>
              <div className='overview'>
                <h4>Overview</h4>
                <Autocomplete
                  value={country}
                  onChange={handleChangeCountry}
                  id="country-select"
                  options={countries}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Select a Country" variant="outlined" className="country-textfield" />}
                />

                <div className="panel-overview">

                  <div className='paper-first'>
                    <div className='card-total'>
                      <span className='title'>Total Cases</span>
                      <span className='value'>{totalConfirmed.toLocaleString('de-DE')}</span>
                      <div className='total-new'>
                         <span className='text-new'>+{newConfirmed.toLocaleString('de-DE')}</span>
                      </div>
                    </div>

                  </div>

                  <div className='paper-second'>
                    <div className='card-active'>
                      <div>
                        <span className='title'>Active</span>
                        <span className='percent'>{parseFloat(percentActive.toString()).toFixed(2) + "%"}</span>
                      </div>
                      <span className='value'>{totalActive.toLocaleString('de-DE')}</span>
                      <div className='active-new'>
                        <span className='text-new'>{(newActive > 0) && '+' }{newActive.toLocaleString('de-DE')}</span>
                      </div>
                    </div>
                    <div className='card-recovered'>
                      <div>
                        <span className='title'>Recovered</span>
                        <span className='percent'>{parseFloat(percentRecovered.toString()).toFixed(2) + "%"}</span>
                      </div>
                      <span className='value'>{totalRecovered.toLocaleString('de-DE')}</span>
                      <div className='recovered-new'>
                        <span className='text-new'>+{newRecovered.toLocaleString('de-DE')}</span>
                      </div>
                    </div>
                    <div className='card-death'>
                      <div>
                        <span className='title'>Death</span>
                        <span className='percent'>{parseFloat(percentDeath.toString()).toFixed(2) + "%"}</span>
                      </div>
                      <span className='value'>{totalDeath.toLocaleString('de-DE')}</span>
                      <div className='death-new'>
                        <span className='text-new'>+{newDeath.toLocaleString('de-DE')}</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
              <div className='stats'>
                {country && <Stats />}
              </div>
            </div>
        )}
    </div>



  );
}

export default Overview;


