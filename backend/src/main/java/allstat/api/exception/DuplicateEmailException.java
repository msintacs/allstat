package allstat.api.exception;

public class DuplicateEmailException extends AllStatException {

    private static final String MESSAGE = "이미 가입된 이메일입니다.";

    public DuplicateEmailException() {
        super(MESSAGE, 409);
    }
}
