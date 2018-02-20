import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class LoggedInOrNotService {
  loggedInOrNot:boolean = false;
  constructor(private _cookieService:CookieService) { }

  checkLoginStatus()
  {   
    if (this._cookieService.get('LoggedInOrNot') == "206772e4270ed3b42adf6b3d655b42a7e26ee3ee362cf08ee7390d8e7de5d243")
    {
      this.loggedInOrNot = true;
    }
    else if (this._cookieService.get('LoggedInOrNot') == "d67aa955e6e4de8d8806e8e05ddf37fdbf7d31580ad970a48d65d950b71736c2")
    {
      this.loggedInOrNot = false;
    }
    else 
    {
      this.loggedInOrNot = false;
    }
    return this.loggedInOrNot;
  }
}
