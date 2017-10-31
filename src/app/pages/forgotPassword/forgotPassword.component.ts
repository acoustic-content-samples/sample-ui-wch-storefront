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
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationTransactionService } from '../../commerce/services/componentTransaction/authentication.transaction.service';
import { PersonService } from '../../commerce/services/rest/transaction/person.service';
import { StorefrontUtils } from '../../common/storefrontUtils.service';

@Component({
	selector: 'forgotPassword',
	styleUrls: ['./forgotPassword.scss'],
	templateUrl: './forgotPassword.html'
})
export class ForgotPasswordComponent implements OnInit {
	resetLogonId: string;
	returnUrl: string;
	isLoggedIn: boolean = false;
	resetPasswordProcessing: boolean = false;
	resetPasswordErrorMsg: string = '';

	constructor(private route: ActivatedRoute, private router: Router, private personSvc: PersonService, private storeUtils: StorefrontUtils, private authService: AuthenticationTransactionService) {
		this.isLoggedIn = this.authService.isLoggedIn();
	}

	ngOnInit() {
		if (this.isLoggedIn) {
			this.router.navigate(['/account']);
		}
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
	}

	resetPassword() {
		this.resetPasswordProcessing = true;
		const params = {
			'storeId': this.storeUtils.commerceStoreId,
			'body': {
				'storeId': this.storeUtils.commerceStoreId,
				'logonId': this.resetLogonId,
				'resetPassword': 'true',
				'challengeAnswer': '-'
			}
		};
		this.personSvc.updatePerson(params).toPromise().then(res => {
			// navigate to the given return URL (or account page) after a successful login
			this.router.navigate([this.returnUrl]);
		}).catch(error => {
			this.resetPasswordErrorMsg = this._parseErrorMsg(error, 'Could not process password-reset request');
			this.resetPasswordProcessing = false;
		});
	}

	private _parseErrorMsg(error: any, fallback: string): string {
		const eBody = JSON.parse(error._body);
		return eBody.errors && eBody.errors.length && eBody.errors[0].errorMessage ? eBody.errors[0].errorMessage : fallback;
	}
}
