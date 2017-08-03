/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { StorefrontUtils } from '../../../common/storefrontUtils.service';

@Component({
	selector: 'blog-list',
	styleUrls: ['./blogList.scss'],
	templateUrl: './blogList.html'
})
export class BlogListComponent implements OnInit {
	private rows = 10;
	private currentPageNumber: number = 0;
	private pages: any[] = [];

	constructor (private http: Http, private storefrontUtils: StorefrontUtils) {}

	ngOnInit () {
		this.getBlogPosts(this.currentPageNumber).then(posts => {
			let numOfPages = Math.ceil(posts.numFound/this.rows);
			this.pages = new Array(numOfPages);

			this.pages[this.currentPageNumber] = posts.documents;

		});
	}

	isCurrentPage (page: number): boolean {
		return page === this.currentPageNumber;
	}

	goToPage(page: number) {
		this.currentPageNumber = page;
		this.getBlogPosts(page).then(posts => {
			this.pages[this.currentPageNumber] = posts.documents;
		});
	}

	getBlogPosts(page: number) {
		const
			tenantId = this.storefrontUtils.tenant,
			url = this.storefrontUtils.baseUrl;

		let apiCall: string = `${url}/api/${tenantId}/delivery/v1/search?q=type:%22Blog-Post%22&fl=document:%5Bjson%5D&rows=${this.rows}&start=${page * this.rows}`;
		return this.http.get(apiCall).toPromise().then(res => {
			return res.json();
		});
	}
}
