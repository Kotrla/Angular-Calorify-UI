import { Routes } from '@angular/router';
import { WorkoutsRoutes } from '../ts/workouts.model';
import { WorkoutsComponent } from '../workouts.component';
import { DailyWorkoutsComponent } from '../components/daily-workouts/daily-workouts.component';
import { WorkoutHistoryComponent } from '../components/workout-history/workout-history.component';

export const workoutsRoutes: Routes = [
	{
		path: '',
		component: WorkoutsComponent,
		children: [
			{
				path: '',
				redirectTo: WorkoutsRoutes.DAILY,
				pathMatch: 'full',
			},
			{ path: WorkoutsRoutes.DAILY, component: DailyWorkoutsComponent },
			{ path: WorkoutsRoutes.HISTORY, component: WorkoutHistoryComponent },
		],
	},
];
