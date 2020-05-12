package io.voidwave.graphql.sevice;

import io.voidwave.graphql.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private ArrayList<User> list = new ArrayList<>();

    public ArrayList<User> allUsers() {
        return list;
    }

    public Optional<User> user(int id) {
        return list
                .stream()
                .filter(user -> user.getId() == id)
                .findFirst();
    }

    public ArrayList<User> init() {
        list.add(new User(0, "James", 23, "London"));
        list.add(new User(1, "Jane", 24, "New York"));
        list.add(new User(2, "Dominik", 21, "Madrid"));
        list.add(new User(3, "Jonas", 22, "Hamburg"));
        return list;
    }

    public User addUser(int id, String name, int age, String city) {
        var newUser = new User(id, name, age, city);
        list.add(newUser);
        return newUser;
    }

    public Optional<User> removeUser(int id) {
        var deletedUser = list
                .stream()
                .filter(user -> user.getId() == id)
                .findFirst();
        list.removeIf(user -> user.getId() == id);
        return deletedUser;
    }
}
