import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post("/user", {
      username,
      password
    }, httpOptions);
  };

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post("/user/new", {
      username,
      email,
      password
    }, httpOptions);
  };

  delete(_id: string): Observable<any> {
    return this.http.delete(`/user/delete/${_id}`);
  }
}