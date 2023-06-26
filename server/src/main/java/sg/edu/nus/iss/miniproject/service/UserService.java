package sg.edu.nus.iss.miniproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sg.edu.nus.iss.miniproject.model.User;
import sg.edu.nus.iss.miniproject.repository.UserRepo;

@Service
public class UserService {
    
    @Autowired
    private UserRepo userRepository;

    @Transactional
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
