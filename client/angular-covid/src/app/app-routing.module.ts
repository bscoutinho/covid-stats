import { OverviewComponent } from './overview/overview.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: OverviewComponent},
  {path: 'volunteer', component: VolunteerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
