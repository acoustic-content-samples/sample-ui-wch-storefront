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
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

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
        private storefrontUtils: StorefrontUtils) {
		// share() allows multiple subscribers to the Observable change
		this.authUpdate = new Observable<boolean>(observer => this._observer = observer).share();
	}

	login(username: string, password: string): Promise<Response> {
		const params = {
			'storeId': this.storefrontUtils.commerceStoreId,
			'body': {
				'logonId': username,
				'logonPassword': password
			},
			'$queryParameters': {
				'updateCookies': true
			}
		};
		return this.loginIdentityService.login(params, undefined).toPromise().then(res => {
			console.info('login data %o', res);
			this._isLoggedIn = true;
			this._observer.next(true);	// update the subscribers to the user's auth status
			return res;
		});
	}

	logout(): Promise<Response> {
		const params = {
			'storeId': this.storefrontUtils.commerceStoreId,
			'$queryParameters': {
				'updateCookies': true
			}
		};
		return this.loginIdentityService.logout(params, undefined).toPromise().then(res => {
			console.info('logout data %o', res);
			this._isLoggedIn = false;
			this._observer.next(false);	// update the subscribers to the user's auth status
			return res;
		});
	}

	isLoggedIn(): boolean {
		return this._isLoggedIn;
	}

	register(username: string, email: string, password: string): Promise<Response> {
		const today = new Date();
		const params = {
			'storeId': this.storefrontUtils.commerceStoreId,
			'body': {
				'storeId': this.storefrontUtils.commerceStoreId,
				'catalogId': this.storefrontUtils.commerceCatalogId,
				'registerType': 'R',	// G - Guest User (a user who does not provide any profile information), R - Registered User (a user who provides profile information), A - Administrator (registered and an administrator), S - Site Administrator (super user)
				'logonId': username,
				'logonPassword': password,
				'logonPasswordVerify': password,
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
				//'challengeAnswer': '',
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
				'email1': email,
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
			},
			'$queryParameters': {
				'updateCookies': true
			}
		};
		return this.personService.registerPerson(params, undefined).toPromise().then(res => {
			console.info('register data %o', res);
			this._isLoggedIn = true;
			this._observer.next(true);	// update the subscribers to the user's auth status
			return res;
		});
	}
}
