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
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationTransactionService } from '../../commerce/services/componentTransaction/authentication.transaction.service';

@Component({
	selector: 'login',
	styleUrls: ['./login.scss'],
	templateUrl: './login.html'
})
export class LoginComponent implements OnInit {

	@Input() useForCheckout : boolean = false;

	user: any = {};
	returnUrl: string;

	loginLoading: boolean = false;
	registerLoading: boolean = false;

	loginErrorMsg: string = '';
	registerErrorMsg: string = '';

	constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationTransactionService) {
	
	}

	ngOnInit() {
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	login() {
		this.loginLoading = true;

		this.authService.login(this.user.username1, this.user.password1).then(res => {
			// navigate to the given return URL (or home) after a successful login
			this.router.navigate([this.returnUrl]);
		}).catch((error: HttpErrorResponse) => {
			this.loginErrorMsg = this._parseErrorMsg(error, 'Could not log in');
			this.loginLoading = false;
		});
	}

	register() {
		this.registerLoading = true;

		this.authService.register(this.user.username2, this.user.password2, this.user.confirmPassword).then(res => {
			// navigate home after a successful register
			this.router.navigate([this.returnUrl]);
		}).catch((error: HttpErrorResponse) => {
			this.registerErrorMsg = this._parseErrorMsg(error, 'Could not register new user');
			this.registerLoading = false;
		});
	}

	private _parseErrorMsg(error: HttpErrorResponse, fallback: string): string {
		const eBody = error.error;
		return eBody.errors && eBody.errors.length && eBody.errors[0].errorMessage ? eBody.errors[0].errorMessage : fallback;
	}
}
