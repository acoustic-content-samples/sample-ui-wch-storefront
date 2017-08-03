/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import {ProductFilter} from "./ProductFilter";
import {Params} from "@angular/router";
export class BrandsFilter implements ProductFilter {

    constructor(private name: string){}

    getFilterName(): string {
        return this.name;
    }

    doFilter(params: Params, items: any[]): any[] {
        return items.filter((item) => {
            if(!item.manufacturer) return true; //If its not a product keep it in the list
            let found = false;
            let brands = (Array.isArray(params[this.name]))? params[this.name]: [params[this.name]];
            brands.forEach((brand: any) => {
                if(brand === item.manufacturer) found = true;
            });
            return found;
        })
    }

}
