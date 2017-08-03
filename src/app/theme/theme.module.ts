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
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CommerceModule } from '../commerce/commerce.module';

import { ShopHeaderModule } from './shopHeader/shopHeader.module';
import { SideNavModule } from './sideNav/sideNav.module';
import { StaticTemplateModule } from './staticTemplate/staticTemplate.module';
import { CarouselHeroComponent } from './carouselHero/carouselHero.component';
import { ShopFooterComponent } from './shopFooter/shopFooter.component';
import { StarRatingComponent } from './starRating/starRating.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ShopHeaderModule,
        StaticTemplateModule,
        SideNavModule,
        CommerceModule
	],
	declarations: [
		CarouselHeroComponent,
		ShopFooterComponent,
		StarRatingComponent
	],
	exports: [
		ShopHeaderModule,
		CarouselHeroComponent,
		ShopFooterComponent,
        StaticTemplateModule,
        SideNavModule,
        StarRatingComponent
	]
})
export class ThemeModule {}
