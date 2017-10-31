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
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";

import { AuthenticationTransactionService } from '../../../commerce/services/componentTransaction/authentication.transaction.service';
import { CommerceEnvironment } from "../../../commerce/commerce.environment";

@Component({
	selector: 'orderHistory',
	styleUrls: ['./orderHistory.scss'],
	templateUrl: './orderHistory.html'
})
export class OrderHistoryComponent implements OnInit {
	readonly ordTypes:any=CommerceEnvironment.order.types;
	readonly ordDisplay:any=CommerceEnvironment.order.typeDisplay;
	listType:string=CommerceEnvironment.order.types.history;
	isLoggedIn: boolean = false;
	authSub: any;

	constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationTransactionService) {
		this.isLoggedIn = this.authService.isLoggedIn();
		this.authSub = this.authService.authUpdate.subscribe(status => this.isLoggedIn = status);
	}

	ngOnInit() {
		if (!this.isLoggedIn)
			this.router.navigate(['/login']);
		this.route.params.subscribe(params=>{
			if (params.type)
				this.listType=params.type;
		});
	}
}
