import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/components/pagination';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  selector: 'app-browsing-list',
  templateUrl: 'browsing-list.component.html',
  styleUrls: ['browsing-list.component.css'],
  directives: [PAGINATION_DIRECTIVES],
})
export class BrowsingListComponent implements OnInit {
  totalItems:number;
  currentPage:number = 1;
  pageSize:number = 10;
  errorMessage:string;

  @Output('selectedAccount') selectedChanged = new EventEmitter<Account>();

  accounts: Account[];
  currentPageStream= new Subject<number>();
  constructor(private accountService: AccountService) {
    this.currentPageStream
                        .debounceTime(300)
                        .distinctUntilChanged()
                        .switchMap(currentPage => this.accountService.getAccounts(this.pageSize,currentPage-1))
                        .subscribe(
                          (result) => {
                            this.totalItems = result.total;
                            this.accounts = result.records;
                          },
                          error => this.errorMessage = <any>error
                        );

  }

  ngOnInit() {
    //this.getAccounts(this.pageSize, this.currentPage);
    this.currentPageStream.next(1);
  }

  pageChanged(event:any):void {
    this.currentPageStream.next(event.page);
  }

  editAccount(account){
    this.selectedChanged.emit(account);
  }

}
