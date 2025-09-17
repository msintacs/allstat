package allstat.api.auth;

import allstat.api.auth.dto.SignupRequestDto;
import allstat.api.domain.user.User;
import allstat.api.domain.user.UserRepository;
import allstat.api.exception.DuplicateEmailException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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
}
