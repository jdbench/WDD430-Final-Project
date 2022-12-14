import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isLoggedIn: boolean;
  isSignUpFailed = false;
  errorMessage = '';
  username: any;
  @Output() loginChange = new EventEmitter<any>()

  constructor(private authService: AuthService, private tokenService: TokenStorageService) { 
    this.isLoggedIn = !!this.tokenService.getToken() && this.tokenService.getToken() !== "undefined";
    this.username = this.tokenService.getUser().username;
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    const values = form.value;

    this.authService.register(values.username, values.email, values.password).subscribe({
      next: (res) => {
        this.username = this.tokenService.getUser().username;
        this.tokenService.saveToken(res.user.token);
        this.tokenService.saveUser(res.user);

        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.userLoggedIn(this.isLoggedIn);
        this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
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
