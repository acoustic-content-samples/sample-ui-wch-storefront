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
import { ResponseOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CartService } from "../rest/transaction/cart.service";
import { ProductService } from "../product.service";
import { GuestIdentityService } from "../rest/transaction/guestIdentity.service";
import { StorefrontUtils } from "../../../common/storefrontUtils.service";

@Injectable()
export class CartTransactionService {
    guestLoggedin: boolean = false;
    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private guestIdentityService: GuestIdentityService,
        private storefrontUtils: StorefrontUtils
    ) { }

    getCart(): Promise<Response> {
        let parameters = {
            "sortOrderItemBy": "orderItemID",
            "storeId": this.storefrontUtils.commerceStoreId
        };
        return this.cartService.getCart( parameters, undefined ).toPromise();
    }

    normalizeCart( cart: any ) {
        let items = cart.orderItem;
        for ( let item of items ) {
            if ( !item.catalogEntry ) {
                //save parent product to catalogEntry
                this.findProductByPartNumber( item.partNumber )
                    .then( catEnt => this.updateItem( item, catEnt ) );
            }
        }
    }

    preCheckout( param: any ): Promise<Response> {
        return this.cartService.preCheckout( param, undefined ).toPromise();
    }

    checkout( parameters: any ): Promise<Response> {
        return this.cartService.checkOut( parameters, undefined ).toPromise();
    }

    findProductByPartNumber( partNumber: string ): Promise<Response> {
        return this.productService
            .findProductByPartNumber( partNumber, this.storefrontUtils.commerceStoreId, this.storefrontUtils.commerceCatalogId )
    }

    getProduct( partNumber: string ): Promise<any> {
        return this.productService.getProduct( partNumber );
    }

    findProductById( id: string ) {
        return this.productService.findProductsById( this.storefrontUtils.commerceStoreId, id );
    }

    updateOrderItem( cart: any ): Promise<Response> {
        let param = {
            storeId: this.storefrontUtils.commerceStoreId
        };
        let body: any = {
            "orderId": ".",
            "x_calculationUsage": "-1,-2,-5,-6,-7",
            "x_calculateOrder": "1",
            "x_inventoryValidation": "true",
            "orderItem": []
        };
        let orderItemParams = [
            "comment",
            "productId",
            "quantity",
            "orderItemId",
            "contractId",
            "partNumber"
        ];
        body.orderItem = cart.orderItem.map(
            function ( item: any ) {
                let r = {};
                for ( let k in item ) {
                    if ( orderItemParams.indexOf( k ) > -1 ) {
                        r[k] = item[k].toString();
                    }
                }
                return r;
            }
        );
        param['body'] = body;
        return this.cartService.updateOrderItem( param, undefined ).toPromise();
    }

    addToCart( quantity: number, productId: string ): Promise<any> {
        let param = {
            "storeId": this.storefrontUtils.commerceStoreId,
            "body": {
                "x_inventoryValidation": "true",
                "orderId": ".",
                "orderItem": [{
                    "quantity": quantity.toString(),
                    "productId": productId
                }],
                "x_calculateOrder": "1",
            }
        };
        return this.guestLogin()
            .then(
            response => {
                return this.cartService.addOrderItem( param, undefined ).toPromise();
            }
            );
    }



    guestLogin(): Promise<Response> {
        this.guestLoggedin = true;
        let options = new ResponseOptions({
            body: '{"guestLoggedin": “true”}'
        });
        if ( this.guestLoggedin ) {
           return new Promise(( resolve ) => { resolve( new Response(options)) } );
        }
        else {
            let guestParam = {
                storeId: this.storefrontUtils.commerceStoreId,
                $queryParameters: {
                    updateCookies: true,
                }
            }
            return this.guestIdentityService.login( guestParam, undefined, undefined )
                .toPromise().then( response => {
                    this.guestLoggedin = true;
                    return response;
                } );
        }
    }

    private updateItem( item: any, catEnt: any ) {
        //get parent prodcut using cat SKU's parentCatalogEntryID
        //so that we create a link back to product (not the sku)
        this.findProductById( catEnt.parentCatalogEntryID )
            .then( response => {
                catEnt['parentCatalogEntyPartnumber'] = response[0].partNumber;
                item.catalogEntry = catEnt;
            } );
    }

}