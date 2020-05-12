import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

export interface User {
  id: number
  name: string
  age: number
  city: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  listOfUsers: User[] = [
    {id: 1, name: 'Josh', age: 34, city: 'Seattle'},
    {id: 2, name: 'Melinda', age: 45, city: 'New York'},
    {id: 3, name: 'Yoko', age: 28, city: 'Tokyo'},
    {id: 4, name: 'Jonas', age: 22, city: 'Hamburg'},
    {id: 5, name: 'Tom', age: 56, city: 'London'},
  ]

  getUsers(): Observable<User[]> {
    return of(this.listOfUsers)
  }

  getUserById(id: number): Observable<User> {
    const user = this.listOfUsers.find(user => user.id === id)
    return of(user)
  }
  
  deleteUserById(id: number): Observable<User[]> {
    this.listOfUsers = this.listOfUsers.filter(user => user.id !== id)
    return of(this.listOfUsers)
  }

  addUser(user: User): Observable<User[]> {
    this.listOfUsers = [ ...this.listOfUsers, {...user, id: this.generateId()}]
    return of(this.listOfUsers)
  }

  generateId(): number {
    let highestId = 0
    this.listOfUsers.forEach(user => {
      if(user.id > highestId){
        highestId = user.id
      }
    })
    return highestId + 1
  }
}
