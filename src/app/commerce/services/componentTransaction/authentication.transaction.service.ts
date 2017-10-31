/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { Injectable } from '@angular/core';
import { HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

import { Logger } from "angular2-logger/core";
import { LoginIdentityService } from "../rest/transaction/loginIdentity.service";
import { PersonService } from "../rest/transaction/person.service";
import { StorefrontUtils } from "../../../common/storefrontUtils.service";

@Injectable()
export class AuthenticationTransactionService {

	// Observable authentication status
	private _isLoggedIn: boolean = false;
	authUpdate: Observable<boolean>;
	private _observer: Observer<boolean>;

	constructor(private loginIdentityService: LoginIdentityService,
		private personService: PersonService,
		private storefrontUtils: StorefrontUtils,
		private logger: Logger) {
		// share() allows multiple subscribers to the Observable change
		this.authUpdate = new Observable<boolean>(observer => this._observer = observer).share();
		let currentUserCache = sessionStorage.getItem('currentUser');
		let currentUser = null;
		if (!!currentUserCache){
			currentUser = JSON.parse(atob(currentUserCache));
		}
		if (currentUser && currentUser.WCTrustedToken && currentUser.WCToken && !currentUser.isGuest) {
			this._isLoggedIn = true;
		}
	}

	login(username: string, password: string): Promise<HttpResponse<any>> {
		const params = {
			'storeId': this.storefrontUtils.commerceStoreId,
			'body': {
				'logonId': username,
				'logonPassword': password
			}
		};
		return this.loginIdentityService.login(params, undefined).toPromise().then(res => {
			this.logger.info( this.constructor.name + " login: %o", res );
			let response = res.body;
			if (response.WCTrustedToken && response.WCToken) {
				this._isLoggedIn = true;
				sessionStorage.setItem('currentUser', btoa(JSON.stringify(response)));
			}
			this._observer.next(true);	// update the subscribers to the user's auth status
			return res;
		});
	}

	logout(): Promise<HttpResponse<any>> {
		const params = {
			'storeId': this.storefrontUtils.commerceStoreId
		};
		sessionStorage.removeItem('currentUser');
		return this.loginIdentityService.logout(params, undefined).toPromise().then(res => {
			this.logger.info( this.constructor.name + " logout: %o", res );
			this._isLoggedIn = false;
			this._observer.next(false);	// update the subscribers to the user's auth status
			return res;
		});
	}

	isLoggedIn(): boolean {
		return this._isLoggedIn;
	}

	register(username: string, password: string, confirmPassword: string): Promise<HttpResponse<any>> {
		const today = new Date();
		const params = {
			'storeId': this.storefrontUtils.commerceStoreId,
			'body': {
				'storeId': this.storefrontUtils.commerceStoreId,
				'catalogId': this.storefrontUtils.commerceCatalogId,
				'registerType': 'R',	// G - Guest User (a user who does not provide any profile information), R - Registered User (a user who provides profile information), A - Administrator (registered and an administrator), S - Site Administrator (super user)
				'logonId': username,
				'logonPassword': password,
				'logonPasswordVerify': confirmPassword,
				//'firstName': '',
				//'lastName': '',
				//'appendRootOrganizationDN': '???',
				//'parentMember': '???',
				//'parentMemberId': '???',
				//'orgizationId': '???',
				//'organizationDistinguishedName': '???',
				//'authToken': '???',
				//'receiveEmailPreference': [{
				//	'value': '',
				//	'storeID': this.storefrontUtils.commerceStoreId
				//}],
				//'receiveEmail': '',
				//'receiveSMSNotification': '',
				//'receiveSMS': '',
				//'receiveSMSPreference': [{
				//	'storeID': this.storefrontUtils.commerceStoreId
				//	'value': ''
				//}],
				//'bestCallingTime': '',
				//'businessTitle': '',
				//'organizationUnitName': '???',
				//'organizationName': '???',
				//'personTitle': '???',
				'profileType': 'C',	// C - customer profile, B - business profile
				'challengeAnswer': '-',
				//'challengeQuestion': '',
				//'city': '',
				//'state': '',
				//'country': '',
				//'zipCode': '',
				//'gender': '',
				//'preferredLanguage': '',
				//'preferredCurrency': '',
				//'addressLine': [
				//	'',
				//	'',
				//	''
				//],
				'email1': username,
				//'email2': '',
				//'phone1': '',
				//'fax1': '',
				//'mobileDeviceEnabled': '',
				//'mobilePhone1': '',
				//'mobilePhone1Country': '',
				//'mobileCountryCode': '',
				//'birthdayEnabled': '',
				'curr_year': today.getFullYear(),
				'curr_month': today.getMonth(),
				'curr_date': today.getDate()//,
				//'dateOfBirth': '',
				//'birth_year': '',
				//'birth_month': '',
				//'birth_date': ''
			}
		};
		return this.personService.registerPerson(params, undefined).toPromise().then(res => {
			this.logger.info( this.constructor.name + " register: %o", res );
			let response = res.body;
			if (response.WCTrustedToken && response.WCToken) {
				this._isLoggedIn = true;
				sessionStorage.setItem('currentUser', btoa(JSON.stringify(response)));
			}
			this._observer.next(true);	// update the subscribers to the user's auth status
			return res;
		});
	}
}
