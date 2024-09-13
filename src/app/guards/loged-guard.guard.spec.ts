import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logedGuardGuard } from './loged-guard.guard';

describe('logedGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logedGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
