/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { Component } from '@angular/core';
import { CommerceEnvironment } from "../../commerce/commerce.environment";

@Component({
	selector: 'account-side-nav',
	styleUrls: [ './accountSideNav.scss' ],
	templateUrl: './accountSideNav.html'
})
export class AccountSideNavComponent {
	readonly ordTypes:any=CommerceEnvironment.order.types;
	readonly ordDisplay:any=CommerceEnvironment.order.typeDisplay;
}