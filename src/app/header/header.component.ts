import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    window.localStorage.clear();
    // Send the user back to the dashboard after logout
    this.router.navigateByUrl('/login');
  }

}
