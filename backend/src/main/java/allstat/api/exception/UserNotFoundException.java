package allstat.api.exception;

public class UserNotFoundException extends AllStatException {

    private static final String MESSAGE = "존재하지 않는 이메일입니다.";

    public UserNotFoundException() {
        super(MESSAGE, 401);
    }
}
