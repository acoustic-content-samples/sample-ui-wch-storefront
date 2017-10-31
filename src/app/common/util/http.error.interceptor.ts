/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Logger } from "angular2-logger/core";
import { Router } from '@angular/router';
import { CommerceEnvironment } from "../../commerce/commerce.environment";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  returnUrl: string;

  constructor(private logger: Logger, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(event => {}, error => {
        if (error instanceof HttpErrorResponse) {
          this.logger.info( this.constructor.name + " intercept: " + error.message );
          this.logger.debug( this.constructor.name + " intercept: " + JSON.stringify( error ) );

          let e = error.error.errors[0];

          // handle expired session
          if (e.errorCode === CommerceEnvironment.errors.expiredActivityTokenError || 
            e.errorKey === CommerceEnvironment.errors.expiredActivityTokenError) {
            // retain current URL
            this.returnUrl = this.router.url;
            this.router.navigate(['/sessionTimeOut'], { queryParams: { returnUrl: this.returnUrl }});
          }
        }
    });
  }
}