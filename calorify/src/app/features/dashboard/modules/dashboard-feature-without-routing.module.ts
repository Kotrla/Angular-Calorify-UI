import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@NgModule({
	declarations: [SidebarComponent, DashboardComponent],
	imports: [CommonModule, ButtonComponent, RouterModule],
})
export class DashboardFeatureWithoutRoutingModule {}
