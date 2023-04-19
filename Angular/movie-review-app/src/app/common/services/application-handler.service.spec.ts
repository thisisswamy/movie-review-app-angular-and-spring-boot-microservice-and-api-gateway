import { TestBed } from '@angular/core/testing';

import { ApplicationHandlerService } from './application-handler.service';

describe('ApplicationHandlerService', () => {
  let service: ApplicationHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
