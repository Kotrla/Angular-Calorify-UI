import { createReducer, on } from '@ngrx/store';
import { IUser, IUserTargets } from '../ts/home.model';

import * as actions from './home.actions';

export const homeFeatureKey = 'home';

export interface IHomeState {
	isLoading: boolean;
	userData: IUser | null;
	targets: IUserTargets[];
	daily: IUserTargets | null;
}

export const initialHomeState: IHomeState = {
	userData: null,
	isLoading: true,
	daily: null,
	targets: [],
};

export const homeReducer = createReducer(
	initialHomeState,
	on(actions.setHomeIsLoading, (state, { payload }) => ({
		...state,
		isLoading: payload.isLoading,
	})),
	on(actions.finishLoadingUserDaily, (state, { payload }) => ({
		...state,
		daily: payload.daily,
	})),
	on(actions.finishLoadingUserTargets, (state, { payload }) => ({
		...state,
		targets: payload.targets,
	})),
	on(actions.cancelHomeObservables, state => ({
		...state,
		isLoading: true,
		daily: null,
		targets: [],
	})),
	on(actions.finishLoadingUser, (state, { payload }) => ({
		...state,
		userData: payload.userData,
		isLoading: false,
	}))
);
