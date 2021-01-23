import React, { useState, useEffect } from 'react';
import { ColDef, DataGrid, ValueGetterParams, CellParams, GridApi } from '@material-ui/data-grid'
import { IVolunteer } from '../../utils/interfaces'
import './Volunteer.css'
import { Button, IconButton, TextField } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { url_volunteer, httpGET, httpDEL } from '../../utils/common'


function Volunteer() {

  const initialFormState = { name: '', email: '', phone: '' }
  const [volunteers, setVolunteers] = useState<any>([])
  const [volunteer, setVolunteer] = useState(initialFormState)
  const [fromEdit, setFromEdit] = useState<boolean>(false)
  const [id, setId] = useState<any>()

  const httpPOST: {} = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(volunteer)
  }

  const httpPUT: {} = {
    method: 'PATCH',
    mode: 'cors',
    cache: 'default',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(volunteer)
  }

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setVolunteer({ ...volunteer, [name]: value })
  }

  const getVolunteer = async () => {

    const objArrAux: IVolunteer[] = []

    await fetch(url_volunteer, httpGET)
      .then((response) => response.json())
      .then((data) => {
        //assembly an object to populate the list
        data.map((el: any) => {
          objArrAux.push(
            {
              id: el._id,
              name: el.name,
              email: el.email,
              phone: el.phone,
            }
          )
        })
      })
      .catch(err => {
        console.log(err)
      })
    setVolunteers(objArrAux)
  }

  const saveVolunteer = () => {

    if (!fromEdit) {
      
      fetch(url_volunteer, httpPOST)
      .then((response) => response.json())
      .then(() => {
        getVolunteer()
        setVolunteer(initialFormState)
      })
    } else {
      fetch(`http://localhost:5000/volunteer/${id}`, httpPUT)
      .then((response) => response.json())
      .then(() => {
        getVolunteer()
        setVolunteer(initialFormState)
      })
    }

    
    setFromEdit(false)
  }

  //Data-grid columns definition
  const columns: ColDef[] = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'email', headerName: 'email', width: 350 },
    { field: 'phone', headerName: 'phone', width: 200 },
    {
      field: "",
      headerName: "Actions",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params: CellParams) => {
        const onEdit = () => {
          const api: GridApi = params.api;
            const fields = api
              .getAllColumns()
              .map((c) => c.field)
              .filter((c) => c !== "__check__" && c !== "id" && !!c );
            
            const thisRow: any = {};  
    
            fields.forEach((f) => {
              thisRow[f] = params.getValue(f);
            });

            setFromEdit(true)
            setId(params.row.id)
            setVolunteer(thisRow)
            /* return alert(JSON.stringify(thisRow, null, 4)); */
        }
        const onDelete = () => {
          fetch(`http://localhost:5000/volunteer/${params.row.id}`, httpDEL)
            .then((response) => response.json())
            .then(() => {
              getVolunteer()
            })
        }
        return (
          <div>
            <IconButton color="primary" component="span" onClick={onEdit}>
              <Edit />
            </IconButton>
            <IconButton color="primary" component="span" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      }
    }
  ]

  useEffect(() => {
    getVolunteer()
  }, [])


  return (
    <div className='main-volunteer'>
      <div className='add-volunteer'>
        <h4>Volunteer</h4>
        <div className="panel-stats-volunteer">
          <span className='title-panel-stats'>Volunteer Form</span>
          
            <TextField id="name-field" label="Name" className='volunteer-field' name="name" value={volunteer.name} onChange={handleInputChange} />
            <TextField id="email-field" label="Email" className='volunteer-field' name="email" value={volunteer.email} onChange={handleInputChange} />
            <TextField id="phone-field" label="Phone" className='volunteer-field' name="phone" value={volunteer.phone} onChange={handleInputChange} />
            <Button variant="contained" color="primary" type="submit" onClick={saveVolunteer}>
              Save
            </Button>
      

        </div>
      </div>

      <div className='volunteer-list'>
        <span className='title-panel-stats'>Volunteer List</span>
        <DataGrid rows={volunteers} columns={columns} pageSize={10} className='datatable' />
      </div>


    </div>
  );
}

export default Volunteer;