/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { StorefrontUtils } from '../../../../common/storefrontUtils.service';

@Component({
	selector: 'reviews-list',
	styleUrls: ['./reviewsList.scss'],
	templateUrl: './reviewsList.html'
})
export class ReviewsListComponent implements OnInit {
	@Input() partNumber: string;
	
	private rows: number = 0
	private currentPageNumber: number = 0;
	private pages: any[] = [];

	constructor (private storefrontUtils: StorefrontUtils, private http: Http) {}

	ngOnInit () {}

	getReviews(page: number): Promise<JSON> {
		let apiCall = `${this.storefrontUtils.deliveryApiUrl}/search?q=type:%22Review%22&fl=document:%5Bjson%5D&rows=${this.rows}&start=${page * this.rows}`;
		return this.http.get(apiCall).toPromise().then(res => {
			return res.json();
		});
	}
}
