import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const authToken = this.authService.getToken();

		req = req.clone({
			setHeaders: {
				Authorization: 'Bearer ' + authToken,
				'Content-Type': 'application/json',
			},
		});

		return next.handle(req);
	}
}
