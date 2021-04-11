import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4001/api/users/users';

  getAll() {
    console.log('getAll');
    return this.http.get<User[]>(this.uri);
  }
}
