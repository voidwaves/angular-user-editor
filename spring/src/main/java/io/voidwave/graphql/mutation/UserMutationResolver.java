package io.voidwave.graphql.mutation;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import io.voidwave.graphql.model.User;
import io.voidwave.graphql.sevice.UserService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserMutationResolver implements GraphQLMutationResolver {
    private final UserService userService;

    public UserMutationResolver(final UserService userService) {
        this.userService = userService;
    }

    public User addUser(String name, int age, String city) {
        return userService.addUser(name, age, city);
    }

    public Optional<User> removeUser(int id) {
        return userService.removeUser(id);
    }
}
