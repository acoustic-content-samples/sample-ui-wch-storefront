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
import { CartTransactionService } from "../../commerce/services/componentTransaction/cart.transaction.service";
import { AuthenticationTransactionService } from '../../commerce/services/componentTransaction/authentication.transaction.service';

@Component( {
	selector: 'cart',
	styleUrls: ['./cart.scss'],
	templateUrl: './cart.html'
} )
export class CartComponent implements OnInit {
	isLoggedIn: boolean = false;
	private _cart: any;
	
	constructor(
		private cartTransactionService: CartTransactionService,
		private authService: AuthenticationTransactionService
	) { }

	set cart( cart: any ) {
		if ( !this._cart ) {
			this._cart = cart;
		}
		else {
			this._cart = { ...this._cart, ...cart };
		}
		this.cartTransactionService.normalizeCart(this._cart);
	}

	get cart(): any {
		return this._cart;
	}

	public initializeCart() {
		this.cartTransactionService.getCart()
			.then(
			response => {
				this.cart = response.body
			}
			);
	}

	private increaseQuantity( item: any ) {
		let q = parseInt( item.quantity );
		item.quantity = ( ++q ).toString();
		this.cartTransactionService //update to server
			.updateOrderItem( this.cart )
			.then( response => this.initializeCart() );
	}

	private decreaseQuantity( item: any ) {
		let q = parseInt( item.quantity );
		if ( q && q > 1 ) {
			item.quantity = ( --q ).toString();
			this.cartTransactionService //update to server
				.updateOrderItem( this.cart )
				.then( response => this.initializeCart() );
		}
	}

	ngOnInit() {
		this.initializeCart();
		this.isLoggedIn = this.authService.isLoggedIn();
	}

}
