/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import { Injectable } from "@angular/core";

import { ESpotService } from '../../commerce/services/rest/transaction/eSpot.service';
import { StorefrontUtils } from '../storefrontUtils.service';
import { CommerceEnvironment } from "../../commerce/commerce.environment";

@Injectable()
export class StoreConfigurationsCache {
  private cache: any[] = [];
  private cachedConf: Map<string, boolean>;

  constructor(
    private eSpotSvc: ESpotService,
    private storeUtils: StorefrontUtils ) {
      this.cachedConf = new Map();
  }
  
  public isEnabled(featureName: string): boolean {
    if (this.cachedConf.size>0 && this.cachedConf.has(featureName)) {
      return this.cachedConf.get(featureName);
    }
    else {
      this.getFeature(featureName).subscribe(r=>{
        let isFeatureEnabled = r.MarketingSpotData[0].baseMarketingSpotActivityData[0].baseMarketingSpotActivityName;
        this.cachedConf.set(featureName, isFeatureEnabled);
        return isFeatureEnabled;
      })
    }
  }

  private getFeature(featureName: string) {
    return this.eSpotSvc.findESpotData({"storeId":this.storeUtils.commerceStoreId, 
    "name":featureName, "type":CommerceEnvironment.eSpotTypeStoreFeature}).map(r=>{
      return r.body;
    });
  }
}