/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommerceModule } from '../../../commerce/commerce.module';

import { PersonalInfoComponent } from "./personalInfo.component";
import { ThemeModule } from '../../../theme/theme.module';

@NgModule({
	imports: [
		TranslateModule,
		RouterModule.forChild([
			{ path: '', component: PersonalInfoComponent }
		]),
		ThemeModule,
		FormsModule,
		CommonModule,
		CommerceModule
	],
	declarations: [
		PersonalInfoComponent
	]
})
export class PersonalInfoModule {}
