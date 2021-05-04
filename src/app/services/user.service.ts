import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  getAll() {
    console.log('user.service getAll');
    return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
  }
}
