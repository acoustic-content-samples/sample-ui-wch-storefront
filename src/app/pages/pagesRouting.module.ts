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
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { StaticTemplateComponent} from "../theme/staticTemplate/staticTemplate.component";

const pageRoutes: Routes = [
	// pages
    { path: 'aboutUs', loadChildren: './aboutUs/aboutUs.module#AboutUsModule' },
	{ path: 'blog', loadChildren: './blog/blog.module#BlogModule' },
	{ path: 'cart', loadChildren: './cart/cart.module#CartModule' },
	{ path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule' },
	{ path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
    { path: 'home',  loadChildren: './home/home.module#HomeModule' },
	{ path: 'login', loadChildren: './login/login.module#LoginModule' },
	{ path: 'products', loadChildren: './productList/productList.module#ProductListModule' },
	{ path: 'product', loadChildren: './productDetails/productDetails.module#ProductDetailsModule' },
    { path: 'sp/:path', component: StaticTemplateComponent },
    { path: 'termsOfUse', loadChildren: './termsOfUse/termsOfUse.module#TermsOfUseModule' },
    { path: 'corpRel', loadChildren: './corpRelations/corpRelations.module#CorpRelationsModule' },
    { path: 'corpRes', loadChildren: './corpResponsibility/corpResponsibility.module#CorpResponsibilityModule' },
    { path: 'help', loadChildren: './help/help.module#HelpModule' },
	// fallback
	{ path: 'nowhere',  loadChildren: './home/home.module#HomeModule', canActivate: ['CanNeverActivateGuard'] },
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: '**', loadChildren: './notFound/notFound.module#NotFoundModule' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(pageRoutes, { useHash: true })
	],
	providers: [
		{ provide: APP_BASE_HREF, useValue: '/' }
	],
	exports: [
		RouterModule
	]
})
export class PageRoutingModule {}
