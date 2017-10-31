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
import { Observable } from 'rxjs/Observable';

import { ProductViewService } from "./rest/search/productView.service";
import { StorefrontUtils } from "../../common/storefrontUtils.service";

@Injectable()
export class ProductService{
	constructor(private productViewService: ProductViewService,
        private storefrontUtils: StorefrontUtils) {
	}

	getProduct(id: string): Promise<any> {
		return this.findProductByPartNumber(id, this.storefrontUtils.commerceStoreId, this.storefrontUtils.commerceCatalogId);
	}

	findProductBySearchTerm(storeId: string, searchTerm: string): Promise<any[]>{
		return this.findProductBy(storeId, 'bySearchTerm', searchTerm);
	}

	private findProductBy(storeId: string, byType: string, byTerm: string): Promise<any[]> {
		let parameters = {
			pathParameters: {},
			'langId': '-1',
			'storeId': storeId,
		};
		switch (byType){
			case 'byCategory':
				parameters['categoryId'] = byTerm;
				return this.productViewService.findProductsByCategory(parameters)
					.toPromise()
					.then(response => response.body.catalogEntryView as any[]);
			case 'byId':
				parameters['productId'] = byTerm;
				return this.productViewService.findProductById(parameters)
					.toPromise()
					.then(response => response.body.catalogEntryView as any[]);
			default :
			//bySearchTerm
				parameters.pathParameters['searchTerm'] = byTerm;
				return this.productViewService.findProductsBySearchTerm(parameters)
					.toPromise()
					.then(response => response.body.catalogEntryView as any[]);
		}
	}

	findProductsByCategory(storeId: string, categoryId: string): Promise<any[]>{
		return this.findProductBy(storeId, 'byCategory', categoryId);
	}

	findProductsById(storeId: string, productId: string): Promise<any[]>{
		return this.findProductBy(storeId, 'byId', productId);
	}

	findProductByPartNumber(partNumber: string, storeId: string, catalogId: string): Promise<any>{
		let parameters = {
			'langId': '-1',
			'storeId': storeId,
			'partNumber': partNumber,
			'catalogid': catalogId
		};
		return this.productViewService.findProductByPartNumber(parameters).toPromise()
			.then( response => response.body.catalogEntryView[0] as any );
	}
}