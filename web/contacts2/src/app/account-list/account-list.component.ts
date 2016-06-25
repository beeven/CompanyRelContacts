import { Component, OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { CollapseDirective } from 'ng2-bootstrap/components/collapse';
import { AccountService } from './account.service';
import { Account } from './account';
import { CreateAccountComponent } from './create-account';
import { BrowsingListComponent } from './browsing-list';
import { QueryListComponent } from './query-list';

@Component({
  moduleId: module.id,
  selector: 'app-account-list',
  templateUrl: 'account-list.component.html',
  styleUrls: ['account-list.component.css'],
  directives: [CollapseDirective, CreateAccountComponent, BrowsingListComponent, QueryListComponent],
  providers: [AccountService]
})
export class AccountListComponent implements OnInit {

  errorMessage: string;
  creatingAccount = false;
  criteria = '';
  selectedAccount:Account;
  constructor() {
  }
  ngOnInit() {

  }

  openCreateWindow() {
    this.selectedAccount = null;
    this.creatingAccount = !this.creatingAccount
  }

  selectedAccountChanged(event: any) {
    this.creatingAccount = true;
    this.selectedAccount = event;
  }

}
