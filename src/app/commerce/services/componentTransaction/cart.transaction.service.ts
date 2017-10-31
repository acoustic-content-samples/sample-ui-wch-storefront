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

import 'rxjs/add/operator/toPromise';

import { CartService } from "../rest/transaction/cart.service";
import { ProductService } from "../product.service";
import { AssignedPromotionCodeService } from "../rest/transaction/assignedPromotionCode.service";
import { StorefrontUtils } from "../../../common/storefrontUtils.service";
import { AuthenticationTransactionService } from '../../../commerce/services/componentTransaction/authentication.transaction.service';

@Injectable()
export class CartTransactionService {
    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private storefrontUtils: StorefrontUtils,
        private assignedPromotionCode: AssignedPromotionCodeService,
        private authService: AuthenticationTransactionService
    ) { }

    getCart(): Promise<HttpResponse<any>> {
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

    preCheckout( param: any ): Promise<HttpResponse<any>> {
        return this.cartService.preCheckout( param, undefined ).toPromise();
    }

    checkout( parameters: any ): Promise<HttpResponse<any>> {
        return this.cartService.checkOut( parameters, undefined ).toPromise();
    }

    findProductByPartNumber( partNumber: string ): Promise<HttpResponse<any>> {
        return this.productService
            .findProductByPartNumber( partNumber, this.storefrontUtils.commerceStoreId, this.storefrontUtils.commerceCatalogId )
    }

    getProduct( partNumber: string ): Promise<any> {
        return this.productService.getProduct( partNumber );
    }

    findProductById( id: string ) {
        return this.productService.findProductsById( this.storefrontUtils.commerceStoreId, id );
    }

    applyPromotionCode ( promoCode : string) : Promise<HttpResponse<any>> {
        let param = {
            "storeId": this.storefrontUtils.commerceStoreId,
            "body": {
                "promoCode": promoCode
            }
        };
        return this.assignedPromotionCode.applyPromotioncode(param, undefined).toPromise();
    }

    removePromotionCode( promoCode: string ) : Promise<HttpResponse<any>>{
        let param = {
            "storeId": this.storefrontUtils.commerceStoreId,
            "promoCode": promoCode
        };
        return this.assignedPromotionCode.removePromotionCode(param, undefined).toPromise();
    }

    getPromotionCode() : Promise<HttpResponse<any>> {
        let param = {
            storeId: this.storefrontUtils.commerceStoreId
        }

        return this.assignedPromotionCode.getAssignedPromotioncodeInfo(param, undefined).toPromise();
    }

    updateOrderItem( cart: any ): Promise<HttpResponse<any>> {
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

        return this.cartService.addOrderItem( param, undefined ).toPromise();
    }

    addMutlipleToCart( quantities: number[], productIds: string[] ): Promise<any> {
        let param = {
            "storeId": this.storefrontUtils.commerceStoreId,
            "body": {
                "x_inventoryValidation": "true",
                "orderId": ".",
                "orderItem": [{}],
                "x_calculateOrder": "1",
            }
        };
        for (let i in productIds) {
            param.body.orderItem[i] = {
                "quantity": quantities[i].toString(),
                "productId": productIds[i]
            }
        }
        return this.cartService.addOrderItem( param, undefined ).toPromise();
    }

    copyOrder( fromOrderId: string): Promise<any> {
        let param = {
            "storeId": this.storefrontUtils.commerceStoreId,
            "body": {
                "fromOrderId_1": fromOrderId,
                "toOrderId": ".**.",
                "copyOrderItemId_1": "*"
            }
        };
        return this.cartService.copyOrder( param, undefined ).toPromise().then(r => this.getCart().then( rr=> this.updateOrderItem(rr.body)));
    }

    cancelOrder( orderId: string): Promise<any> {
        let param = {
            "storeId": this.storefrontUtils.commerceStoreId,
            "orderId": orderId
        };
        return this.cartService.cancelOrder( param, undefined ).toPromise();
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