import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notLogedGuardGuard } from './not-loged-guard.guard';

describe('notLogedGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notLogedGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
