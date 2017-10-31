/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { HttpSessionCache } from "./http.session.cache";
import { Injectable } from "@angular/core";
import { ConfigService } from "../config.service";
import { Logger } from "angular2-logger/core";

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  private cacheConfig: any[] = this.configService.servicesConfig.cacheConfig;
  private storeId: string = this.configService.configJSON.commerceStoreID;

  constructor( private cache: HttpSessionCache,
    private configService: ConfigService,
    private logger: Logger ) {
  }

  /**
   * Intercepts the request to perform response cache actions
   * @param req the request object
   * @param next the next interceptor in chain
   */
  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    // Before doing anything, it's important to only cache GET requests.
    // Skip this interceptor if the request method isn't GET.
    if ( req.method !== 'GET' ) {
      return next.handle( req );
    }

    // First, check the cache to see if this request exists.
    const cachedResponse = this.cache.get( req );
    if ( cachedResponse ) {
      if ( this.logger.level === 4 ) {
        this.logger.debug( this.constructor.name + " intercept: " + req.urlWithParams + " Response from cache" );
      }
      if ( this.logger.level === 5 ) {
        this.logger.log( this.constructor.name + " intercept: " + JSON.stringify(req) + " Response from cache" + JSON.stringify(cachedResponse) );
      }
      // A cached response exists. Serve it instead of forwarding
      // the request to the next handler.
      return Observable.of( cachedResponse );
    }

    // No cached response exists. Go to the network, and cache
    // the response when it arrives.
    return next.handle( req ).do( event => {
      // Remember, there may be other events besides just the response.
      if ( event instanceof HttpResponse ) {
        if ( this.logger.level === 4 ) {
          this.logger.debug( this.constructor.name + " intercept: " + req.urlWithParams + " Response from request" );
        }
        if ( this.logger.level === 5 ) {
          this.logger.log( this.constructor.name + " intercept: " + JSON.stringify(req) + " Response from request" + JSON.stringify(event) );
        }
        if ( this.isCacheEnabled( req ) ) {
          // Update the cache.
          this.cache.put( req, event );
        }
      }
    } );
  }

  private isCacheEnabled( req: HttpRequest<any> ): boolean {
    let isCacheEnabled = false;
    for ( let config of this.cacheConfig ) {
      isCacheEnabled = this.verifyCacheConfigEnabled( config, req );
      if ( isCacheEnabled ) {
        break;
      }
    }
    return isCacheEnabled;
  }

  private verifyCacheConfigEnabled( config: any, req: HttpRequest<any> ): boolean {
    let hasCacheConfig = false;
    let url = config.url.replace( '{storeId}', this.storeId );
    hasCacheConfig = req.url.indexOf( url ) != -1;
    if ( hasCacheConfig ) {
      let parameters = config.parameters || [];
      let notCacheable = false;
      notCacheable = parameters.some( function ( param: any ) {
        let values = req.params.getAll( param.name );
        let r = values === null || values.indexOf( param.value ) == -1;
        return param.negate ? !r : r;
      } );
      hasCacheConfig = !notCacheable;
    }
    return hasCacheConfig;
  }
}