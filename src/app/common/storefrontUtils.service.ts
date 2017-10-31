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
import { ConfigService } from './config.service';

@Injectable()
export class StorefrontUtils {
	public readonly tenant: string = this.configService.configJSON.contentHubID;
	public readonly baseUrl: string = `//${this.configService.configJSON.contentHubDomainName}`;
	public readonly deliveryApiUrl: string = `${this.baseUrl}/api/${this.tenant}/delivery/v1`;
	public readonly staticUrl: string = `${this.baseUrl}/${this.tenant}`;
	public readonly commerceTransactionDomainName: string = `${this.configService.configJSON.commerceTransactionDomainName}`;
	public readonly commerceTransactionSecurePort: string = `${this.configService.configJSON.commerceTransactionSecurePort}`;
	public readonly commerceTransactionContextPath: string = `${this.configService.configJSON.commerceTransactionContextPath}`;
	public readonly commerceSearchDomainName: string = `${this.configService.configJSON.commerceSearchDomainName}`;
	public readonly commerceSearchSecurePort: string = `${this.configService.configJSON.commerceSearchSecurePort}`;
	public readonly commerceSearchContextPath: string = `${this.configService.configJSON.commerceSearchContextPath}`;
	public readonly commerceStoreId: string = `${this.configService.configJSON.commerceStoreID}`;
	public readonly commerceCatalogId: string = `${this.configService.configJSON.commerceCatalogID}`;
	public readonly sessionId: number;
	public readonly restRequiringUser: string[] = this.configService.servicesConfig.restRequiringUser;

	constructor(private configService: ConfigService) {
		this.sessionId = this.configService.getSessionId();
	}
}
