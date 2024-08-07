import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home.component';
import { HomeEffects } from '../ngrx/home.effects';
import { homeFeatureKey, homeReducer } from '../ngrx/home.reducer';
import { DailySummaryComponent } from '../components/daily-summary/daily-summary.component';
import { WeeklySummaryComponent } from '../components/weekly-summary/weekly-summary.component';
import { CardComponent } from '../../../shared/ui/card/card.component';
import { ChartComponent } from '../../../shared/ui/chart/chart.component';

@NgModule({
	declarations: [HomeComponent, DailySummaryComponent, WeeklySummaryComponent],
	imports: [
		CommonModule,
		CardComponent,
		ChartComponent,
		StoreModule.forFeature(homeFeatureKey, homeReducer),
		EffectsModule.forFeature([HomeEffects]),
	],
})
export class HomeFeatureWithoutRoutingModule {}
