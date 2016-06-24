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
  constructor() {
  }
  ngOnInit() {

  }

  openCreateWindow() {
    this.creatingAccount = !this.creatingAccount
  }


}
