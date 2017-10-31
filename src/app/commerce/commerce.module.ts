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
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FilterService } from "./util/FilterService";
import { CheckoutTransactionService } from "./services/componentTransaction/checkout.transaction.service";
import { CartTransactionService } from "./services/componentTransaction/cart.transaction.service";
import { AuthenticationTransactionService } from "./services/componentTransaction/authentication.transaction.service";
import { AccountTransactionService } from "./services/componentTransaction/account.transaction.service";
import { OrderTransactionService } from "./services/componentTransaction/order.transaction.service";
import { RestModule } from "./services/rest/rest.module";
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { CommerceService } from './services/commerce.service';
import { AssignedPromotionCodeService } from './services/rest/transaction/assignedPromotionCode.service';
import { ConfigurationService } from './services/rest/transaction/configuration.service';

import { ItemContainerComponent } from './itemContainer/itemContainer.component';
import { SearchComponent } from './search/search.component';
import { CategoryComponent } from "./category/category.component";
import { BrandsComponent } from './brands/brands.component';
import { PriceRangeComponent } from './priceRange/priceRange.component';
import { FeaturedComponent } from './featured/featured.component';
import { ProductComponent } from './product/product.component';
import { PromoCodeComponent } from './promoCode/promoCode.component';
import { GuestShippingBillingComponent } from './guestShippingBilling/guestShippingBilling.component';
import { LoginComponent } from './login/login.component';
import { LanguageSelectionComponent } from './languageSelection/languageSelection.component';


@NgModule( {
	imports: [
		RouterModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RestModule,
		TranslateModule
	],
	declarations: [
		ItemContainerComponent,
		SearchComponent,
		CategoryComponent,
		BrandsComponent,
		PriceRangeComponent,
		FeaturedComponent,
		ProductComponent,
		PromoCodeComponent,
		LoginComponent,
		LanguageSelectionComponent,
		GuestShippingBillingComponent
	],
	providers: [
		CommerceService,
		CategoryService,
		ProductService,
		FilterService,
		CheckoutTransactionService,
		CartTransactionService,
		AccountTransactionService,
		AssignedPromotionCodeService,
		OrderTransactionService,
		ConfigurationService
	],
	exports: [
		ItemContainerComponent,
		SearchComponent,
		CategoryComponent,
		BrandsComponent,
		PriceRangeComponent,
		FeaturedComponent,
		ProductComponent,
		PromoCodeComponent,
		LoginComponent,
		LanguageSelectionComponent,
		GuestShippingBillingComponent
	]
} )
export class CommerceModule { }
