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
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StorefrontUtils } from "../../../../common/storefrontUtils.service";

@Injectable()
export class SearchService {
    private requestOptions: RequestOptionsArgs;
    constructor( private http: Http, private storefrontUtils: StorefrontUtils ) {
    }
    protected handleError( error: Response ): Observable<Response> {

            return Observable.throw( error );
    }

    protected invokeService( options: RequestOptionsArgs ): Observable<Response> {
        this.requestOptions = options;
        options.withCredentials = true;
        return this.http.request( options.url, options )
            .catch( res => this.handleError( res ) );
    }

    protected getRequestUrl(){
        let commerceSearchSecurePort = this.storefrontUtils.commerceSearchSecurePort === "443"? "" : ":" + this.storefrontUtils.commerceSearchSecurePort;
        return `https://${this.storefrontUtils.commerceSearchDomainName}${commerceSearchSecurePort}${this.storefrontUtils.commerceSearchContextPath}`;
    }
}