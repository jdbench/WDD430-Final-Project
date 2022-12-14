import { Component, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() isLoggedIn: boolean = false;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  dropdownItems = [
    {linkId: "profileLink", linkName: 'Profile', linkUrl: 'profile'},
  ];
  
  constructor(private tokenStorage: TokenStorageService) {  }

  toggleMenu() {
    this.trigger.openMenu();
  }

  logout() {
    this.tokenStorage.signOut();
  }
}
