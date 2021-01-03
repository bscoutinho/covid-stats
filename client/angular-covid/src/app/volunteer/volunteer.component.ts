import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

interface IVolunteer {
  id: string
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})



export class VolunteerComponent implements OnInit {

  id: string
  name: string
  email: string
  phone: string
  volunteers: IVolunteer[] = []
  isLoading: boolean = false
  fromEdit: boolean = false


  constructor(private globalService: GlobalService) { }

  ngOnInit(): void {
    this.fetchVolunteerList()
  }

  fetchVolunteerList() {
    this.isLoading = true

    const volunteerData = this.globalService.getVolunteer()
    volunteerData.subscribe((res: any) => {

      const objArrAux: IVolunteer[] = []

      res.map((el) => {
        objArrAux.push(
          {
            id: el._id,
            name: el.name,
            email: el.email,
            phone: el.phone,
          }
        )
      })

      this.volunteers = objArrAux
    })

    this.isLoading = false
  }

  onEdit(id, name, email, phone) {
    this.id = id
    this.name = name
    this.email = email
    this.phone = phone
    this.fromEdit = true
  }

  onDelete(id) {
    this.globalService.deleteVolunteer(id)
      .subscribe((res) => {
        this.fetchVolunteerList()
      }, err => {
       console.log('post volunteer', err)
      });
  }

  saveVolunteer() {
    const body = {
      name: this.name, 
      email: this.email,
      phone: this.phone
    }


      if (!this.fromEdit) {
        this.globalService.postVolunteer(body)
        .subscribe((res) => {
          this.fetchVolunteerList()
          this.cleanFields()
        }, err => {
         console.log('post volunteer', err)
        });

      } else {
        this.globalService.putVolunteer(this.id, body)
        .subscribe((res) => {
          this.fetchVolunteerList()
          this.cleanFields()
        }, err => {
         console.log('post volunteer', err)
        });
      }

  }

  cleanFields() {
    this.name = ''
    this.email = ''
    this.phone = ''
  }

}
