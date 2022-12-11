import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedIn;

  dropdownItems = true ? [
    {linkId: "loginLink", linkName: 'Login', linkUrl: '/login'},
    {linkId: "registerLink", linkName: 'Register', linkUrl: '/register'},
  ]:[
    {linkId: "logoutLink", linkName: 'Logout', linkUrl: '/logout'},
  ];
  
  constructor() {
    this.loggedIn = false;
  }
  
  dropdown():void {

  }
}
