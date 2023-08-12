import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { credentials } from '../models/credentials.model';
import { user } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { authenticatedUser } from '../models/authenticated-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient,private jwt: JwtHelperService) { 

  }
  apiurl='http://localhost:59311/api/Users';
  loginApiUrl= 'http://localhost:59311/api/Login/Authenticate';

  loginUser(inputdata:credentials){
    return this.http.post(this.loginApiUrl,inputdata)
  }

  RegisterUser(inputdata:user){
    return this.http.post(this.apiurl,inputdata)
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getTokenUserInfo(): authenticatedUser | null {
    if (!this.isLoggedIn()) return null;
    let token = this.jwt.decodeToken();
    let user: authenticatedUser = {
      id: token.nameid,
      userName: token.unique_name,
      role: token.role,
      IsActive: token.given_name === 'Y' ? true: false
    };
    return user;
  }
}
