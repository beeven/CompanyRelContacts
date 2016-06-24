import { Component, OnInit } from '@angular/core';
import { AlertComponent } from 'ng2-bootstrap/components/alert';
import { AccountService } from '../account.service';
import { CnDatePipe } from '../cn-date.pipe';

class CreateResult {
  companyName: string;
  password: string;
  expire: string;
  userId: string;
  companyId: string;
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

  private companyId:string;
  private message:string;
  private createResult:CreateResult = {
    companyName: "",
    password: "",
    expire: "",
    userId: "",
    companyId: ""
  };

  creating = false;


  alerts: Array<Object> = [];

  constructor(private accountService:AccountService) {
  }

  closeAlert(i:number) {
    this.alerts.splice(i,1);
  }

  ngOnInit() {
  }

  createAccount() {
    if(!/\w{10}/.test(this.companyId)) {
      return this.alerts.push({type:"danger", message:"企业编码不符合规则"});
    }
    this.creating = true;
    this.accountService.createTemporaryAccount(this.companyId)
                       .subscribe(
                         (account) => {
                           this.creating=false;
                           this.createResult = <CreateResult>account;
                         },
                         error => {this.alerts.push({type:"danger", message:<any>error});this.creating=false;}
                       );
  }

  print() {
    window.print();
  }
}
