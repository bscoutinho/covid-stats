import { VolunteerComponent } from './volunteer/volunteer.component';
import { StatsComponent } from './overview/stats/stats.component';
import { OverviewComponent } from './overview/overview.component';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import 'jasmine';
import { GlobalService } from './global.service';

describe('GlobalService', () => {
  let service: GlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule], 
        providers: [GlobalService],
        declarations: [OverviewComponent, StatsComponent, VolunteerComponent],
    });
    service = TestBed.inject(GlobalService);
  });

  it('should be created', () => { 
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    expect(service.getData).toBeTruthy();
   });
})