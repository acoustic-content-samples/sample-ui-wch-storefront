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
import { HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Logger } from "angular2-logger/core";
import { Observable } from 'rxjs/Observable';
import { CommerceEnvironment } from "../../../commerce.environment";
import { StorefrontUtils } from "../../../../common/storefrontUtils.service";

@Injectable()
export class TransactionService {
    private serviceCounter = 0;

    constructor( private http: HttpClient, private storefrontUtils: StorefrontUtils, private logger: Logger ) { }

    protected handleError( error: HttpErrorResponse, requestOptions: any ): Observable<HttpResponse<any>> {
        if ( this.logger.level < 4 ) {
            this.logger.info( this.constructor.name + " handleError: " + error.message );
        }
        this.logger.debug( this.constructor.name + " handleError: " + JSON.stringify( error ) + " request options: " + JSON.stringify( requestOptions ) );
        return Observable.throw( error );
    }

    protected invokeService( options: any ): Observable<HttpResponse<any>> {
        // handle generic user in listed services that require valid user (guest or registered)
        let serviceName: string = "/" + options.url.split("/").pop();
        let reqServiceList: string[] = this.storefrontUtils.restRequiringUser;
        if ( reqServiceList.indexOf(serviceName) > -1 ) {
            if ( sessionStorage.getItem( 'currentUser' ) === null ) {
                //url for guest user identity
                let url = this.getRequestUrl() + `/store/${this.storefrontUtils.commerceStoreId}/guestidentity`;
                return this.http.request<any>( 'POST', url, {
                    withCredentials: true,
                    observe: "response"
                } ).flatMap(
                    (res) => {
                        if (res.body){
                            this.logger.info( this.constructor.name + " guestLogin: %o", res );
                            let user = res.body;
                            user.isGuest = true;
                            sessionStorage.setItem('currentUser', btoa(JSON.stringify(user)));
                            return this.invokeService( options );
                        }
                    }
                );
            }
        }
            
        let currentUserCache = sessionStorage.getItem( 'currentUser' );
        let currentUser = null;
        if ( currentUserCache !== null ) {
            currentUser = JSON.parse( atob( currentUserCache ) );
        }
        if ( currentUser && currentUser.WCTrustedToken && currentUser.WCToken ) {
            options.headers = options.headers.set( 'WCTrustedToken', currentUser.WCTrustedToken );
            options.headers = options.headers.set( 'WCToken', currentUser.WCToken );
        }
        options.headers = options.headers.set( 'X-RequestId', this.getRequestId() );
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
        let commerceSecurePort = this.storefrontUtils.commerceTransactionSecurePort === "443" ? "" : ":" + this.storefrontUtils.commerceTransactionSecurePort;
        return `https://${this.storefrontUtils.commerceTransactionDomainName}${commerceSecurePort}${this.storefrontUtils.commerceTransactionContextPath}`;
    }

    private getRequestId(): string {
        return this.storefrontUtils.sessionId + "_" + ( this.serviceCounter++ ) + "_" + this.constructor.name;
    }
}