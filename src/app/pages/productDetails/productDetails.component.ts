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
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Logger } from "angular2-logger/core";
import { CartTransactionService } from "../../commerce/services/componentTransaction/cart.transaction.service";

@Component({
	selector: 'product-details',
	styleUrls: ['./productDetails.scss'],
	templateUrl: './productDetails.html'
})
export class ProductDetailsComponent implements OnInit {
	invalidSKU: boolean;
	product: any = {
		price: [{}],
		attributes: [{values:[{}]}],
		fullImage: ""
	};
	currentSelection: any = {
		sku: {
			fullImage: ""
		},
		quantity: 1,
		selectedAttributes: {}
	};

	constructor(
		private cartTransactionService: CartTransactionService,
		private route: ActivatedRoute,
		private logger: Logger
	) {}

	ngOnInit () {
		this.route.params.subscribe(params => {
			this.cartTransactionService.getProduct(params.id).then(product => {
				this.logger.info( this.constructor.name + " getProduct: %o", product );
				this.initializeProduct(product);
			});
		});
	}

	onAttributeChange(): void {
        this.invalidSKU = !this.resolveSKU();
    }

	onSubmit() {
        this.cartTransactionService.addToCart(this.currentSelection.quantity, this.currentSelection.sku.uniqueID).then(res => {
			this.logger.info( this.constructor.name + " addToCart: %o", res );
		}).catch( error => {
            alert(this._parseErrorMsg(error, "Could not add the product to cart"))
        })
    }

	private initializeProduct(product: any){
		if ( product ) {
			this.product = JSON.parse( JSON.stringify( product ) );
			if ( product.attributes ) {
				this.product.availableAttributes = JSON.parse( JSON.stringify( product.attributes ) );
			}
			// Product
			if (this.product.sKUs && this.product.sKUs.length > 0) {
				this.currentSelection.sku = this.product.sKUs[0];
				this.initializeSelectedAttributes();
			}
			else {
				this.currentSelection.sku = this.product;
				this.currentSelection.selectedAttributes = {};
				if (this.currentSelection.sku.attributes) {
					for ( let att of this.currentSelection.sku.attributes ) {
						this.currentSelection.selectedAttributes[att.identifier] = att.values[0].identifier;
					}
				}
			}
            this.currentSelection.quantity = 1;
        }
	}

	 private initializeSelectedAttributes(): void {
        this.currentSelection.selectedAttributes = {};
        for ( let att of this.currentSelection.sku.attributes ) {
            this.currentSelection.selectedAttributes[att.identifier] = att.values[0].identifier;
        }
		//The initialzed SKU should always valid;
		//this.invalidSKU = false;
        this.invalidSKU = !this.resolveSKU();
    }

	 private resolveSKU(): boolean {
        for ( let sku of this.product.sKUs ) {
			//retrieve all attribute identifers
            let values = sku.attributes.reduce( (val: any, a: any) => {
                val[a.identifier] = a.values[0].identifier;
                return val;
            }, {} );
            let match = true;
            for ( let key in this.currentSelection.selectedAttributes ) {
                match = match && this.currentSelection.selectedAttributes[key] === values[key];
            }
            if ( match ) {
				this.currentSelection.sku = sku;
                return true;
            }
        }
        return false;
    }

	private _parseErrorMsg(error:HttpErrorResponse,fallback:string): string {
		const eBody=error.error,
		      rc=eBody.errors&&eBody.errors.length&&eBody.errors[0].errorMessage?eBody.errors[0].errorMessage:fallback;
		return rc;
	}
}
