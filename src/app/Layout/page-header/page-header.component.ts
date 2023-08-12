import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})

  
export class PageHeaderComponent {
  @Output() menuClicked = new EventEmitter<boolean>();
  constructor(public api: AuthenticationService,private router: Router) {}
  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
