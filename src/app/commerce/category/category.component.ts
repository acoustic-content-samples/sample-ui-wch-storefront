/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommerceService } from '../services/commerce.service';
import {Router, NavigationEnd} from '@angular/router';

import 'rxjs/add/operator/filter';
import { ISubscription } from 'rxjs/Subscription';


@Component({
	selector: 'wc-category',
	styleUrls: ['category.scss'],
	templateUrl: 'category.html'
})
export class CategoryComponent implements OnInit{
    categories: any[] = [];
    private subscription: ISubscription;

    //@Input() parentCategory: string;
    constructor(private commerceService: CommerceService,
    private route: Router) {

    }

    ngOnInit() {
        this.commerceService.getItems(null)
                .then((cat: any) => {
                    this.categories = cat;
                }).catch((error: any) => {
					console.error('Error getting categories: %o', error);
                });
    }

}
