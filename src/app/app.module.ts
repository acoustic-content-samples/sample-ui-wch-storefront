/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { NgModule , ViewEncapsulation, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

import { ThemeModule } from './theme/theme.module';
import { PagesModule } from './pages/pages.module';
import { ConfigService } from './common/config.service';

import 'core-js/es6';
import 'core-js/es7/reflect';

import 'zone.js/dist/zone';

export function HttpLoaderFactory (http: Http) {
	return new TranslateHttpLoader(http, 'locales/');
}

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ThemeModule,
		PagesModule,
		HttpModule,
		RouterModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [ Http ]
			}
		})
	],
	declarations: [
		AppComponent,
	],
	providers: [
    	ConfigService,
		{
			provide: APP_INITIALIZER,
			useFactory: (configService: ConfigService) => () => configService.init(),
			deps: [ ConfigService, Http ],
			multi: true
		}
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
