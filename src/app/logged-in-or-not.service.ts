import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class LoggedInOrNotService {
  loggedInOrNot:boolean = false;
  constructor(private _cookieService:CookieService) { }

  checkLoginStatus()
  {   
    if (this._cookieService.get('LoggedInOrNot') == "-696604331-421208435-20128130881574909949-1082314408182022308-1922705072-1223215422")
    {
      this.loggedInOrNot = true;
    }
    else if (this._cookieService.get('LoggedInOrNot') == "5436505326552831247192850531700479655-496049170908914830-4156913782112213571")
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
