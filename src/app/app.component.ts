/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'storefront',
	styleUrls: [
		'./common/css/animate.css',
		'../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss',
		'./common/css/responsive.css',
		'./common/style.scss'
	],
	encapsulation: ViewEncapsulation.None,
	template: `
		<shop-header></shop-header>
		<router-outlet></router-outlet>
		<shop-footer></shop-footer>
	`
})
export class AppComponent implements OnInit {
	constructor (
		private translate: TranslateService,
		private router: Router
	) {}

	ngOnInit () {
		this.translate.setDefaultLang('en');
		this.translate.use('en');

		this.router.events.subscribe(evt => {
			if (evt instanceof NavigationEnd) {
				if (window.screen.width >= 500) {
					//won't scroll to the top in mobile mode
                    window.scrollTo(0, 0);
                }
            }
		})
	}
}
