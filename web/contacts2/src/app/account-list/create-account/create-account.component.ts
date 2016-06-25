import { Component, OnInit, Input } from '@angular/core';
import { AlertComponent } from 'ng2-bootstrap/components/alert';
import { AccountService } from '../account.service';
import { CnDatePipe } from '../cn-date.pipe';
import { Account } from '../account';

class CreateResult {
  TRADE_CO: string;
  FULL_NAME: string;
  COP_GB_CODE: string;
  SOCIAL_CREDIT_CODE: string;
  CONTAC_CO: string;
  CONTACT_MOBILE:string;
  LAW_MAN:string;
  LAW_MAN_MOBILE:string;
}

@Component({
  moduleId: module.id,
  selector: 'app-create-account',
  templateUrl: 'create-account.component.html',
  styleUrls: ['create-account.component.css'],
  directives: [AlertComponent],
  pipes: [CnDatePipe]
})
export class CreateAccountComponent implements OnInit {

  private  _selectedAccount:Account = new Account();
  @Input()
  set selectedAccount(selectedAccount: Account){
    if(typeof(selectedAccount) === 'undefined' || selectedAccount == null) {
      this._selectedAccount = new Account();
      return;
    }
    this._selectedAccount = selectedAccount;
  }
  get selectedAccount(){
    return this._selectedAccount;
  }
  // private companyId:string;
  // private contactMobile: string;
  // private lawManMobile: string;

  private message:string;

  creating = false;
  alerts: Array<Object> = [];
  constructor(private accountService:AccountService) {}

  closeAlert(i:number) {
    this.alerts.splice(i,1);
  }

  ngOnInit() {}

  setMobile(){
    if(typeof(this._selectedAccount) === 'undefined' || this._selectedAccount == null) {
      return;
    }
    if(!/\w{10}/.test(this._selectedAccount.TRADE_CO)) {
      return this.alerts.push({type:"danger", message:"企业编码不符合规则"});
    }
    this.creating = true;
    this.accountService.setMobile(this._selectedAccount.TRADE_CO,this._selectedAccount.CONTACT_MOBILE, this._selectedAccount.LAW_MAN_MOBILE)
        .subscribe(
          (account) => {
            this.creating = false;
            this._selectedAccount = <Account>account;
            this.alerts.push({type:"success", message:"更新成功"});
          },
          error => {this.alerts.push({type:"danger", message:<any>error});this.creating=false;}
        )
  }

  print() {
    window.print();
  }
}
