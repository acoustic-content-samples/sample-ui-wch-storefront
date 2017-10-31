/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Logger } from "angular2-logger/core";

import { ConfigurationService } from '../../commerce/services/rest/transaction/configuration.service';
import { StorefrontUtils } from '../../common/storefrontUtils.service';
import { CommerceEnvironment } from "../../commerce/commerce.environment";


@Component({
	selector: 'language-selection',
	styleUrls: [ './languageSelection.scss' ],
	templateUrl: './languageSelection.html'
})
export class LanguageSelectionComponent implements OnInit {
	supportedLanguages: any[] = [];
	defaultLanguage: string = "";
	defLangList: string[] = [];
	selectedLanguage: string = "";

	constructor(private translate: TranslateService, 
		private configurationSvc: ConfigurationService, 
		private storeUtils: StorefrontUtils, 
		private logger: Logger, 
		private router: Router) { 

	}
 
	ngOnInit() {
		this.initDefaultLang();
		this.initSupportedLang();
	}

	private initDefaultLang() {
		// default language
		this.configurationSvc.findByConfigurationId({"storeId":this.storeUtils.commerceStoreId, "configurationId":CommerceEnvironment.confDefaultLanguage}).toPromise().then(r=>{
			this.defaultLanguage=r.body.resultList[0].configurationAttribute[0].additionalValue[2].value;
			if (this.defaultLanguage !== CommerceEnvironment.defaultLang) {
				this.translate.setDefaultLang(this.defaultLanguage);
				this.translate.use(this.defaultLanguage);
			}
		}).catch((error: any) => {
			this.handleError(error,"Unable to get configuration default language");
		});
	}

	private initSupportedLang() {
		// supported languages
		this.configurationSvc.findByConfigurationId({"storeId":this.storeUtils.commerceStoreId, "configurationId":CommerceEnvironment.confSupportedLanguages}).toPromise().then(r=>{
			this.supportedLanguages=r.body.resultList[0].configurationAttribute;
			this.defaultLanguage = this.translate.getDefaultLang();
			this.selectedLanguage=this.defaultLanguage;
		}).catch((error: any) => {
			this.handleError(error,"Unable to get configuration supported language");
        });
	}

	private changeLang() {
		this.translate.use(this.selectedLanguage);
	}

	private handleError(error: HttpErrorResponse, fallback: string) {
		const eBody = error.error;
        this.logger.info( this.constructor.name + " handleError: " + error.message );
		this.logger.debug( this.constructor.name + " handleError: " + JSON.stringify( error ));
	}
}