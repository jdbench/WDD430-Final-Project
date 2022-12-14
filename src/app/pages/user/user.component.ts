import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: any;
  errorMessage = '';
  isLoggedOut: boolean;

  constructor(private token: TokenStorageService, private auth: AuthService) {
    this.currentUser = this.token.getUser();
    this.isLoggedOut = !!this.token.getToken() && this.token.getToken() !== "undefined";
   }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

  delete() {
    this.auth.delete(this.currentUser._id)
      .subscribe({
        next: () => {
          sessionStorage.clear();
          window.location.assign("/");
        },
        error: (err) => {
          this.errorMessage = err;
        }
      })
  }
}