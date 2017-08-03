import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommerceModule } from '../../commerce/commerce.module';

import { CorpResponsibilityComponent } from "./corpResponsibility.component";
import { ThemeModule } from '../../theme/theme.module';

@NgModule({
	imports: [
		TranslateModule,
		RouterModule.forChild([
			{ path: '', component: CorpResponsibilityComponent }
		]),
		ThemeModule,
		FormsModule,
		CommonModule,
		CommerceModule
	],
	declarations: [
		CorpResponsibilityComponent
	]
})
export class CorpResponsibilityModule {}
