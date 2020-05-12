package io.voidwave.graphql.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import io.voidwave.graphql.model.User;
import io.voidwave.graphql.sevice.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UserQueryResolver implements GraphQLQueryResolver {

    private final UserService userService;

    public UserQueryResolver(final UserService userService) {
        this.userService = userService;
    }

    public ArrayList<User> allUsers() {
        return userService.allUsers();
    }

    public Optional<User> user(int id) {
        return userService.user(id);
    }
}
