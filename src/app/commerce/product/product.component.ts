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
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../services/product.service";
import { Subscription } from "rxjs/Subscription";
import { StorefrontUtils } from "../../common/storefrontUtils.service";
//import { ShoppingCartService } from "../../../services/shopping-cart.service";
//import { GenericCatComponent } from "../../../component/generic-cat.component";

@Component( {
    selector: 'product-item',
    templateUrl: 'product.component.html',
    styleUrls: ['product.component.css']
} )
export class ProductComponent implements OnInit{
    //@Input() topCategories: any[];
    //@Input() category: any;

    invalidSKU: boolean;
    product: any;
    currentSelection: any;
    private partNumber: string;
    private sub: Subscription;
    private isProduct = true;
    constructor(
        private productService: ProductService,
        private storefrontUtils: StorefrontUtils,
        //private shoppingCartService: ShoppingCartService,
        private route: ActivatedRoute ) { }

    ngOnInit(): void {
        this.currentSelection = {};
        this.sub = this.route.params.subscribe( params => this.initializeProduct( params['name'] ) );
    }

    isSelected( aIdentifier: string, vIdentifier: any ): Boolean {
        return ( this.currentSelection.selectedAttributes[aIdentifier] === vIdentifier ) ? true : false;
    }

    onAttributeChange(): void {
        this.invalidSKU = !this.resolveSKU();
    }

    onSubmit(){
        let params = {
            inventoryValidation: true,
            calculateOrder: 0,
            catEntryId: this.currentSelection.sku.uniqueID,
            quantity: this.currentSelection.quantity
        };
        //this.shoppingCartService.addOrderItem("1", params);
    }

    private resolveSKU(): boolean {
        for ( let sku of this.product.sKUs ) {
            let values = sku.attributes.reduce( function ( value: any, a: any ) {
                value[a.identifier] = a.values[0].identifier;
                return value;
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

    private initializeProduct( partNumber: string ): void {
        if ( partNumber !== this.partNumber ) {
            if ( this.sub ) {
                this.sub.unsubscribe();
            }
            this.productService
                .findProductByPartNumber( partNumber, this.storefrontUtils.commerceStoreId, this.storefrontUtils.commerceCatalogId)
                .then( prod => this.doInitialization( prod ) );
            this.partNumber = partNumber;
        }
    }

    private doInitialization( product: any ): void {
        if ( product ) {
            this.product = JSON.parse( JSON.stringify( product ) );
            this.product.availableAttributes = JSON.parse(JSON.stringify(product.attributes));
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
        this.invalidSKU = !this.resolveSKU();
    }

}