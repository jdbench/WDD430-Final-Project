import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() isLoggedIn: boolean = false;
  @Input() showAdminBoard: boolean = false;
  @Input() showModeratorBoard: boolean = false; 

  dropdownItems = [
    {linkId: "logoutLink", linkName: 'Logout', linkUrl: '/logout'},
  ];
  
  constructor() {  }
  
  dropdown():void {
    const dropdownMenu = document.getElementsByClassName("dropdown-menu")[0];
    dropdownMenu.classList.contains("open") ? 
    dropdownMenu.classList.remove("open")
    : dropdownMenu.classList.add("open");
  }
}
