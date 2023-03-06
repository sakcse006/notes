import { TestBed } from '@angular/core/testing';

import { CreateNotesService } from './create-notes.service';

describe('CreateNotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateNotesService = TestBed.get(CreateNotesService);
    expect(service).toBeTruthy();
  });
});
