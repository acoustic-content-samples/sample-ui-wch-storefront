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

import { StorefrontUtils } from '../../common/storefrontUtils.service';

import { StaticTemplateComponent } from './staticTemplate.component';
import { StaticTemplateService } from './staticTemplate.service';

import { CompileModule } from 'p3x-angular-compile';

@NgModule({
    imports: [
        RouterModule,
		CompileModule
    ],
    providers: [
        StorefrontUtils,
        StaticTemplateService
    ],
    declarations: [
        StaticTemplateComponent
    ],
    exports: [
        StaticTemplateComponent
    ]
})
export class StaticTemplateModule {}
