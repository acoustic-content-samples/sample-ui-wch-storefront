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
import { Observable } from "rxjs";

import { AccountTransactionService } from '../../commerce/services/componentTransaction/account.transaction.service';
import { AuthenticationTransactionService } from '../../commerce/services/componentTransaction/authentication.transaction.service';
import { CommerceEnvironment } from "../../commerce/commerce.environment";

@Component({
	selector: 'account',
	styleUrls: ['./account.scss'],
	templateUrl: './account.html'
})
export class AccountComponent implements OnInit {
	user:any={};
	isLoggedIn:boolean=false;
	authSub:any;
	prsnInfo:any;
	readonly addrDel:string[]=["addressType","firstName","lastName"];
	readonly ordTypes:any=CommerceEnvironment.order.types;

	constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountTransactionService, private authService: AuthenticationTransactionService) {
		this.isLoggedIn = this.authService.isLoggedIn();
		// subscribe to the observable authentication status
		this.authSub = this.authService.authUpdate.subscribe(status => this.isLoggedIn = status);
	}

	ngOnInit() {
		// dummy authentication guard
		if (this.isLoggedIn)
			this.initializePersonalInfo();
		else
			this.router.navigate(["/login"]);
	}

	initializePersonalInfo() {
		this.accountService.getCurrentUserPersonalInfo().then(r=>{
			this.user=r.body;
			this.prsnInfo=this.deepCopy(this.user);
			this.addrDel.forEach(e=>{
				if(this.prsnInfo[e])
					delete this.prsnInfo[e];
			});
			this.user.disp=this.user.firstName&&this.user.lastName?this.user.firstName+" "+this.user.lastName:this.user.logonId;
		});
	}

	deepCopy(i:any):any {
		return JSON.parse(JSON.stringify(i));
	}

}
