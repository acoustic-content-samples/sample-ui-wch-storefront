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
import { CheckoutTransactionService } from "../../commerce/services/componentTransaction/checkout.transaction.service";

@Component( {
    selector: 'checkout',
    styleUrls: ['./checkout.scss'],
    templateUrl: './checkout.html'
} )
export class CheckoutComponent implements OnInit {
    private _cart: any;
    private _checkout: any;

    constructor(
        private checkoutTransactionService: CheckoutTransactionService
    ) {}

    ngOnInit() {
        this.initializeCheckoutObject();
        this.initializeCart();
    }

    initializeCart() {
        this.checkoutTransactionService.getCart()
            .then( response => {
                this.cart = response.json();
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
