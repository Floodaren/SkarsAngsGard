import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import axios from 'axios';
import { Router } from "@angular/router";
import { CookieService } from 'angular2-cookie/core';
import { LoggedInOrNotService } from '../logged-in-or-not.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  inputEmail;
  inputPassword;
  loggedInOrNot:any;
  navBarLoggedIn = false;
  constructor(private _cookieService:CookieService, private testService:LoggedInOrNotService, private router: Router) { }

  async signIn()
  {
    var encryptedPassword = CryptoJS.SHA256(this.inputPassword).toString(CryptoJS.enc.Hex);
    console.log(encryptedMail);
    var encryptedMail = CryptoJS.SHA256(this.inputEmail).toString(CryptoJS.enc.Hex);
    console.log(encryptedPassword);
    await axios.post('http://localhost:3030/SignIn', {
      email: encryptedMail,
      password: encryptedPassword 
    })
    .then(result => {
      this.loggedInOrNot = result.data.result;
      console.log(result.data.result);
      this._cookieService.put('LoggedInOrNot', this.loggedInOrNot);
    })
    .catch(function (error) {
      console.log(error);
      alert("Kunde inte kontakta servern");
    });
    this.inputEmail = "";
    this.inputPassword = "";
    await this.checkLogin();
    this.router.navigate(['/']);
  }

  async signOut()
  {
    await this._cookieService.remove('LoggedInOrNot');
    await this.checkLogin();
    this.router.navigate(['/']);
  }
  
  async checkLogin()
  {
    if (this.testService.checkLoginStatus() == true)
    {
      this.navBarLoggedIn = true;
    }
    else 
    {
      this.navBarLoggedIn = false;
    }
  }
  ngOnInit() {
    this.checkLogin();
  }
}
