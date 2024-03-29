import { Observable, filter } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ISelectData } from '../../core/ts/app.model';
import { ProfileNgrxService } from './services/profile-ngrx.service';
import { ProfileFormService } from './services/profile-form.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IUser, IUserForm, ProfileStoreKey } from './ts/profile.model';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@UntilDestroy()
@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
	goalSelectData: ISelectData[];
	genderSelectData: ISelectData[];
	userDataForm: FormGroup<IUserForm>;

	isLoading$: Observable<boolean>;

	constructor(
		private cdRef: ChangeDetectorRef,
		private profileNgrxService: ProfileNgrxService,
		private profileFormService: ProfileFormService
	) {}

	ngOnInit(): void {
		this.profileNgrxService.loadUserData();

		this.isLoading$ = this.profileNgrxService.selectFromProfileNgrxStore<boolean>(ProfileStoreKey.IS_LOADING);

		this.setSelectData();
		this.loadUserData();
	}

	ngOnDestroy(): void {
		this.profileNgrxService.cancelProfileObservables();
	}

	loadUserData(): void {
		this.profileNgrxService
			.selectFromProfileNgrxStore<IUser>(ProfileStoreKey.USERDATA)
			.pipe(
				untilDestroyed(this),
				filter(userData => !!userData)
			)
			.subscribe(userData => {
				this.userDataForm = this.profileFormService.buildUserDataForm(userData);

				this.cdRef.markForCheck();
			});
	}

	setSelectData(): void {
		this.goalSelectData = this.profileFormService.getGoalSelectData();
		this.genderSelectData = this.profileFormService.getGenderSelectData();
	}

	onSaveUserData(): void {
		const userData = this.profileFormService.getUserDataFromForm(this.userDataForm);

		this.profileNgrxService.setProfileIsLoading(true);
		this.profileNgrxService.updateUserData(userData);
	}
}
