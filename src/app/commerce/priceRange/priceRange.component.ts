/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import {Component, OnInit, AfterViewInit} from '@angular/core';
import {CommerceService} from '../services/commerce.service';
import {FormBuilder, FormGroup} from "@angular/forms";

import {Router, ActivatedRoute} from '@angular/router';
import {MinPriceFilter} from "../util/MinPriceFilter";

import { FilterService } from '../util/FilterService';
import {MaxPriceFilter} from "../util/MaxPriceFilter";
import {ProductFilter} from "../util/ProductFilter";
import {ISubscription} from "rxjs/Subscription";


@Component({
	selector: 'wc-price-range',
	styleUrls: ['./priceRange.scss'],
	templateUrl: './priceRange.html'
})
export class PriceRangeComponent implements OnInit, AfterViewInit {
	priceRange: any = {};
	products: any[] = [];

	priceRangeForm: FormGroup;

	baseUrl: string;

	urlSub: ISubscription;
	paramsSub: ISubscription;
	productSub: ISubscription;

	globalParams: any = {};

	private minPriceKey = 'minPrice';
	private maxPriceKey = 'maxPrice';


	constructor(private commerceService: CommerceService,
				private fb: FormBuilder,
				private route: Router,
				private activeRoute: ActivatedRoute,
				private filterService: FilterService) {

		this.priceRangeForm = this.fb.group({
			min: '',
			max: '',
			submit: 'GO'

		});

	}

	ngOnInit(): void {


		/*
			Build the base URL, ideally this would be handled in a parent class
		 */
		this.urlSub = this.activeRoute.url.subscribe((url) => {
			let root = this.activeRoute.parent.routeConfig.path;
			this.baseUrl = root;
			let path = Object.keys(url);
			path.forEach((seg) => {
				this.baseUrl += `/${url[seg]}`;
			});
		});

		/*
		 Store the existing queryParams,  these will be merged later, ideally this would be handled in a parent class
		 */
		this.paramsSub = this.activeRoute.queryParams.subscribe(params => {
			this.globalParams = params;
			let range = {};
			if(params[this.minPriceKey]){
				range[this.minPriceKey] = params[this.minPriceKey];
			}
			if(params[this.maxPriceKey]){
				range[this.maxPriceKey] = params[this.maxPriceKey];
			}
			if(range){
				this.priceRange = range;
				this.setForm(range);
			}
		});

		//Observe any changes to the products from the CommerceService and pull the latest brands
		this.productSub = this.commerceService.getProducts().subscribe((products: any[]) => {
			this.products = products;
		});

		//adds a product filter for specific brands.
		this.filterService.addFilter(new MinPriceFilter(this.minPriceKey));
		this.filterService.addFilter(new MaxPriceFilter(this.maxPriceKey));

	}

	private setForm(priceRange: any) {
		this.priceRangeForm.patchValue(
			{
				min: priceRange.minPrice,
				max: priceRange.maxPrice
			});
	}


	ngAfterViewInit(): void {

	}

	isRangeSet(): boolean {
		return (this.priceRangeForm.get('min').value || this.priceRangeForm.get('max').value);
	}

	go() {
		let tempMap = new Map();
		let minVal = this.convertNum(this.priceRangeForm.get('min').value);
		let maxVal = this.convertNum(this.priceRangeForm.get('max').value);

		tempMap.set(this.minPriceKey, [minVal]);
		tempMap.set(this.maxPriceKey, [maxVal]);

		let url = this.filterService.getURLMergedParameters(this.baseUrl, this.globalParams, tempMap );
		this.route.navigateByUrl(url);
	}


	convertNum(price: any) {
		if(price.trim().length > 0 && !Number.isNaN(price)){
			return Number.parseFloat(price).toFixed(2);
		}
		return null;
	}


	clear() {
		this.priceRangeForm.reset({
			min: '',
			max: '',
			submit: 'GO'
		});
	}

	/*
	private getPriceRange(items: any[]): any{
		let minPrice: any;
		let maxPrice: any = 0;

		items.forEach((item) => {
			if(item.price) {
				item.price.forEach((priceItem: any) => {
					if (priceItem.usage === 'Display') { //I assume we want "Display" here and not "Offer"

						if (!minPrice) {
							minPrice = priceItem.value;
						}
						minPrice = Math.min(priceItem.value, minPrice);
						maxPrice = Math.max(priceItem.value, maxPrice);

					}
				})
			}
		});
		
		return {minPrice: minPrice, maxPrice: maxPrice};
	}
	*/

}
