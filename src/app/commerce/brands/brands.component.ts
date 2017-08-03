/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommerceService } from '../services/commerce.service';
import { ISubscription } from 'rxjs/Subscription';
import {FilterService} from "../util/FilterService";
import {ProductFilter} from "../util/ProductFilter";
import {BrandsFilter} from "../util/BrandsFilter";


@Component({
	selector: 'wc-brands',
	styleUrls: ['./brands.scss'],
	templateUrl: './brands.html'
})
export class BrandsComponent implements OnInit, OnDestroy {
    private paramSub: ISubscription;
    private productSub: ISubscription;
    private urlSub: ISubscription;
    private filterSub: ISubscription;

	private filterParamName: string = 'brand';

    private brands: any[] = [];
    private selectectBrands: string[] = [];
    private allBrandsMap: Map<string, number> = new Map();

	//needed to build navigation URLs while maintaining existing parameters
    baseUrl: string = '';
    globalParams: any = {};

    constructor(private commerceService: CommerceService,
				private route: Router,
                private activeRoute: ActivatedRoute,
                private filterService: FilterService){


    }

    ngOnInit(): void {
        //adds a product filter for specific brands.
        this.filterService.addFilter(new BrandsFilter(this.filterParamName));

		this.setupSubscriptions();
    }

    private setupSubscriptions(){
		//Observe any changes to the products from the CommerceService and pull the latest brands
		this.productSub = this.commerceService.getProducts().subscribe((products: any[]) => {
			this.allBrandsMap = this.getBrands(products);
			this.setBrands(this.allBrandsMap);
		});

		this.filterSub = this.filterService.watchForFitler().subscribe((result) => {
			if(result) {
				this.updateBrandCount(result.items);
			}
		});

		this.urlSub = this.activeRoute.url.subscribe((url) => {
			let root = this.activeRoute.parent.routeConfig.path;
			this.baseUrl = root;
			let path = Object.keys(url);
			path.forEach((seg) => {
				this.baseUrl += `/${url[seg]}`;
			});
		});


		this.paramSub = this.activeRoute.queryParams.subscribe(params => {
			this.globalParams = params;
			if(params[this.filterParamName]) {
				this.selectectBrands = (Array.isArray(params[this.filterParamName]))? params[this.filterParamName]: [params[this.filterParamName]];
			}
		});
	}

	private getBrands(products: any[]): Map<string, number> {
		const temp = new Map<string, number>();
		products.forEach((item) => {
			let brandCount: number = temp.get(item.manufacturer) || 0;
			temp.set(item.manufacturer, ++brandCount);
		});
		return temp;
	}

	private setBrands(products: Map<string, number>){
		products.forEach((value, key) => {
			this.brands.push({brand: key, count: value});
		});

		this.brands.sort((a, b) => {
			return (a.brand < b.brand)? -1: 1;
			//no need to worry about the values being equal
		});
	}


	private updateBrandCount(filteredProducts: any[]) {
    	this.brands = [];
    	let tempBrandMap = this.getBrands(filteredProducts);
    	this.allBrandsMap.forEach((value, key) => {
    		if(tempBrandMap.get(key)){
    			this.allBrandsMap.set(key, tempBrandMap.get(key));
			} else {
    			this.allBrandsMap.set(key, 0);
			}
		});

		this.setBrands(this.allBrandsMap);
	}



	ngOnDestroy(): void {
        this.paramSub.unsubscribe();
        this.urlSub.unsubscribe();
        this.filterSub.unsubscribe();
        this.productSub.unsubscribe();

    }

    addBrand(event: any, brand: string){
        if(event.currentTarget.checked){
            this.selectectBrands.push(brand);
        } else {
            const pos = this.selectectBrands.indexOf(brand);
            this.selectectBrands.splice(pos, 1);
        }

		let url = this.filterService.getURLMergedParameters(this.baseUrl, this.globalParams, new Map().set(this.filterParamName, this.selectectBrands));
		this.route.navigateByUrl(url);

    }

    isSelected(brand: string){
        return this.selectectBrands.indexOf(brand) > -1;
    }
}
