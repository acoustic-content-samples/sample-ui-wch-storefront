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
		attributes: [{values:[{}]}]
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
		private route: ActivatedRoute
	) {}

	ngOnInit () {
		this.route.params.subscribe(params => {
			this.cartTransactionService.getProduct(params.id).then(product => {
				console.log(product);
				this.initializeProduct(product);
			});
		});
	}

	onAttributeChange(): void {
        this.invalidSKU = !this.resolveSKU();
    }

	onSubmit() {
        this.cartTransactionService
			.addToCart(this.currentSelection.quantity, this.currentSelection.sku.uniqueID)
			.then(res=>alert(res));

    }

	private initializeProduct(product: any){
		if ( product ) {
            this.product = JSON.parse( JSON.stringify( product ) );
            this.product.availableAttributes = JSON.parse( JSON.stringify( product.attributes ) );
            this.currentSelection.sku = this.product.sKUs[0];
            this.currentSelection.quantity = 1;
            this.initializeSelectedAttributes();
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
}
