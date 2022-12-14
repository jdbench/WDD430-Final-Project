import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: any;
  username: any;
  title = 'Calendarify';

  constructor(private tokenStorageService: TokenStorageService) {
    this.isLoggedIn = this.tokenStorageService.getToken(); 
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  userLoggedIn($event: any) {
    this.isLoggedIn = $event;
  }
}
