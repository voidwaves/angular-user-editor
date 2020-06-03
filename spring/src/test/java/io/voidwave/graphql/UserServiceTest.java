package io.voidwave.graphql;

import io.voidwave.graphql.database.UserRepository;
import io.voidwave.graphql.model.User;
import io.voidwave.graphql.sevice.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.invocation.InvocationOnMock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import javax.servlet.annotation.WebServlet;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserServiceTest {

    @MockBean
    UserRepository userRepository;

    @Autowired
    UserService userService;

    private User user1 = new User("Joe", 23, "Huston");
    private User user2 = new User("John", 34, "New York");
    private User user3 = new User("Marry", 56, "Los Angeles");
    private ArrayList<User> fakeUserList = Stream
            .of(user1, user2, user3)
            .collect(Collectors.toCollection(ArrayList::new));

    @Test
    public void testAllUsers() {
        when(userRepository.findAll()).thenReturn(fakeUserList);
        assertEquals(fakeUserList, userService.allUsers());
    }

    @Test
    public void testUser() {
        var id = 42;
        when(userRepository.findById(id)).thenReturn(Optional.of(user1));
        assertEquals(Optional.of(user1), userService.user(id));
    }

    @Test
    public void testRemoveUser() {
        when(userRepository.findAll()).thenReturn(fakeUserList);
        assertEquals(fakeUserList, userService.allUsers());

        var id = 42;
        var newFakeUserList = fakeUserList
                .stream()
                .filter(user -> user != user1)
                .collect(Collectors.toCollection(ArrayList::new));

        doAnswer(arg -> {
            when(userRepository.findAll()).thenReturn(newFakeUserList);
            return null;
        }).when(userRepository).deleteById(id);

        userService.removeUser(id);
        assertEquals(newFakeUserList, userService.allUsers());
    }

    @Test
    public void testAddUser() {
        when(userRepository.save(user1)).thenReturn(user1);
        assertEquals(user1, userService.addUser(user1));
    }

    @Test
    public void testEditUser() {
        when(userRepository.findById(user1.getId())).thenReturn(Optional.of(user1));
        when(userRepository.save(user1)).thenReturn(user1);
        assertEquals(user1, userService.editUser(user1));
    }
}
