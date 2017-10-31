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
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { OrderService } from "../rest/transaction/order.service";
import { SubscriptionService } from "../rest/transaction/subscription.service";
import { CartService } from "../rest/transaction/cart.service";
import { StorefrontUtils } from "../../../common/storefrontUtils.service";
import { Logger } from "angular2-logger/core";

@Injectable()
export class OrderTransactionService {

	constructor(
		private orderService: OrderService,
		private storefrontUtils: StorefrontUtils,
		private logger: Logger,
		private subscrSvc:SubscriptionService,
		private cartSvc:CartService
	) {}

	getCurrentUserOrderHistory(pageNumber: number, pageSize: number): Promise<any> {
		const params = {
			'storeId': this.storefrontUtils.commerceStoreId,
			'pageNumber': pageNumber,
			'pageSize': pageSize
		};

		return this.orderService.findOrderHistory(params, undefined).toPromise().then(res => {
			if ( this.logger.level < 4 )
				this.logger.info( this.constructor.name + "orderHistory data: %o", res );
			return res.body as any;
		});
	}

	getOrderDetails(orderId: any): Promise<any> {
		const params = {
			'storeId': this.storefrontUtils.commerceStoreId,
			'orderId': orderId
		};

		return this.orderService.findByOrderId(params, undefined).toPromise().then(res => {
			if ( this.logger.level < 4 )
				this.logger.info( this.constructor.name + "orderDetail data: %o", res );
			return res.body as any;
		});
	}

	getSubscription(userId:string,type:string,pg:number,sz:number):Promise<any> {
		const p={storeId:this.storefrontUtils.commerceStoreId,
				 profileName:"IBM_Store_Summary",
				 buyerId:userId,
				 q:"byBuyerIdAndSubscriptionType",
				 subscriptionTypeCode:type,
				 $queryParameters:{
					 pageNumber:pg,
					 pageSize:sz
				 }
			   	};
		return this.subscrSvc.byBuyerIdAndSubscriptionType(p).toPromise().then(r=>{return r.body as any});
	}

	cancelSubscription(subscriptionId:string,orderId:string):Promise<any> {
		const p={storeId:this.storefrontUtils.commerceStoreId,orderId:orderId,subscriptionId:subscriptionId};
		return this.subscrSvc.cancelRecurringOrSubscription(p).toPromise().then(r=>{return r.body as any});
	}

	copySubscription(orderId:string,orderItemId:string):Promise<any> {
		const p={storeId:this.storefrontUtils.commerceStoreId,
				 body:{	fromOrderId_1:orderId,
						copyOrderItemId_1:orderItemId,
						toOrderId:".**."
					  }
				};
		return this.cartSvc.copyOrder(p).toPromise().then(r=>{return r.body as any});
	}
}
