/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {Observer} from "rxjs/Observer";

import {CategoryService} from './category.service';
import {ProductService} from './product.service';
import { StorefrontUtils } from "../../common/storefrontUtils.service";


@Injectable()
export class CommerceService {

    private cachedPath: Map<string, any[]> = new Map();
    private selectionPath: string[];
    private cachedRoot: any[];
    private products: any[] = [];

    private DELIM = '-';
    private PATH_ITEM_DELIM = '_';

    //Observable for product changes
    private productSource = new Subject<any[]>();
    //Observable stream
    private products$ = this.productSource.asObservable();

    constructor(private categoryService: CategoryService,
                private productService: ProductService,
                private storefrontUtils: StorefrontUtils) {
    }

    private normalize(path: string): string {
        return path.split(' ').join(this.DELIM);
    }

    getItems(path: string[]): Promise<any> {
		const isTop = path ? false : true;
        path = path || ['@top']; //if nothing selecting use @top
        if (this.cachedRoot && !isTop) {
            return this.handleNonTop(path, this.cachedRoot);
        } else {
            return new Promise((resolve) => {
                this.categoryService.top(this.storefrontUtils.commerceStoreId, this.storefrontUtils.commerceCatalogId)
                    .then((cat) => {
                            this.cachedRoot = this.addURLToItems([], cat);
                            if (isTop) {
                                resolve(this.cachedRoot);
                            } else {
                                this.handleNonTop(path, this.cachedRoot)
                                    .then(res => resolve(res));
                            }
                        }
                    )
            });
        }


    }

    searchForProduct(term: string): Observable<any[]>{

        return Observable.create((observer: Observer<any>) => {
            this.productService.findProductBySearchTerm(this.storefrontUtils.commerceStoreId, term)
                .then((products) => {
                    this._updateProducts(this.addURLToItems(['product'], products));
                    observer.next(this.products);
                })
        });


        //return this.productService.findProductBySearchTerm(GenericCommerceService.defaultStoreID, term);
    }

    private handleNonTop(path: string[], items: any[]): Promise<any[]> {
        return new Promise((resolve) => {
            /*
             findCategory will recursively check the category tree so we only need the last element in the selection path
             */
            this.selectionPath = path ? path : [];
            const res = this.findCategory(this.selectionPath.slice(-1).pop(), items);
            //if an element has a catalogGroupView then is a category, otherwise its a product.
            if (res.catalogGroupView) {
                resolve(res.catalogGroupView);
            } else {
                this.initializeCategoryProducts(path, res)
                    .then(res => resolve(res));
            }
        });
    }

    findCategory( identifier: string, categories: any[] ): any | boolean {
        if ( identifier ) {
            identifier = identifier.split( '-' ).join( ' ' );
            for ( let cat of categories ) {
                cat.inPath = this.isInSelectionPath(cat);
                if ( cat.identifier == identifier ) {
                    return cat;
                }
                else if ( cat.catalogGroupView ) {
                    let returncat = this.findCategory( identifier, cat.catalogGroupView );
                    if ( returncat ) {
                        return returncat;
                    }
                }
            }
        }
        return false;
    }

    public isInSelectionPath(item: any): boolean {
        let itemID = this.normalize(item.identifier || item.partNumber);
        for(let x in this.selectionPath){
            if(this.selectionPath[x] === itemID) return true;
        }
        return false;
    }


    private addURLToItems(basePath: string[], items: any[]): any[] {
        items.forEach((item) => {
            if(item.partNumber){  //products have partnumbers
                item.url = basePath.concat([item.partNumber]);
            } else {
                item.url = basePath.concat([this.normalize(item.identifier)]);
            }
            if (item.catalogGroupView) {
                item.catalogGroupView = this.addURLToItems(basePath.concat([this.normalize(item.identifier)]), item.catalogGroupView);
            }
        });
        return items;
    }

    private initializeCategoryProducts(path: string[], category: any): Promise<any[]> {
        return new Promise((resolve) => {
            if (category) {
                let products = category.catalogEntryView;
                if (!products) {
                    this.productService.findProductsByCategory(this.storefrontUtils.commerceStoreId, category.uniqueID)
                        .then((products) => {
                            this._updateProducts(products);
                            resolve(this.addURLToItems(path, products));
                        });
                } else {
                    resolve(this.addURLToItems(path, products));
                }
            }
        });

    }

    getProducts(): Observable<any>{
        return Observable.create((observer: Observer<any>) => {
            this.products$.subscribe((products) => {
                observer.next(products);
            })
        });
    }

    private _updateProducts(products: any[]):void {
        this.products = products;
        this.productSource.next(this.products);
    }

}
