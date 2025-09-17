package allstat.api.exception;

import lombok.Getter;

@Getter
public class AllStatException extends RuntimeException {

    private final int statusCode;

    public AllStatException(String message) {
        super(message);
        this.statusCode = 400;
    }

    public AllStatException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
