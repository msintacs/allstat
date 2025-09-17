package allstat.api.domain.user;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private static final String USER_KEY_PREFIX = "user:";
    private static final String REFRESH_TOKEN_KEY_PREFIX = "refreshToken:";

    public void save(User user) {
        String key = USER_KEY_PREFIX + user.getEmail();
        redisTemplate.opsForValue().set(key, user);
    }

    // Refresh Token 저장을 위해 만료 시간 설정 기능 추가
    public void saveRefreshToken(String email, String refreshToken, long timeoutSeconds) {
        String key = REFRESH_TOKEN_KEY_PREFIX + email;
        redisTemplate.opsForValue().set(key, refreshToken, timeoutSeconds, TimeUnit.SECONDS);
    }

    public Optional<User> findByEmail(String email) {
        String key = USER_KEY_PREFIX + email;
        User user = (User) redisTemplate.opsForValue().get(key);
        return Optional.ofNullable(user);
    }

    public Optional<String> findRefreshTokenByEmail(String email) {
        String key = REFRESH_TOKEN_KEY_PREFIX + email;
        String refreshToken = (String) redisTemplate.opsForValue().get(key);
        return Optional.ofNullable(refreshToken);
    }
}
