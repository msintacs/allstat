package allstat.api.auth;

import allstat.api.auth.dto.LoginRequestDto;
import allstat.api.auth.dto.SignupRequestDto;
import allstat.api.domain.user.User;
import allstat.api.domain.user.UserRepository;
import allstat.api.exception.DuplicateEmailException;
import allstat.api.exception.InvalidPasswordException;
import allstat.api.exception.UserNotFoundException;
import allstat.api.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public void signup(SignupRequestDto signupRequestDto) {

        // 1. 이메일 중복 확인
        if (userRepository.findByEmail(signupRequestDto.getEmail()).isPresent()) {
            throw new DuplicateEmailException();
        }

        // 2. DTO를 User 엔티리로 변환 (패스워드 암호화)
        User user = signupRequestDto.toEntity(passwordEncoder);

        // 3. MySQL에 사용자 정보 저장
        userRepository.save(user);
    }

    public String login(LoginRequestDto loginRequestDto) {

        String email = loginRequestDto.getEmail();
        String password = loginRequestDto.getPassword();

        // 1. 이메일 확인
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFoundException()
        );

        // 2. 비밀번호 확인
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidPasswordException();
        }

        // 3. JWT 생성 및 반환
        return jwtTokenProvider.createAccessToken(user.getEmail());
    }

}
