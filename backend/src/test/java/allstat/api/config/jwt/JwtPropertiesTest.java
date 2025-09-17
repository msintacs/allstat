package allstat.api.config.jwt;

import static org.assertj.core.api.Assertions.assertThat;

import allstat.api.jwt.JwtProperties;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Slf4j
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class JwtPropertiesTest {

    @Autowired
    private JwtProperties props;

    @Test
    @DisplayName("환경 변수에 등록된 JWT secret key 값을 제대로 읽어온다.")
    void jwtSecretKeyLoadTest() {
        // given
        // (환경변수 JWT_SECRET 이 설정돼 있음)

        // when
        String secret = props.getSecret();

        // then
        assertThat(secret).isNotNull();
        assertThat(secret).isNotBlank();
        assertThat(secret.length()).isEqualTo(128);
        assertThat(props.getAccessTokenExpireSeconds()).isEqualTo(3600);
        assertThat(props.getRefreshTokenExpireSeconds()).isEqualTo(86400);

        log.info("JWT secret loaded, len=[{}]", secret.length());
        log.info("Access-token-expire=[{}], refresh-token-expire=[{}]", props.getAccessTokenExpireSeconds(), props.getRefreshTokenExpireSeconds());
    }
}
