/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { CnDatePipe } from './cn-date.pipe';

describe('Pipe: CnDate', () => {
  it('create an instance', () => {
    let pipe = new CnDatePipe();
    expect(pipe).toBeTruthy();
  });
});
