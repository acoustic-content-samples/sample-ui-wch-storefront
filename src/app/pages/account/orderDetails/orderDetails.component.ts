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
import { AuthenticationTransactionService } from '../../../commerce/services/componentTransaction/authentication.transaction.service';
import { OrderTransactionService } from '../../../commerce/services/componentTransaction/order.transaction.service';
import { CartTransactionService } from "../../../commerce/services/componentTransaction/cart.transaction.service";
import { CommerceEnvironment } from "../../../commerce/commerce.environment";

@Component({
	selector: 'orderDetails',
	styleUrls: ['./orderDetails.scss'],
	templateUrl: './orderDetails.html'
})
export class OrderDetailsComponent implements OnInit {
	order: any;
	isLoggedIn: boolean = false;
	authSub: any;

	constructor(private route: ActivatedRoute, private router: Router, private orderService: OrderTransactionService, private authService: AuthenticationTransactionService, private cartTransactionService: CartTransactionService) {
		this.isLoggedIn = this.authService.isLoggedIn();
		// subscribe to the observable authentication status
		this.authSub = this.authService.authUpdate.subscribe(status => this.isLoggedIn = status);
	}

	ngOnInit() {
		if (this.isLoggedIn)
            this.initializeOrderDetails();
		else
			this.router.navigate(['/login']);
	}

	private initializeOrderDetails() {
		this.route.params.subscribe(params => {
			this.orderService.getOrderDetails(params.id).then(order => {
				console.log(order);
				this.order = order;
			}).catch((error: any) => {
			console.error('Error getting order details: %o', error);
			this.router.navigate(['/login']);
        	});
		});
	}
	onSubmit() {
    this.cartTransactionService
			.copyOrder(this.order.orderId);
			this.router.navigate(['/cart']);
	}

	reOrder(orderId: string) {
	    this.cartTransactionService
			.copyOrder(orderId);
		this.router.navigate(['/cart']);
	}
	cancelOrder(orderId: string) {
    	this.cartTransactionService
			.cancelOrder(orderId);
	}

	isCancellable(orderStatus: string): boolean {
		if (CommerceEnvironment.shopOnBehalfSessionEstablished && CommerceEnvironment.order.validOrderStatusForCancel.indexOf(orderStatus) != -1) {
			return true;
		}
		else {
			return false;
		}
	}
	print() {
		print();
	}
}
