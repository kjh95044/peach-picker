package com.peach.backend.global.security.exception.error;

import com.peach.backend.global.error.exception.ErrorProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
@RequiredArgsConstructor
public enum JwtErrorProperty implements ErrorProperty {

    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),
    ;

    private final HttpStatus status;
    private final String message;
}