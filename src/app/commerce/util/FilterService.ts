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
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import "rxjs/add/operator/toPromise";
import {Params} from "@angular/router";
import {ProductFilter} from "./ProductFilter";
import 'rxjs/Observer';
import {Subject, Observer} from "rxjs";
import {filter} from "rxjs/operator/filter";


@Injectable()
export class FilterService {
    //Observable for product changes
    private filtersSource = new Subject<any>();
    //Observable stream
    private filters$ = this.filtersSource.asObservable();
    private _filters: Map<string, ProductFilter> = new Map();

    private filteredItems: any[] = [];

    addFilter(filter: ProductFilter) {
        this._filters.set(filter.getFilterName(), filter);
    }


    /*

     */
    watchForFitler(): Observable<{filter: ProductFilter, items: any[]}> {
        return Observable.create((observer: Observer<any>) => {
            this.filters$.subscribe(({filter, items}) => {
                observer.next({filter: filter, items: this.filteredItems});
            })
        });
    }

    /*
    Call this from the routing to process all the registered filters
     */
    public checkForFiltering(params: Params, filteredItems: any[]){
        let temp = filteredItems;
        this._filters.forEach((filter) => {
                if(params[filter.getFilterName()]) {
                    temp = filter.doFilter(params, temp);

                }
                this.filteredItems = temp;
                this.fireFilter(filter, temp);
        });
        return temp;

    }

    private fireFilter(filter: ProductFilter, items: any[]){
        this.filtersSource.next({filter: filter, items: items});
    }

    /*

    Used the handle the router limitation of removing array params.

     */
	getURLMergedParameters(baseUrl: string, originalParamValues: any, newParams: Map<string, string[]>): string{

		let queryString = '';

		if(originalParamValues){
			let existingParam = Object.keys(originalParamValues);
			existingParam.forEach((param) => {
				//replace all params that match the name with new params.
				let values = newParams.get(param);
				if(values) {
					let tempVal = values.shift();
					if (tempVal) {
						queryString += `&${param}=${tempVal}`;
					}
					newParams.set(param, values);

				} else {
					queryString += `&${param}=${originalParamValues[param]}`;
				}
			})
		}

		 //get any remaining parameters
		newParams.forEach((value, key) => {
			value.forEach((val) => {
				if(val) {
					queryString += `&${key}=${val}`;
				}
			});

		});

		queryString = (queryString.length > 0)? queryString.replace(/&/, '?') : '';
		return (baseUrl + queryString);
	}


}