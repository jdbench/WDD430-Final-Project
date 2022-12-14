import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private tokenKey: any;
  private userKey: any;
  constructor() { 
    this.tokenKey = null;
    this.userKey = null;
  }

  signOut(): void {
    try{
      sessionStorage.clear();
      this.tokenKey = null;
      this.userKey = null;
      window.location.assign("/");
    } catch(err: any){
      throw new Error(err);
    }
  }

  public saveToken(token: string): void {
    this.tokenKey = token;
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, this.tokenKey);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    this.userKey = JSON.stringify(user);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, this.userKey);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}