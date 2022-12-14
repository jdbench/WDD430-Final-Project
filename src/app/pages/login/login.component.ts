import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { User } from '../../models/user.model';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  username: any;
  @Output() loginChange = new EventEmitter<any>()

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { 
    this.username = this.tokenStorage.getUser().username;
  }

  ngOnInit(): void {
    if ( this.tokenStorage.getToken() && this.tokenStorage.getToken() !== "undefined") {
      this.isLoggedIn = true;
    }
  }

  onSubmit(form: NgForm): void {
    const values = form.value;

    this.authService.login(values.username, values.password).subscribe({
      next: (res) => {
        this.username = this.tokenStorage.getUser().username;
        this.tokenStorage.saveToken(res.user.token);
        this.tokenStorage.saveUser(res.user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.userLoggedIn(this.isLoggedIn);
        this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  userLoggedIn(value: boolean) {
    this.loginChange.emit(value);
  }
}