import { TestBed, inject } from '@angular/core/testing';

import { LoggedInOrNotService } from './logged-in-or-not.service';

describe('LoggedInOrNotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedInOrNotService]
    });
  });

  it('should be created', inject([LoggedInOrNotService], (service: LoggedInOrNotService) => {
    expect(service).toBeTruthy();
  }));
});
