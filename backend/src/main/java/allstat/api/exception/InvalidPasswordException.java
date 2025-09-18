package allstat.api.exception;

public class InvalidPasswordException extends AllStatException {

    private static final String MESSAGE = "비밀번호가 일치하지 않습니다.";

    public InvalidPasswordException() {
        super(MESSAGE, 401);
    }
}
