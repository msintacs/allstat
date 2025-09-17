package allstat.api.domain.user;

import lombok.Builder;
import lombok.Getter;

@Getter
public class User {

    private String email;
    private String password;
    private String nickname;

    @Builder
    public User(String email, String password, String nickname) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }
}
