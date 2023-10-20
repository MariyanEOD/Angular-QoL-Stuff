import { HttpInterceptorFn, HttpHandlerFn } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { inject } from "@angular/core";
const TOKEN_HEADER_KEY = "Authorization";
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  let authReq = req;

  const token = localStorage.getItem(<LOCAL_STORAGE_AUTH_KEY>);

  if (token !== null) {
    authReq = req.clone({
      headers: req.headers.set(TOKEN_HEADER_KEY, "Bearer " + token),
    });
  }
  return next(authReq);
};
