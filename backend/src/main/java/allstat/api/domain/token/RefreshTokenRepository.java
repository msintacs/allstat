package allstat.api.domain.token;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class RefreshTokenRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private static final String REFRESH_TOKEN_KEY_PREFIX = "refreshToken:";

    public void save(String email, String refreshToken, long timeoutSeconds) {
        String key = REFRESH_TOKEN_KEY_PREFIX + email;
        redisTemplate.opsForValue().set(key, refreshToken, timeoutSeconds, TimeUnit.SECONDS);
    }

    public Optional<String> findByEmail(String email) {
        String key = REFRESH_TOKEN_KEY_PREFIX + email;
        String refreshToken = (String) redisTemplate.opsForValue().get(key);
        return Optional.ofNullable(refreshToken);
    }
}
