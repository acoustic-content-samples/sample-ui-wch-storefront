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
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { StorefrontUtils } from '../../common/storefrontUtils.service';
import {Observable, Observer} from "rxjs";

const HandleBars = require('handlebars');


@Injectable()
export class StaticTemplateService {
    private templateDir = 'templates';


    constructor(private http: Http, private storefrontUtils: StorefrontUtils){}

    getTemplate(path: string): Promise<string> {
        const templateUrl = `${this.storefrontUtils.staticUrl}/${this.templateDir}/${path}.handlebars`;


        return this.http.get(templateUrl)
            .toPromise()
            .then(response => response.text())
            .catch((error: any) => {
                console.error('An error occured getting the template', error);
                return Promise.reject(error.message || error);
            });
    }

    getContentByName(name: string): Promise<any> {

		let apiCall: string = `${this.storefrontUtils.deliveryApiUrl}/search?q=name:%22${name}%22&fl=document:%5Bjson%5D`;
		return this.http.get(apiCall).toPromise().then(res => {
			return res.json();
		});
	}

	getCompiledTemplate(templateName: string, contentName: string){
    	/*
    		Should be changed to take advantage of prerendered content when available.
    	 */
    	return Observable.create((observer: Observer<any>) => {
			this.getContentByName(contentName)
				.then((document) => {
					if(document && document.numFound > 0) {
						this.getTemplate(templateName)
							.then((template) => {
								const temp = HandleBars.compile(template);
								observer.next({markup: temp(document.documents[0].document)});
							})
					} else {
						observer.next({markup: ''});
					}
				})
		});
	}

}