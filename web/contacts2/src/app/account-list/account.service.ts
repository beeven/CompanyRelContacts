import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Account } from './account';
import './rxjs-operators';

@Injectable()
export class AccountService {
  constructor(private http: Http) {}
  private accountsUrl = 'api/contacts';

  getAccounts(pageSize:number, currentPage:number): Observable<any> {
    return this.http.get(`${this.accountsUrl}/${pageSize}/${currentPage}`)
                    .map((res: Response)=>{
                      let body = res.json();
                      if(body.result != "ok") {
                        throw({status:200, statusText:body.error});
                      }
                      return {
                        total: body.data.total,
                        records: body.data.records
                      }
                    })
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    if(body.result != "ok") {
      throw({status:200,statusText:body.error});
    }
    return body.data || { };
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  query(criteria:string):Observable<Account[]> {
    return this.http.get(`${this.accountsUrl}/query/${criteria}`)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  setMobile(companyId:string, contactMobile:string, lawManMobile:string): Observable<Account> {
      let body = JSON.stringify({companyId, contactMobile, lawManMobile});
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers });
      return this.http.post(`${this.accountsUrl}/setMobile`, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }



}
