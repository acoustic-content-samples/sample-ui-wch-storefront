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

import { PersonService } from "../rest/transaction/person.service";
import { StorefrontUtils } from "../../../common/storefrontUtils.service";

@Injectable()
export class AccountTransactionService {

	// Observable authentication status
	authUpdate: Observable<boolean>;
	private _observer: Observer<boolean>;

	constructor(
		private personService: PersonService,
		private storefrontUtils: StorefrontUtils,
		private logger: Logger ) {
		// share() allows multiple subscribers to the Observable change
		this.authUpdate = new Observable<boolean>(observer => this._observer = observer).share();
	}

	getCurrentUserPersonalInfo(): Promise<HttpResponse<any>> {
		const params = {
			'storeId': this.storefrontUtils.commerceStoreId,
			'body': {
				'firstName': '',
				'lastName': '',
				'addressLine': ['',''],
				'address1': '',
				'address2': '',
				'city': '',
				'state': '',
				'country': '',
				'zipCode': '',				
				'email1': '',
				'phone1': '',
				'preferredCurrency': '',
				'gender': '',
				'dateOfBirth': ''
			}
		};

		return this.personService.findPersonBySelf(params, undefined).toPromise().then(res => {
			this.logger.info( this.constructor.name + " getCurrentUserPersonalInfo: %o", res );
			return res;
		});
	}

	updateCurrentUserPersonalInfo(user: any): Promise<HttpResponse<any>> {
		const params = {
			'storeId': this.storefrontUtils.commerceStoreId,
			'body': {
				"firstName": user.firstName,
				"lastName": user.lastName,
				"addressLine": user.addressLine,
				"address1": user.address1,
				"address2": user.address2,
				"city": user.city,
				"state": user.state,
				"country": user.country,
				"zipCode": user.zipCode,
				"email1": user.email1,
				"phone1": user.phone1,
				"preferredCurrency": user.preferredCurrency,
				"gender": user.gender,
				"dateOfBirth": user.dateOfBirth
			}
		};

		return this.personService.updatePerson(params, undefined).toPromise().then(res => {
			this.logger.info( this.constructor.name + " updateCurrentUserPersonalInfo: %o", res );
			return res;
		});
	}
}
