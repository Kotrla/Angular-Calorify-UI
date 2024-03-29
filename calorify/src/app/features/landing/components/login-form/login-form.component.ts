import { Router } from '@angular/router';
import { ILoginForm } from '../../ts/landing.model';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilService } from '../../../../core/services/util.service';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginFormService } from '../../services/login-form.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFormStatus, RoutesEnum } from '../../../../core/ts/app.model';

@UntilDestroy()
@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
	loginForm: FormGroup;
	isFormChanged: boolean;
	isFormStatusValid: boolean;
	initialFormValues: ILoginForm;

	constructor(
		private router: Router,
		private authService: AuthService,
		private loginFormService: LoginFormService
	) {}

	ngOnInit(): void {
		this.loginForm = this.loginFormService.buildForm();
		this.initialFormValues = this.loginForm.value;

		this.watchForm();
	}

	watchForm(): void {
		this.loginForm.valueChanges.pipe(untilDestroyed(this)).subscribe(formValues => {
			this.isFormChanged = UtilService.areFormsChanged(this.initialFormValues, formValues);
			this.isFormStatusValid = this.loginForm.status === AngularFormStatus.VALID;
		});
	}

	onLogin(): void {
		const { email, password } = this.loginForm.value;

		this.authService
			.login(email, password)
			.pipe(untilDestroyed(this))
			.subscribe(login =>
				!!login ? this.router.navigate([`/${RoutesEnum.DASHBOARD}/${RoutesEnum.HOME}`]) : ''
			);
	}

	get getEmailControl(): FormControl {
		return this.loginForm.controls['email'] as FormControl;
	}

	get getPasswordControl(): FormControl {
		return this.loginForm.controls['password'] as FormControl;
	}
}
