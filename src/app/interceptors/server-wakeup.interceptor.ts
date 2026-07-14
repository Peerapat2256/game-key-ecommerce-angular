import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { Constants } from '../config/constants';
import { ServerLoadingService } from '../services/server-loading.service';

@Injectable()
export class ServerWakeupInterceptor implements HttpInterceptor {
  constructor(
    private constants: Constants,
    private serverLoading: ServerLoadingService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiCall = req.url.startsWith(this.constants.API_ENDPOINT);

    if (!isApiCall) {
      return next.handle(req);
    }

    this.serverLoading.onRequestStart();

    return next.handle(req).pipe(finalize(() => this.serverLoading.onRequestEnd()));
  }
}
