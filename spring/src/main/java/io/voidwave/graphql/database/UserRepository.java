package io.voidwave.graphql.database;

import io.voidwave.graphql.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

}
