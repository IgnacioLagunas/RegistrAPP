import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notLogedGuard } from './not-loged-guard.guard';

describe('notLogedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notLogedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
