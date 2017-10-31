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
import { GuestShippingBillingComponent } from '../../commerce/guestShippingBilling/guestShippingBilling.component';
import { AuthenticationTransactionService } from '../../commerce/services/componentTransaction/authentication.transaction.service';
import { CheckoutTransactionService } from "../../commerce/services/componentTransaction/checkout.transaction.service";

@Component( {
    selector: 'checkout',
    styleUrls: ['./checkout.scss'],
    templateUrl: './checkout.html'
} )
export class CheckoutComponent implements OnInit {
    private _cart: any;
    private _checkout: any;

    isGuest : boolean;
    currentPage : string;

    constructor(
        private checkoutTransactionService: CheckoutTransactionService,
        private authenticationTransactionService : AuthenticationTransactionService,
        private route: Router
    ) {}

    ngOnInit() {
        this.initializeCheckoutObject();
        this.initializeCart();
        this.isGuest = !this.authenticationTransactionService.isLoggedIn();
    }

    initializeCart() {
        this.checkoutTransactionService.getCart()
            .then( response => {
                this.cart = response.body;
            } );
    }

    initializeCheckoutObject() {
        let checkout: any = {
            'isGuestCheckout': false,
            'step': 1,
            'address': {
                country: "Canada",
                state: "Ontario",
                addressLine: []
            }
        }
        this.checkout = checkout;
    }

    set checkout( checkout: any ) {
        this._checkout = checkout;
    }
    get checkout(): any {
        return this._checkout;
    }

    set cart( cart: any ) {
        this.checkoutTransactionService.normalizeCart( cart );
        this._cart = cart;
    }

    get cart(): any {
        return this._cart;
    }

    getShippingAddressAndId(addressList : any){
        let address, addressId;
        if (addressList.length && addressList[1] && addressList[1].useSameAddress){
            this.checkout.address = addressList[0].data;
            return addressList[0].response;
        } 
        this.checkout.address = addressList[1].data;
        return addressList[1].response;
    }

    onSaveGuestAddress(event : any) {
        let addressId = this.getShippingAddressAndId(event);
        this.checkoutTransactionService.prepareOrderWithShipping(this.checkout, this.cart.grandTotal, addressId)
        .then(response =>  this.checkout.step++ );
    }

    next() {
        if ( this.checkout.step == 1 ) {
            this.checkoutTransactionService.prepareOrderWithAddressAndShipping( this.checkout, this.cart.grandTotal )
                .then( response => this.checkout.step++ );
        }
        else {
            this.checkoutTransactionService.submitOrder()
                .then( response => this.checkout.step++ );
        }
    }
    back() {
        if ( this.canBack() ) {
            this.checkout.step--;
        }
    }
    canBack(): boolean {
        return this.checkout.step > 1;
    }

}
