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
import { HttpResponse } from "@angular/common/http";

import { CartTransactionService } from "./cart.transaction.service";
import { PaymentInstructionService } from "../rest/transaction/paymentInstruction.service";
import { ShippingInfoService } from "../rest/transaction/shippingInfo.service";
import { PersonContactService } from "../rest/transaction/personContact.service";
import { StorefrontUtils } from "../../../common/storefrontUtils.service";

@Injectable()
export class CheckoutTransactionService {
    constructor(
        private paymentInstructionService: PaymentInstructionService,
        private shippingInfoService: ShippingInfoService,
        private personContactService: PersonContactService,
        private cartTransactionService: CartTransactionService,
        private storefrontUtils: StorefrontUtils
    ) { }

    getCart(): Promise<HttpResponse<any>> {
        return this.cartTransactionService.getCart();
    }

    normalizeCart(cart: any){
        this.cartTransactionService.normalizeCart(cart);
    }

    prepareOrderWithAddressAndShipping( checkout: any, piamount: number ): Promise<any> {
        let amount = piamount;
        return this.addAddressForPerson( checkout )
            .then( response => this.updateShippingInfo( checkout, response.body ))
            .then( response => this.addPaymentInstruction( checkout, amount, response.body ))
            .then( response => this.prepareOrder() );
    }

    prepareOrderWithShipping(checkout : any, piamount: number, address : any): Promise<any>{
        let amount = piamount;
        return this.updateShippingInfo( checkout, address ) 
            .then( response => this.addPaymentInstruction( checkout, amount, response.body ))
            .then( response => this.prepareOrder() );
    }

    updateShippingInfo( checkout: any, address: any ): Promise<any> {
        checkout.address.addressId = address.addressId;
        return this.udpateOrderShippingInfo( checkout );
    }

    addAddressForPerson( checkout: any ): Promise<any> {
        checkout.address.addressType = 'ShippingAndBilling';
        let param = {
            storeId: this.storefrontUtils.commerceStoreId,
            body: JSON.parse( JSON.stringify( checkout.address ) )
        };
        return this.personContactService.addPersonContact( param, undefined ).toPromise();
    }

    udpateOrderShippingInfo( checkout: any ): Promise<any> {
        let param = {
            body: {
                "x_calculationUsage": "-1,-2,-3,-4,-5,-6,-7",
                "orderId": ".",
                "addressId": checkout.address.addressId,
                "x_calculateOrder": "1",
                "x_allocate": "***",
                "x_backorder": "***",
                "x_remerge": "***",
                "x_check": "*n"
            },
            storeId: this.storefrontUtils.commerceStoreId
        }
        return this.shippingInfoService.updateOrderShippingInfo( param, undefined ).toPromise();
    }

    addPaymentInstruction( checkout: any, amount: number, order : any ): Promise<any> {
        let param = {
            body: {
                "orderId": order.orderId,
                "piAmount": amount.toString(),
                "billing_address_id": checkout.address.addressId,
                "payMethodId": "COD"
            },
            storeId: this.storefrontUtils.commerceStoreId
        };
        //hard coded to cash on delivery
        return this.paymentInstructionService.addPaymentInstruction( param, undefined ).toPromise();
    }

    prepareOrder(): Promise<any> {
        let param = {
            'body': {
                "orderId": ".",
            },
            storeId: this.storefrontUtils.commerceStoreId
        };
        return this.cartTransactionService.preCheckout( param );
    }

    submitOrder(): Promise<any> {
        let param = {
            'body': {
                "orderId": ".",
            },
            storeId: this.storefrontUtils.commerceStoreId
        };
        return this.cartTransactionService.checkout( param );
    }

}