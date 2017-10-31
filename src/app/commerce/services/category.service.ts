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

import { CategoryViewService } from "./rest/search/categoryView.service";

@Injectable()
export class CategoryService {
    private depthAndLimit = "11,11";
    private topPromise: Promise<any>;
    constructor( private categoryViewService: CategoryViewService ) {
    }

    top( storeId: string, catalogId: string ): Promise<any[]> {
        if(this.topPromise){
            return this.topPromise;
        } else {
            let parameters = {
                'langId': '-1',
                'storeId': storeId,
                'depthAndLimit': this.depthAndLimit
            };
            this.topPromise = this.categoryViewService.findTopCategories(parameters).toPromise()

                .then((response) => {
                    return response.body.catalogGroupView as any[];
                });

            return this.topPromise;
        }
    };

}