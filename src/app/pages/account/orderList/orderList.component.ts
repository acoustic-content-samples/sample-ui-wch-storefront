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

import { OrderTransactionService } from '../../../commerce/services/componentTransaction/order.transaction.service';
import { AuthenticationTransactionService } from '../../../commerce/services/componentTransaction/authentication.transaction.service';
import { CartTransactionService } from "../../../commerce/services/componentTransaction/cart.transaction.service";
import { ProductService } from "../../../commerce/services/product.service";
import { AccountTransactionService } from "../../../commerce/services/componentTransaction/account.transaction.service";
import { StorefrontUtils } from '../../../common/storefrontUtils.service';
import { CommerceEnvironment } from "../../../commerce/commerce.environment";
import { Logger } from "angular2-logger/core";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'order-list',
	styleUrls: ['./orderList.scss'],
	templateUrl: './orderList.html'
})
export class OrderListComponent {
	@Input()listType:string=CommerceEnvironment.order.types.history;
	@Input()acctSmry:boolean=false;
	readonly ordTypes:any=CommerceEnvironment.order.types;
	readonly cancelNoticeSecs:number=43200;
	buyerId:string;
	orders: any[];
	isLoggedIn: boolean = false;
	authSub: any;
	loading = false;
	total = 0;
	pageNumber: number = 1;
	pageSize: number = CommerceEnvironment.pageSize;
	processed:string="";

	constructor(private route: ActivatedRoute,
				private router: Router,
				private orderService: OrderTransactionService,
				private authService: AuthenticationTransactionService,
				private cartTransactionService: CartTransactionService,
				private logger: Logger,
				private store:StorefrontUtils,
				private acctSvc:AccountTransactionService,
				private prodSvc:ProductService) {
		this.isLoggedIn = this.authService.isLoggedIn();
		this.authSub = this.authService.authUpdate.subscribe(status => this.isLoggedIn = status);
	}

	ngOnInit() {
		if (this.isLoggedIn) {
			this.acctSvc.getCurrentUserPersonalInfo().then(r=>{
				this.buyerId=r.body.userId;
				this.fetchRecords();
			});
		} else {
			this.router.navigate(['/login']);
		}
	}

	private fetchRecords() {
		this.processed="";
		if (this.listType === CommerceEnvironment.order.types.recurring ||
			this.listType === CommerceEnvironment.order.types.subscription)
			this.getSubscriptions();
		else
			this.getOrderHistory();
	}

	private getSubscriptions() {
		this.loading = true;
		this.orderService.getSubscription(this.buyerId,this.listType,this.pageNumber,this.pageSize).then(r=>{
			this.orders=r.resultList;
			this.total=r.recordSetTotal;
			if (CommerceEnvironment.order.types.subscription===this.listType&&this.total>0)
				this.orders.forEach(o=>this.setItem(o));
			this.loading=false;
		}).catch((error: any) => {
			this.handleError(error,"Unable to retrieve: " + this.listType + " order-types");
			this.router.navigate(["/login"]);
        });
	}

	private getOrderHistory() {
		this.loading = true;
		this.orderService.getCurrentUserOrderHistory(this.pageNumber, this.pageSize).then(res => {
			this.orders = res.Order;
			this.total = res.recordSetTotal;
			this.loading = false;
		}).catch((error: any) => {
			this.handleError(error,"Unable to get order history")
			this.router.navigate(['/login']);
        });
	}

	private handleError(error: HttpErrorResponse, fallback: string) {
		const eBody = error.error;
		if ( this.logger.level < 4 )
            this.logger.info( this.constructor.name + " handleError: " + error.message );
        this.logger.debug( this.constructor.name + " handleError: " + JSON.stringify( error ));
	}

	goToPage(n: number): void {
		this.pageNumber = n;
		this.fetchRecords();
  	}

	onNext(): void {
    	this.pageNumber++;
    	this.fetchRecords();
	}

	onPrev(): void {
    	this.pageNumber--;
    	this.fetchRecords();
  	}

	reOrder(order:any) {
		switch (this.listType) {
			case CommerceEnvironment.order.types.history:
			case CommerceEnvironment.order.types.recurring: {
				let oId=this.listType===CommerceEnvironment.order.types.history?order.orderId:order.purchaseDetails.parentOrderIdentifier.parentOrderId;
				this.cartTransactionService.copyOrder(oId).then(r=>this.router.navigate(["/cart"]));
				break;
			}
			case CommerceEnvironment.order.types.subscription: {
				this.orderService.copySubscription(order.purchaseDetails.parentOrderIdentifier.parentOrderId,order.purchaseDetails.parentOrderItemIdentifier.parentOrderItemId).then(r=>
					this.router.navigate(["/cart"])
				);
				break;
			}
		}
	}

	cancelOrder(order:any) {
		switch (this.listType) {
			case CommerceEnvironment.order.types.history: {
				this.cartTransactionService.cancelOrder(order.orderId);
				break;
			}
			case CommerceEnvironment.order.types.recurring:
			case CommerceEnvironment.order.types.subscription: {
				let isSubscr:boolean=this.listType===CommerceEnvironment.order.types.subscription;

				// when we start using modal dialogs, we should use modal-components to get confirmation; i will leave some vars here for use later
				/*let dtNxt:Date=new Date(this.getNextOrderDate(order));
				let dtNow:number=Date.now();
				let diff=(dtNxt.getTime()-dtNow)/1000;
				let confirmMsgParam=dtNxt.toLocaleDateString();
				let confirmMsg:string;
				if (isSubscr)
					confirmMsg=diff>this.cancelNoticeSecs?CommerceEnvironment.order.msgKeys.subscrAllFuture:CommerceEnvironment.order.msgKeys.subscrAllFutureExcCurrent;
				else
					confirmMsg=diff>this.cancelNoticeSecs?CommerceEnvironment.order.msgKeys.recurOrderAllFuture:CommerceEnvironment.order.msgKeys.recurOrderAllFutureExcCurrent;*/

				// invoke cancel
				this.loading=true;
				this.orderService.cancelSubscription(order.subscriptionIdentifier.subscriptionId,order.purchaseDetails.parentOrderIdentifier.parentOrderId).then(r=>{
					this.fetchRecords();
					if (isSubscr)
						this.processed=r.state===CommerceEnvironment.order.orderStatus.PendingCancel?
									   CommerceEnvironment.order.msgKeys.subscrCancelSubmitted:
									   CommerceEnvironment.order.msgKeys.subscrCancelled;
 					else
						this.processed=r.state===CommerceEnvironment.order.orderStatus.PendingCancel?
									   CommerceEnvironment.order.msgKeys.recurOrderCancelSubmitted:
									   CommerceEnvironment.order.msgKeys.recurOrderCancelled;
				});
				break;
			}
		}
	}

	setItem(order:any) {
		this.prodSvc.findProductsById(this.store.commerceStoreId,order.purchaseDetails.subscribedItem.subscribedItemId).then(r=>order._item=r[0]);
	}

	getNextOrderDate(order:any):string {
		return (CommerceEnvironment.order.types.history!==this.listType&&
				(order.state==CommerceEnvironment.order.orderStatus.Active||
			 	 order.state==CommerceEnvironment.order.orderStatus.InActive||
				 order.state==CommerceEnvironment.order.orderStatus.PendingCancel)) ?
			   order.subscriptionInfo.fulfillmentSchedule.frequencyInfo.nextOccurence:
			   "-";
	}

	getExpiryDate(order:any):string {
		return (CommerceEnvironment.order.types.subscription===this.listType)?
			   order.subscriptionInfo.fulfillmentSchedule.endInfo.endDate:
			   "-";
	}

	getFrequency(order:any):string {
		let rc;
		if (CommerceEnvironment.order.types.history===this.listType||!order.subscriptionInfo.fulfillmentSchedule.frequencyInfo.frequency.value) {
			rc=CommerceEnvironment.order.msgKeys.infoNA;
		} else  {
			let frqInfo:number=order.subscriptionInfo.fulfillmentSchedule.frequencyInfo.frequency.value;
			let endInfo=order.subscriptionInfo.fulfillmentSchedule.endInfo.duration?order.subscriptionInfo.fulfillmentSchedule.endInfo.duration.value:0;
			let timePeriod:number=endInfo||0;
			let uom:string=order.subscriptionInfo.fulfillmentSchedule.frequencyInfo.frequency.uom;
			uom=uom.trim();

			if (1==timePeriod) {
				rc=CommerceEnvironment.order.freq.onceOnly;
			} else {
				switch (uom) {
					case CommerceEnvironment.order.uom.hour: {
						rc=1==frqInfo?CommerceEnvironment.order.freq.everyHour:CommerceEnvironment.order.freq.everyXHours;
						break;
					}
					case CommerceEnvironment.order.uom.day: {
						rc=1==frqInfo?CommerceEnvironment.order.freq.everyDay:CommerceEnvironment.order.freq.everyXDays;
						break;
					}
					case CommerceEnvironment.order.uom.week: {
						rc=1==frqInfo?CommerceEnvironment.order.freq.everyWeek:CommerceEnvironment.order.freq.everyXWeeks;
						break;
					}
					case CommerceEnvironment.order.uom.month: {
						rc=1==frqInfo?CommerceEnvironment.order.freq.everyMonth:CommerceEnvironment.order.freq.everyXMonths;
						break;
					}
					case CommerceEnvironment.order.uom.year: {
						rc=1==frqInfo?CommerceEnvironment.order.freq.everyYear:CommerceEnvironment.order.freq.everyXYears;
						break;
					}
				}
			}
		}
		return rc;
	}

	getOrderStatusDescription(orderStatus:string): string {
		return CommerceEnvironment.order.orderStatus[orderStatus];
	}

	isCancellable(order:any):boolean {
		let rc:boolean=false;
		switch (this.listType) {
			case CommerceEnvironment.order.types.history: {
				rc=(CommerceEnvironment.shopOnBehalfSessionEstablished && CommerceEnvironment.order.validOrderStatusForCancel.indexOf(order.orderStatus) != -1);
				break;
			}
			case CommerceEnvironment.order.types.recurring:
			case CommerceEnvironment.order.types.subscription: {
				rc=(order.state===CommerceEnvironment.order.orderStatus.Active);
				break;
			}
		}
		return rc;
	}
}
