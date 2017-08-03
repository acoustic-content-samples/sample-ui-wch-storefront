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

@Component({
	selector: 'star-rating',
	styleUrls: ['./starRating.scss'],
	templateUrl: './starRating.html'
})
export class StarRatingComponent implements OnInit {
	@Input() rating: number;
	stars:string[] = [];

	ngOnInit () {
		console.log(`floor: ${Math.floor(this.rating)}`);
		console.log(`ceiling: ${Math.ceil(this.rating)}`);
		for (let i=1; i<=5; i++) {
			if (i <= Math.floor(this.rating)) {
				this.stars.push('fa-star');
			} else if (i === Math.ceil(this.rating)) {
				this.stars.push('fa-star-half-o');
			} else {
				this.stars.push('fa-star-o');
			}
		}
	}
}
