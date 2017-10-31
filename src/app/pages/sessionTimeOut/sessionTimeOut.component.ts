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
import { Logger } from "angular2-logger/core";
import { HttpErrorResponse } from '@angular/common/http';

import { AuthenticationTransactionService } from '../../commerce/services/componentTransaction/authentication.transaction.service';

@Component({
	selector: 'session-time-out',
	styleUrls: ['./sessionTimeOut.scss'],
	templateUrl: './sessionTimeOut.html'
})
export class SessionTimeOutComponent implements OnInit {

	isLoggedIn: boolean = false;
	authSub: any;
	returnUrl: string;

	constructor(private authService: AuthenticationTransactionService, private logger: Logger, private router: Router, private route: ActivatedRoute) { }
 
	ngOnInit() {
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

		this.isLoggedIn = this.authService.isLoggedIn();
		// subscribe to the observable authentication status
		this.authSub = this.authService.authUpdate.subscribe(status => this.isLoggedIn = status);

		this.logout();
	}

	private logout() {
		this.authService.logout().then(res => { }).catch(e=>this.handleError(e,"Unable to logout successfully"));
	}

	private handleError(error:HttpErrorResponse,fallback:string) {
		const eBody=error.error;
		this.logger.info( this.constructor.name + " handleError: " + error.message );
        this.logger.debug( this.constructor.name + " handleError: " + JSON.stringify( error ));
		return eBody.errors&&eBody.errors.length&&eBody.errors[0].errorMessage?eBody.errors[0].errorMessage:fallback;
	}

	ngOnDestroy() {
		this.authSub.unsubscribe();
	}
}