import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { OverviewComponent } from './overview/overview.component';
import { StatsComponent } from './overview/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    VolunteerComponent,
    OverviewComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
