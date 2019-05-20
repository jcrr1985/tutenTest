import { TestBed } from '@angular/core/testing';

import { FetchImgService } from './fetch-img.service';

describe('FetchImgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchImgService = TestBed.get(FetchImgService);
    expect(service).toBeTruthy();
  });
});
