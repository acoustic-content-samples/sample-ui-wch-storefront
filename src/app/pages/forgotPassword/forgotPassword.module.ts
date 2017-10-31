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
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpModule } from '@angular/http';

import { ForgotPasswordComponent } from "./forgotPassword.component";

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', component: ForgotPasswordComponent }
		]),
		CommonModule,
		FormsModule,
		HttpModule,
		TranslateModule
	],
	declarations: [
		ForgotPasswordComponent
	]
})
export class ForgotPasswordModule {}
