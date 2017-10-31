/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { Logger } from "angular2-logger/core";

import { AccountTransactionService } from '../../../commerce/services/componentTransaction/account.transaction.service';
import { AuthenticationTransactionService } from '../../../commerce/services/componentTransaction/authentication.transaction.service';
import { CountryService } from '../../../commerce/services/rest/transaction/country.service';
import { ConfigurationService } from '../../../commerce/services/rest/transaction/configuration.service';
import { StorefrontUtils } from '../../../common/storefrontUtils.service';
import { CommerceEnvironment } from "../../../commerce/commerce.environment";

@Component({
	selector: 'personalInfo',
	styleUrls: ['./personalInfo.scss'],
	templateUrl: './personalInfo.html'
})
export class PersonalInfoComponent implements OnInit {
	@Input() user: any = {};
	isLoggedIn: boolean = false;
	authSub: any;
	countries: any[];
	countryDescs: any;
	currencies: any[];
	genderList: any[] = CommerceEnvironment.personalInfo.genderList;
	currentYear: any;
	birthYears: any[] = [];
	birthMonths: any[] = [];
	birthDates: any[] = [];
	updateProcessing: boolean = false;
	success: boolean = false;
	updateErrorMsg: string = "";

	constructor(private router: Router, private countrySvc: CountryService, private configurationSvc: ConfigurationService, private storeUtils: StorefrontUtils, private accountService: AccountTransactionService, private authService: AuthenticationTransactionService, private logger: Logger) {
		this.isLoggedIn = this.authService.isLoggedIn();
		// subscribe to the observable authentication status
		this.authSub = this.authService.authUpdate.subscribe(status => this.isLoggedIn = status);
	}

	ngOnInit() {
		// dummy authentication guard
		if (this.isLoggedIn) {
			this.initCountries();
			this.initCurrencies();
			this.initBirthDates();
			this.initializePersonalInfo();
		}
		else
			this.router.navigate(['/login']);
	}

	private initCountries() {
        if (!this.countries) {
            this.countrySvc.findCountryStateList({"storeId":this.storeUtils.commerceStoreId}).toPromise().then(r=>{
                this.countries=r.body.countries;
				this.countryDescs={};
				for (let c of this.countries) {
					this.countryDescs[c.code]=c;
					c.stateDescs={};
					c.states.forEach((s:any)=>c.stateDescs[s.code]=s);
				}
				this.adjustStateProv();
			}).catch((error: any) => {
				this.handleError(error,"Unable to get country list")
				this.router.navigate(['/login']);
			});
        }
	}

	private initCurrencies() {
        if (!this.currencies) {
            this.configurationSvc.findByConfigurationId({"storeId":this.storeUtils.commerceStoreId, "configurationId":CommerceEnvironment.confSupportedCurrencies}).toPromise().then(r=>{
				this.currencies=r.body.resultList[0].configurationAttribute;
            }).catch((error: any) => {
				this.handleError(error,"Unable to get currency list")
				this.router.navigate(['/login']);
			});
        }
	}

	private initBirthDates() {
		// Years
		this.currentYear = new Date().getFullYear();
		for (var i = 100; i >= 0; i--)
			this.birthYears.push(this.currentYear - i);
		// Months
		for (var i = 1; i <= 12; i++)
			this.birthMonths.push(i);
		// Days
		for (var i = 1; i <= 31; i++)
			this.birthDates.push(i);
	}

	private populateBirthDates() {
		var dateOfBirth = new Date(this.user.dateOfBirth);
		this.user.birthYear = dateOfBirth.getUTCFullYear() || '';
		this.user.birthMonth = dateOfBirth.getUTCMonth() + 1 || '';
		this.user.birthDate = dateOfBirth.getUTCDate() || '';
	}

	private initializePersonalInfo() {
		this.accountService.getCurrentUserPersonalInfo().then(res => {
			this.user = res.body;
			this.populate(this.user);
			this.populateBirthDates();
			this.populateAddress();
			this.adjustStateProv();
		}).catch((error: any) => {
			this.handleError(error,"Unable to get current user personal info")
			this.router.navigate(['/login']);
        });
	}

	private populate(pInfoFields:any) {
		let defsCopy:any;
		for (let a of CommerceEnvironment.personalInfo.reqAttrs)
			if (!pInfoFields[a])
				if (CommerceEnvironment.personalInfo.defaults[a]) {
					if (!defsCopy)
						defsCopy=this.deepCopy(CommerceEnvironment.personalInfo.defaults);
					pInfoFields[a]=defsCopy[a];
				} else {
					pInfoFields[a]=""
				}
	}

	private populateAddress() {
		this.user.address1 = this.user.addressLine[0];
		this.user.address2 = this.user.addressLine[1];
	}

	private deepCopy(i:any):any {
		return JSON.parse(JSON.stringify(i));
	}

	private updatePersonalInfo() {
		this.updateProcessing=true;
		if (this.user.address1)
			this.user.addressLine[0] = this.user.address1;
		if (this.user.address2)
			this.user.addressLine[1] = this.user.address2;

		if (this.user.birthMonth && this.user.birthDate && this.user.birthYear)
			this.user.dateOfBirth = this.user.birthYear + '-' + this.user.birthMonth + '-' + this.user.birthDate;

		this.accountService.updateCurrentUserPersonalInfo(this.user).then(res => {
			this.updateProcessing=false;
			this.success=true;
		}).catch((error: any) => {
			this.handleError(error,"Unable to update personal info")
			this.router.navigate(['/login']);
        });
	}

	adjustStateProv() {
		let b:boolean=this.countryDescs&&this.countryDescs[this.user.country];
		let d:any=b?this.countryDescs[this.user.country]:undefined;
		if (b&&d.states.length>0&&!d.stateDescs[this.user.state])
			this.user.state="";
	}

	private handleError(error: any, fallback: string) {
		this.updateErrorMsg = this.parseErrorMsg(error, fallback);
		this.updateProcessing = false;
		this.success = false;
	}

	private parseErrorMsg(error: HttpErrorResponse, fallback: string): string {
		const eBody = error.error;
        this.logger.info( this.constructor.name + " parseErrorMsg: " + error.message );
        this.logger.debug( this.constructor.name + " parseErrorMsg: " + JSON.stringify( error ));
		return eBody.errors && eBody.errors.length && eBody.errors[0].errorMessage?eBody.errors[0].errorMessage:fallback;
	}
}
