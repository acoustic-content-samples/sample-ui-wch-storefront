/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { NgModule } from '@angular/core';

import { PersonService } from "./transaction/person.service";
import { CartService } from "./transaction/cart.service";
import { GuestIdentityService } from "./transaction/guestIdentity.service";
import { PersonContactService } from "./transaction/personContact.service";
import { OrderService } from "./transaction/order.service";
import { PaymentInstructionService } from "./transaction/paymentInstruction.service";
import { TransactionService } from "./transaction/transaction.service";
import { ShippingInfoService } from "./transaction/shippingInfo.service";
import { LoginIdentityService } from "./transaction/loginIdentity.service";
import { CategoryViewService } from "./search/categoryView.service";
import { ProductViewService } from "./search/productView.service";
import { CountryService } from "./transaction/country.service";
import { ConfigurationService } from "./transaction/configuration.service";
import { SubscriptionService } from "./transaction/subscription.service";
import { ESpotService } from "./transaction/eSpot.service";

@NgModule({
    providers: [
        TransactionService,
        PersonService,
        PersonContactService,
        OrderService,
        CartService,
        GuestIdentityService,
        ShippingInfoService,
		LoginIdentityService,
        PaymentInstructionService,
        CategoryViewService,
        ProductViewService,
        CountryService,
        ConfigurationService,
        SubscriptionService,
        ESpotService
	]
})
export class RestModule { }
