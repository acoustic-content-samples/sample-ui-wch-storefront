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
import { ActivatedRoute, Params } from '@angular/router';

import { CartTransactionService } from "../../commerce/services/componentTransaction/cart.transaction.service";

@Component({
	selector: 'bundle-components',
	styleUrls: ['./bundleComponents.scss'],
	templateUrl: './bundleComponents.html'
})
export class BundleComponentsComponent implements OnInit {
	invalidSKUs: boolean[] = [];
	@Input() products: any[] = [{
		price: [{}],
		attributes: [{values:[{}]}],
		fullImage: ""
	}];
	currentSelections: any[] = [{
		sku: {
			fullImage: ""
		},
		quantity: 1,
		selectedAttributes: {}
	}];

	constructor(
		private cartTransactionService: CartTransactionService,
		private route: ActivatedRoute
	) {}

	ngOnInit () {
		this.initializeProducts(this.products);
	}

	onAttributeChange(i: any): void {
        this.invalidSKUs[i] = !this.resolveSKU(i);
    }

	onSubmit() {
		let productIds: string[] = [];
		let quantities: number[] = [];
		for (let i in this.currentSelections) {
			productIds[i] = this.currentSelections[i].sku.uniqueID;
			quantities[i] = this.currentSelections[i].quantity;
		}
        this.cartTransactionService
			.addMutlipleToCart(quantities, productIds)
			.then(res=>alert(res));
    }

	isSKUsValid(): boolean {
		for (let invalidSKU of this.invalidSKUs) {
			if (invalidSKU) {
				return false;
			}
		}
		return true;
	}

	isQuantityValid(): boolean {
		for (let currentSelection of this.currentSelections) {
			if (currentSelection.quantity < 1) {
				return false;
			}
		}
		return true;
	}

	private initializeProducts(products: any[]){
		if ( products ) {
			for (let i in products) {
				this.products[i]  = JSON.parse( JSON.stringify( products[i] ));
				if ( products[i].attributes ) {
					this.products[i].availableAttributes = JSON.parse( JSON.stringify( products[i].attributes ) );
				}
				this.currentSelections[i] = {
					sku: {
						fullImage: ""
					},
					quantity: 1,
					selectedAttributes: {}
				};
				// Product
				if (this.products[i].sKUs && this.products[i].sKUs.length > 0) {
					this.currentSelections[i].sku = this.products[i].sKUs[0];
					this.initializeSelectedAttributes(i);
				}
				else {
					this.currentSelections[i].sku = this.products[i];
					this.currentSelections[i].selectedAttributes = {};
					if (this.currentSelections[i].sku.attributes) {
						for ( let att of this.currentSelections[i].sku.attributes ) {
							this.currentSelections[i].selectedAttributes[att.identifier] = att.values[0].identifier;
						}
					}
				}
				this.currentSelections[i].quantity = 1;
			}
        }
	}

	 private initializeSelectedAttributes(i: any): void {
        this.currentSelections[i].selectedAttributes = {};
        for ( let att of this.currentSelections[i].sku.attributes ) {
            this.currentSelections[i].selectedAttributes[att.identifier] = att.values[0].identifier;
        }
		//The initialzed SKU should always valid;
		//this.invalidSKU = false;
        this.invalidSKUs[i] = !this.resolveSKU(i);
    }

	 private resolveSKU(i: any): boolean {
        for ( let sku of this.products[i].sKUs ) {
			//retrieve all attribute identifers
            let values = sku.attributes.reduce( (val: any, a: any) => {
                val[a.identifier] = a.values[0].identifier;
                return val;
            }, {} );
            let match = true;
            for ( let key in this.currentSelections[i].selectedAttributes ) {
                match = match && this.currentSelections[i].selectedAttributes[key] === values[key];
            }
            if ( match ) {
				this.currentSelections[i].sku = sku;
                return true;
            }
        }
        return false;
	}

}
