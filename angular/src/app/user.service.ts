import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';

export interface User {
  id?: number
  name: string
  age: number
  city: string
}

export interface AddUserResponse {
  addUser: User
}

export interface EditUserResponse {
  editUser: User
}

export interface RemoveUserResponse {
  removeUser: User
}

export interface AllUsersResponse {
  allUsers: User[]
}

export interface UserResponse {
  user: User
}

const queryAllUsers = gql`
  query allUsers {
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
  mutation addUser($user: InputUser) {
    addUser(user: $user) {
      id
      name
      age
      city
    }
  }
`

const editUserMutation = gql`
  mutation editUser($user: InputUser) {
    editUser(user: $user) {
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

  getUsers(): Observable<ApolloQueryResult<AllUsersResponse>> {
    return this.apollo.watchQuery<AllUsersResponse>({
      query: queryAllUsers
    })
    .valueChanges
  }

  getUserById(id: number): Observable<ApolloQueryResult<UserResponse>> {
    return this.apollo.watchQuery<UserResponse, {id: number}>({
      query: queryUserById,
      variables: {id}
    })
    .valueChanges
  }
  
  deleteUserById(id: number): Observable<FetchResult<RemoveUserResponse>> {
    return this.apollo.mutate<RemoveUserResponse, {id: number}>({
      mutation: removeUserMutation,
      variables: {id},
      refetchQueries: [{query: queryAllUsers}]
    })
  }

  addUser(user: User): Observable<FetchResult<AddUserResponse>> {
    return this.apollo.mutate<AddUserResponse, {user: User}>({
      mutation: addUserMutation,
      variables: {user},
      refetchQueries: [{query: queryAllUsers}]
    })
  }

  editUser(user: User): Observable<FetchResult<EditUserResponse>> {
    return this.apollo.mutate<EditUserResponse, {user: User}>({
      mutation: editUserMutation,
      variables: {user},
      refetchQueries: [{query: queryAllUsers}]
    })
  }
}
