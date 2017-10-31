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
import { StorefrontUtils } from "../../../../common/storefrontUtils.service";
import { HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Logger } from "angular2-logger/core";

@Injectable()
export class SearchService {
    private serviceCounter: number = 0;

    constructor( private http: HttpClient, private storefrontUtils: StorefrontUtils, private logger: Logger ) {
    }
    protected handleError( error: HttpErrorResponse, requestOptions: any ): Observable<HttpResponse<any>> {
        if ( this.logger.level < 4 ) {
            this.logger.info( this.constructor.name + " handleError: " + error.message );
        }
        this.logger.debug(this.constructor.name + " handleError: " + JSON.stringify(error) + " request options: " + JSON.stringify(requestOptions));
        return Observable.throw( error );
    }

    protected invokeService( options: any ): Observable<HttpResponse<any>> {
        options.headers = options.headers.set('X-RequestId', this.getRequestId());
        this.logger.debug( this.constructor.name + " invokeService: " + JSON.stringify( options ) );
        return this.http.request<any>( options.method, options.url, {
            body: options.body,
            headers: options.headers,
            params: options.params,
            observe: "response",
            withCredentials: true
        } ).catch(( res: HttpErrorResponse ) => this.handleError( res, options ) );
    }

    protected getRequestUrl() {
        let commerceSearchSecurePort = this.storefrontUtils.commerceSearchSecurePort === "443" ? "" : ":" + this.storefrontUtils.commerceSearchSecurePort;
        return `https://${this.storefrontUtils.commerceSearchDomainName}${commerceSearchSecurePort}${this.storefrontUtils.commerceSearchContextPath}`;
    }

    private getRequestId(): string{
        let counter = this.serviceCounter;
        this.serviceCounter = this.serviceCounter + 1;
        return this.storefrontUtils.sessionId + "_" + counter + "_" + this.constructor.name;
    }
}