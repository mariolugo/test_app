import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.css']
})
export class AuthCardComponent implements OnInit {
  value = 'login';
  constructor() { }

  ngOnInit() {
  }

}
