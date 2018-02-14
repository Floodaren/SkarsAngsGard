import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VagArbeteComponent } from './vag-arbete/vag-arbete.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { LoggedInOrNotService } from './logged-in-or-not.service';
import { ProfileComponent } from './profile/profile.component';
import { HomecontentComponent } from './homecontent/homecontent.component';
import { SaleSectionComponent } from './sale-section/sale-section.component';

import { ChangeAddComponent } from './change-add/change-add.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    VagArbeteComponent,
    ProfileComponent,
    HomecontentComponent,
    SaleSectionComponent,
    ChangeAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'vagArbete',
        component: VagArbeteComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        component: HomecontentComponent
      },
      {
        path: 'sales',
        component: SaleSectionComponent
      }
    ])
  ],
  providers: [CookieService,LoggedInOrNotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
