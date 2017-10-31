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
import { ProductService } from "../../../commerce/services/product.service";
import { Subscription } from "rxjs/Subscription";
import { StorefrontUtils } from "../../../common/storefrontUtils.service";

@Component( {
    selector: 'item-summary',
    templateUrl: 'itemSummary.component.html',
    styleUrls: ['itemSummary.component.css']
} )
export class ItemSummaryComponent implements OnInit{

    @Input() itemId: string;
    item: any;
    constructor(
        private productService: ProductService,
        private storefrontUtils: StorefrontUtils,
        private route: ActivatedRoute ) { }

    ngOnInit(): void {
        this.initializeItem(this.itemId);
    }

    private initializeItem( itemId: string ): void {
        this.productService
           .findProductsById(this.storefrontUtils.commerceStoreId, itemId)
           .then( item => this.doInitialization( item ) );
    }

    private doInitialization( item: any ): void {
        if ( item ) {
            this.item = JSON.parse( JSON.stringify( item[0] ) );
        }
    }
}