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
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationTransactionService } from '../../../commerce/services/componentTransaction/authentication.transaction.service';
import { AccountTransactionService } from '../../../commerce/services/componentTransaction/account.transaction.service';
import { PersonService } from '../../../commerce/services/rest/transaction/person.service';
import { StorefrontUtils } from '../../../common/storefrontUtils.service';

@Component({
	selector: 'changePassword',
	styleUrls: ['./changePassword.scss'],
	templateUrl: './changePassword.html'
})
export class ChangePasswordComponent implements OnInit {
	user:any={};
	returnUrl:string;
	isLoggedIn:boolean=false;
	chgPassProc:boolean=false;
	chgPassErr:string="";

	constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountTransactionService,  private personSvc: PersonService, private storeUtils: StorefrontUtils, private authService: AuthenticationTransactionService) {
		this.isLoggedIn=this.authService.isLoggedIn();
	}

	ngOnInit() {
		if (this.isLoggedIn)
			this.initializePersonalInfo();
		else
			this.router.navigate(["/login"]);
		this.returnUrl = this.route.snapshot.queryParams["returnUrl"]||"/account";
	}

	changePassword() {
		if (this.user.newPassword != this.user.confirmPassword) {
			this.chgPassErr="New and confirm password fields do not match";
			this.chgPassProc=false;
		} else {
			this.chgPassProc=true;
			const p={
				storeId:this.storeUtils.commerceStoreId,
				body:{
					logonId:this.user.logonId,
					logonPasswordOld:this.user.curPass,
					logonPassword:this.user.newPass,
					logonPasswordVerify:this.user.cnfPass
				}
			};
			this.personSvc.updatePersonOnUserRegistrationUpdate(p).toPromise()
			.then(r=>{this.router.navigate([this.returnUrl]);})
			.catch(e=>{this.chgPassErr=this._parseErrorMsg(e,"Could not process password change");});
		}
	}

	initializePersonalInfo() {
		this.accountService.getCurrentUserPersonalInfo().then(r=>{this.user=r.body;});
	}

	private _parseErrorMsg(error:HttpErrorResponse,fallback:string): string {
		const eBody=error.error,
		      rc=eBody.errors&&eBody.errors.length&&eBody.errors[0].errorMessage?eBody.errors[0].errorMessage:fallback;
		this.chgPassProc=false;
		return rc;
	}
}
