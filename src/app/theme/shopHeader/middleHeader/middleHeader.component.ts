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
import { Router } from '@angular/router';

import { AuthenticationTransactionService } from '../../../commerce/services/componentTransaction/authentication.transaction.service';

@Component({
	selector: 'middle-header',
	styleUrls: [ './middleHeader.scss' ],
	templateUrl: './middleHeader.html',
})
export class MiddleHeaderComponent implements OnInit {
	logoSrc = require('./images/logo.png');
	isLoggedIn: boolean = false;
	authSub: any;

	constructor(private router: Router, private authService: AuthenticationTransactionService) { }
 
	ngOnInit() {
		this.isLoggedIn = this.authService.isLoggedIn();
		// subscribe to the observable authentication status
		this.authSub = this.authService.authUpdate.subscribe(status => this.isLoggedIn = status);
	}

	logout() {
		this.authService.logout().then(res => {
			// navigate home after a successful logout
			this.router.navigate(['/home']);
		}).catch(error => {
			console.error('Could not logout because of error: %o', error);
		});
	}

	ngOnDestroy() {
		this.authSub.unsubscribe();
	}
}
