import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {}
