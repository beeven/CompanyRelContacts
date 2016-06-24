/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { AccountListComponent } from './account-list.component';
import { AccountService } from './account.service';

describe('Component: AccountList', () => {
  beforeEachProviders(()=>[AccountService])
  it('should create an instance', inject([AccountService],(accountService) => {
    let component = new AccountListComponent();
    expect(component).toBeTruthy();
  }));
});
