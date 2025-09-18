package allstat.api.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Slf4j
@Component
public class JwtTokenProvider {

    private final Key key;
    private final long accessTokenExpireSeconds;
    private final long refreshTokenExpireSeconds;

    public JwtTokenProvider(JwtProperties jwtProperties) {
        byte[] keyBytes = jwtProperties.getSecret().getBytes();
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenExpireSeconds = jwtProperties.getAccessTokenExpireSeconds();
        this.refreshTokenExpireSeconds = jwtProperties.getRefreshTokenExpireSeconds();
    }

    /**
     * Access Token 생성 메소드
     * @param   authentication  사용자의 인증 정보
     *
     * @return                  생성된 Access Token 문자열
     */
    public String createAccessToken(Authentication authentication) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + this.accessTokenExpireSeconds * 1000);

        return Jwts.builder()
                .setSubject(authentication.getName())           // payload 에 사용자 이름(ID) 추가
                .setIssuedAt(now)                               // 발급 시간
                .setExpiration(validity)                        // 만료 시간
                .signWith(key, SignatureAlgorithm.HS256)        // 비밀 키로 HS256 알고리즘 서명
                .compact();                                     // 토큰 생성
    }

    public String createAccessToken(String email) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + this.accessTokenExpireSeconds * 1000);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Refresh Token 생성 메소드
     *
     * @return                  생성된 Refresh Token 문자열
     */
    public String createRefreshToken() {
        Date now = new Date();
        Date validity = new Date(now.getTime() + this.refreshTokenExpireSeconds * 1000);

        return Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 토큰을 분석해서 내용물(Claims)을 꺼내는 메소드
     * @param   token           분석할 토큰 문자열
     *
     * @return                  토큰의 페이로드(Claims)
     */
    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)                     // 서명을 검증할 비밀 키 설정
                .build()
                .parseClaimsJwt(token)                  // 토큰 파싱 및 서명 검증
                .getBody();                             // 페이로드(Claims) 반환
    }

    /**
     * 토큰이 유효한지 검증하는 메소드
     * @param   token           검증할 토큰 문자열
     *
     * @return                  유효하면 true, 아니면 false
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJwt(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.warn("잘못된 JWT 서명입니다: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.warn("만료된 JWT 토큰입니다: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.warn("지원되지 않는 JWT 토큰입니다: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.warn("JWT 토큰이 잘못되었습니다: {}", e.getMessage());
        }

        return false;
    }
}
