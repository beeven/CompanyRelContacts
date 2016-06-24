import { Component, OnInit, Input } from '@angular/core';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/components/pagination';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  moduleId: module.id,
  selector: 'app-query-list',
  templateUrl: 'query-list.component.html',
  styleUrls: ['query-list.component.css'],
  directives: [PAGINATION_DIRECTIVES],
})
export class QueryListComponent implements OnInit {

  @Input() criteria: string;

  currentPage: number = 1;
  pageSize: number = 10;
  errorMessage: string;

  pageStartIndex: number = 0;
  pageEndIndex: number = this.pageSize;

  totalItems: number;
  private queryTermStream = new Subject<string>();
  accounts: Account[];



  query(term: string) {
      this.queryTermStream.next(term);
  }



  constructor(private accountService: AccountService) {
      this.queryTermStream
        .debounceTime(300)
        .distinctUntilChanged()
        .filter( x => x.length >= 2)
        .switchMap((term: string) => this.accountService.query(term))
        .subscribe((x)=>{
                this.totalItems = x.length;
                this.accounts = x;
        });
  }

  ngOnInit() {
  }

  pageChanged(event: any) {
    this.pageStartIndex = (event.page - 1) * this.pageSize;
    this.pageEndIndex = this.pageStartIndex + this.pageSize;
  }

  /*
  public query() {
    if (this.criteria.length < 2) {
      this.errorMessage = "查询关键字长度必须大于2";
      return;
    }
    this.accounts = this.accountService.query(this.criteria)
      .subscribe(
      (accounts) => { this.totalItems = accounts.length; },
      (error) => this.errorMessage = <any>error
      );
  }*/

  deleteAccount(account) {
    this.accountService.deleteAccount(account.userId)
      .subscribe(
      (arg) => {
        var index = this.accounts.indexOf(account);
        if (index != -1) {
          this.accounts.splice(index, 1);
        }
      },
      (error) => { this.errorMessage = <any>error; console.error("catched error in list:", error) }
      )
  }

  editAccount(account) {

  }
}
