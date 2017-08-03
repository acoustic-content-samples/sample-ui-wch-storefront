/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import {
    Component,
    Input,
    OnInit,
    Injectable,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { StaticTemplateService } from './staticTemplate.service';
import { Router } from '@angular/router';

import { CompileService } from 'p3x-angular-compile';

import 'rxjs/add/operator/switchMap';



@Component({
	selector: 'static-template',
	styleUrls: ['./staticTemplate.scss'],
	templateUrl: './staticTemplate.html'
})
export class StaticTemplateComponent implements OnInit{
    @Input('template-name') templateName: any;
	@Input('content-name') contentName: any;
    @Input('context') context: any;
    @Input('imports') imports: any[];
    
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    template: any = {};
    defaultTemplate: string = 'simplePage';

    constructor(
        private route: ActivatedRoute,
        private staticTemplateService: StaticTemplateService,
        private router: Router,
		private compileService: CompileService
    ){}

    ngOnInit(): void {

		this.context = this.context || this;
		this.imports = this.imports || [];

        this.route.params
            .switchMap((params: Params) => this.staticTemplateService.getCompiledTemplate(((this.templateName) || this.defaultTemplate), this.contentName || params['path']))
            .subscribe(
                template => {
                	this.template = template;
					this.compileService.compile({
						template: this.template.markup,
						container: this.container,
						context: this.context,
						imports: this.imports,
						onCompiled: (cmp: any) => {
						}
					});
                },
                err => {
                    //only redirect if this was a page navigation and not a fragment
                    if(!this.templateName) {
                        this.router.navigate(['**']);
                    }
                }
            )
    }

}
