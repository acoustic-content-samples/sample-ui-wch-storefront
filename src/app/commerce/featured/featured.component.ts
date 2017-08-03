/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommerceService } from '../services/commerce.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'featured',
    styleUrls: ['featured.scss'],
    templateUrl: 'featured.html'
})
export class FeaturedComponent implements OnInit, AfterViewInit {
    items: any[];
    private itemID: string;


    constructor(private commerceService: CommerceService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        //set default categories
        //this.commerceService.getItems(['@top'])
        //    .then((cat: any) => this.categories = cat);
    }

    ngAfterViewInit() {
        this.route.params.subscribe((params) => {
            this.itemID = params['id'];
            this.commerceService.getItems([this.itemID])
                .then((cat: any) => {
                    this.items = cat
                });
        });
    }


}
