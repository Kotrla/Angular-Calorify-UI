import { Observable, map, tap } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ISelectData } from '../../../../core/ts/app.model';
import { IFood, MealsStoreKey } from '../../ts/meals.model';
import { MealsNgrxService } from '../../services/meals-ngrx.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-add-meal-modal',
	templateUrl: './add-meal-modal.component.html',
	styleUrls: ['./add-meal-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMealModalComponent implements OnInit {
	mealName: string;

	selectFormControl: FormControl = new FormControl('');
	foodQuantityControl: FormControl = new FormControl(100, [Validators.required, Validators.min(1)]);

	selectMeals$: Observable<ISelectData[]>;

	constructor(public bsModalRef: BsModalRef, private mealsNgrxService: MealsNgrxService) {}

	ngOnInit(): void {
		this.mealsNgrxService.loadFoodList();

		this.selectMeals$ = this.mealsNgrxService.selectFromMealsNgrxStore<IFood[]>(MealsStoreKey.FOODS).pipe(
			map(foods => foods.map(food => ({ value: food.name, uiValue: food.name } as ISelectData))),
			tap(foods => this.selectFormControl.patchValue(foods[0]?.value || 'No food in the database'))
		);
	}

	onAddFoodToMeal(): void {
		const meal = this.mealName;
		const food = this.selectFormControl.value as string;
		const quantity = this.foodQuantityControl.value as number;

		this.mealsNgrxService.setMealsIsLoading(true);
		this.mealsNgrxService.addFoodToMeal(meal, food, quantity);
		this.close();
	}

	close(): void {
		this.bsModalRef.hide();
	}
}
