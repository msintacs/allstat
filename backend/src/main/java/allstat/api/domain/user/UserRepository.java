package allstat.api.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // SELECT * FROM USERS WHERE email = ?
    Optional<User> findByEmail(String email);
}
