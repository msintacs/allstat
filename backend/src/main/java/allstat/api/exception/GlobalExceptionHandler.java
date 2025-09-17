package allstat.api.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AllStatException.class)
    public ResponseEntity<ErrorResponse> handleAllStatException(AllStatException e) {
        log.error("AllStatException occurred: {}", e.getMessage());

        ErrorResponse response = ErrorResponse.builder()
                .statusCode(e.getStatusCode())
                .message(e.getMessage())
                .build();

        return new ResponseEntity<>(response, org.springframework.http.HttpStatus.valueOf(e.getStatusCode()));
    }

}
