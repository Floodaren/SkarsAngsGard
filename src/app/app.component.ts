import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VagArbeteComponent } from './vag-arbete/vag-arbete.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Skårs Ängsgård';
}
