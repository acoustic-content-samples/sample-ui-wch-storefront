/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { HttpResponse, HttpRequest} from '@angular/common/http';

export class HttpSessionCache {

  private sscache = require("session-storage-cache");

  /**
   * Returns a cached response, if any, or null if not present.
   */
  get(req: HttpRequest<any>): HttpResponse<any>|null{
    let cache = this.sscache.get(this.getCacheKey(req));
    if (!!cache){
      return new HttpResponse<any>(cache);
    }
    else {
      return null;
    }
  }

  /**
   * Adds or updates the response in the cache.
   */
  put(req: HttpRequest<any>, resp: HttpResponse<any>): void{
    this.sscache.set(this.getCacheKey(req), resp);
  }

  private getCacheKey(req: HttpRequest<any>): string{
    let cacheKeyString = req.url;
    let paramSep = req.url.indexOf('?') != -1 ? '&' : '?';
    for (let k of req.params.keys().sort()){
      cacheKeyString = cacheKeyString.concat(paramSep).concat(k).concat('=').concat(req.params.getAll(k).sort().join('&' + k + '='));
      paramSep = '&';
    }
    return btoa(req.url + cacheKeyString);
  }

  /**
   * Invalidate all session caches.
   */
  invalidateAll(){
    this.sscache.flush();
  }

  /**
   * Remove session cache for a particular request.
   * @param req The HttpRequest that need to be removed from cache.
   */
  remove(req: HttpRequest<any>){
    this.sscache.remove(this.getCacheKey(req));
  }
}