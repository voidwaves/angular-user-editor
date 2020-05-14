import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';

export interface User {
  id: number
  name: string
  age: number
  city: string
}

const queryAllUsers = gql`
  query {
    allUsers {
      id
      name
      age
      city
    }
  }
`

const queryUserById = gql`
  query user($id: Int) {
    user(id: $id) {
      id
      name
      age
      city
    }
  }
`

const removeUserMutation = gql`
  mutation removeUser($id: Int) {
    removeUser(id: $id) {
      id
      name
      age
      city
    }
  }
`

const addUserMutation = gql`
  mutation addUser($name: String, $age: Int, $city: String) {
    addUser(
      name: $name
      age: $age
      city: $city
    ) {
      id
      name
      age
      city
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo){}

  getUsers(): Observable<ApolloQueryResult<{allUsers: User[]}>> {
    return this.apollo.watchQuery<{allUsers: User[]}>({
      query: queryAllUsers
    })
    .valueChanges
  }

  getUserById(id: number): Observable<ApolloQueryResult<{user: User}>> {
    console.log(id)
    return this.apollo.watchQuery<{user: User}>({
      query: queryUserById,
      variables: {id}
    })
    .valueChanges
  }
  
  deleteUserById(id: number): Observable<FetchResult<User[]>> {
    return this.apollo.mutate<User[]>({
      mutation: removeUserMutation,
      variables: {id}
    })
  }

  addUser(name: string, age: number, city: string): Observable<FetchResult<User>> {
    return this.apollo.mutate<User>({
      mutation: addUserMutation,
      variables: {name, age, city}
    })
  }
}
