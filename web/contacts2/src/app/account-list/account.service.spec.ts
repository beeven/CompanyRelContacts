/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { AccountService } from './account.service';

describe('Account Service', () => {
  beforeEachProviders(() => [AccountService]);

  it('should ...',
      inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});
