package com.example.adminlogin.repository;



import com.example.adminlogin.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findBySemester(String semester);
    User findByEmailAndPassword(String email,String password);
    List<User> findByRole(String role);
    List<User> findByRoleAndSemester(String role, String semester);
    Optional<User> findByUserName(String userName);

}

