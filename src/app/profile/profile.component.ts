import { Component, OnInit } from '@angular/core';
import { LoggedInOrNotService } from '../logged-in-or-not.service';
import { Router } from "@angular/router";
import axios from 'axios';
import { ViewChild } from '@angular/core/src/metadata/di';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  newEmail:any;
  newPassword:any;
  updateText:any;

  constructor(private loggedInService:LoggedInOrNotService, private router: Router) { }

  changeEmail()
  {
    axios.post('http://localhost:3030/ChangeEmail', {
      newEmail: this.newEmail
    })
    .then(result => {
      console.log(result);
      alert(result.data.result);
    })
    .catch(function (error) {
      console.log(error);
      alert("Kunde inte kontakta servern");
    });
    this.newEmail = "";
    
  }

  changePassword()
  {
    axios.post('http://localhost:3030/ChangePassword', {
      newPassword: this.newPassword
    })
    .then(result => {
      console.log(result);
      alert(result.data.result);
    })
    .catch(function (error) {
      console.log(error);
      alert("Kunde inte kontakta servern");
    });
    this.newPassword = "";
  }

  ngOnInit() 
  {
    if (this.loggedInService.checkLoginStatus() != true)
    {
      this.router.navigate(['/']);
    }
  }

}
