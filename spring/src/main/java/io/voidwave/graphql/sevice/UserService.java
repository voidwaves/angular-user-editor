package io.voidwave.graphql.sevice;

import io.voidwave.graphql.database.UserRepository;
import io.voidwave.graphql.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserService(){}

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ArrayList<User> allUsers() {
        var allUsers = userRepository.findAll();
        return StreamSupport
            .stream(allUsers.spliterator(), false)
            .collect(Collectors.toCollection(ArrayList::new));
    }

    public Optional<User> user(int id) {
        return userRepository.findById(id);
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> removeUser(int id) {
        var deletedUser = userRepository.findById(id);
        userRepository.deleteById(id);
        return deletedUser;
    }

    public User editUser(User user) {
        var editedUser = userRepository.findById(user.getId());
        if(editedUser.isPresent()) {
            editedUser.get().setName(user.getName());
            editedUser.get().setAge(user.getAge());
            editedUser.get().setCity(user.getCity());
        }
        return userRepository.save(editedUser.get());
    }
}
