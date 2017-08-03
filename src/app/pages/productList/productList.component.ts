/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { CommerceService } from '../../commerce/services/commerce.service';
import { ActivatedRoute, Params } from '@angular/router';

import { ISubscription } from 'rxjs/Subscription';
import {ProductFilter} from "../../commerce/util/ProductFilter";

import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {Observer} from "rxjs/Observer";

import 'rxjs/Observer';
import {FilterService} from "../../commerce/util/FilterService";

@Component({
	selector: 'product-list',
	styleUrls: ['./productList.scss'],
	templateUrl: './productList.html'
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {
	allItems: any[];
	filteredItems: any[];
	searchSub: ISubscription;
	catSub: ISubscription;
	globalParams: Params;



	constructor(private commerceService: CommerceService,
				private route: ActivatedRoute,
                private filterService: FilterService,
                private change: ChangeDetectorRef) {
	}

	ngAfterViewInit(): void {
    }

	ngOnInit() {
        this.allItems = this.filteredItems = [];
		// categories are route parameters
		this.catSub = this.route.params.subscribe(params => {

			let path = [];
			if(params['category']) {
				path.push(params['category']);
			}
			if(params['subCategory']) {
				path.push(params['subCategory']);
			}
			if(params['id']) {
				path.push(params['id']);
			}
			if(path.length) {
				//console.log('productList getItems on %o', path);
				this.commerceService.getItems(path).then((cat: any) => {
                        this.setItems(cat, null);
				});
			}
		});

		// search terms are query parameters
		this.searchSub = this.route.queryParams.subscribe(params => {
			if(params['search']) {
				this.commerceService.searchForProduct(params['search']).subscribe((cat: any) => {
					    this.setItems(cat, params);
				});
			} else {
                this.globalParams = params;
                this.setItems(this.allItems, params);
            }
		});

	}



	private setItems(fromServer: any[], params: Params){
        if(!params){
            params = this.globalParams;
        }
        this.allItems = fromServer;
	    if(params){
            this.filteredItems = this.filterService.checkForFiltering(params, fromServer);
            this.change.detectChanges();
        } else {
            this.filteredItems = this.allItems;
        }

    }

	ngOnDestroy(){
	    this.catSub.unsubscribe();
	    this.searchSub.unsubscribe();
    }
}
