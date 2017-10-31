/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { CommerceEnvironment } from "../../../commerce/commerce.environment";
import { AccountTransactionService } from '../../../commerce/services/componentTransaction/account.transaction.service';
import { AuthenticationTransactionService } from '../../../commerce/services/componentTransaction/authentication.transaction.service';
import { PersonContactService } from '../../../commerce/services/rest/transaction/personContact.service';
import { CountryService } from '../../../commerce/services/rest/transaction/country.service';
import { StorefrontUtils } from '../../../common/storefrontUtils.service';

@Component({
	selector: 'address',
	styleUrls: ['./address.scss'],
	templateUrl: './address.html'
})
export class AddressComponent implements OnInit {
	private _addr:any;
	@Input() set address(address:any) {
		this._addr=address;
		this.adjustStateProv();
	}
	@Input() editMode:boolean=false;
	@Input() allowEdit:boolean=false;
	@Output() reflectEditMode=new EventEmitter<any>();
	@Input() title:string="Address";
	readonly addrTypes:string[]=CommerceEnvironment.address.types;
	isLoggedIn:boolean=false;
	authSub:any;
	countries:any[];
	countryDescs:any;
	saveProcessing:boolean=false;
	saveErrorMsg:string="";


	constructor(private contactSvc:PersonContactService, private route: ActivatedRoute, private router: Router, private storeUtils: StorefrontUtils, private countrySvc: CountryService, private accountService: AccountTransactionService, private authService: AuthenticationTransactionService) {
		this.isLoggedIn = this.authService.isLoggedIn();
		this.authSub = this.authService.authUpdate.subscribe(status=>this.isLoggedIn=status);
	}

	ngOnInit() {
		if (this.isLoggedIn)
			this.initCountries();
		else
			this.router.navigate(["/login"]);
	}

	setEditStatus(status:boolean,addrSelect:boolean,success?:boolean) {
		this.editMode=status;
		this.saveErrorMsg="";
		this.reflectEditMode.emit({editMode:status,addrSelect:addrSelect,success:success});
	}

	performSave() {
		this.saveProcessing=true;
		if (this._addr.newAddr) {
			const p={storeId:this.storeUtils.commerceStoreId,body:this._addr};
			this.contactSvc.addPersonContact(p)
			.toPromise().then(r=>this.performAfterSave()).catch(e=>this.handleError(e,"Unable to create new address"));
		}
		else {
			const p={storeId:this.storeUtils.commerceStoreId,nickName:this._addr.nickName,body:this.copyValidAttrs()};
			this.contactSvc.updatePersonContact(p)
			.toPromise().then(r=>this.performAfterSave()).catch(e=>this.handleError(e,"Unable to modify address"));
		}
	}

	performAfterSave() {
		this.setEditStatus(false,this._addr.nickName,true);
		this.saveProcessing=false;
	}

	handleError(error:any,fallback:string) {
		this.saveErrorMsg=this.parseErrorMsg(error,fallback);
		this.saveProcessing=false;
	}

	copyValidAttrs():any {
		let dest={};
		for (let c of CommerceEnvironment.address.reqAttrs)
			dest[c]=this._addr[c];
		return dest;
	}

	initCountries() {
        if (!this.countries) {
            this.countrySvc.findCountryStateList({storeId:this.storeUtils.commerceStoreId}).toPromise().then(r=>{
                this.countries=r.body.countries;
				this.countryDescs={};
				for (let c of this.countries) {
					this.countryDescs[c.code]=c;
					c.stateDescs={};
					c.states.forEach((s:any)=>c.stateDescs[s.code]=s);
				}
				this.adjustStateProv();
			});
        }
	}

	adjustStateProv() {
		let b:boolean=this.countryDescs&&this.countryDescs[this._addr.country];
		let d:any=b?this.countryDescs[this._addr.country]:undefined;
		if (b&&d.states.length>0&&!d.stateDescs[this._addr.state])
			this._addr.state="";
	}

    private parseErrorMsg(error:HttpErrorResponse,fallback:string): string {
		const eBody=error.error;
		return eBody.errors&&eBody.errors.length&&eBody.errors[0].errorMessage?eBody.errors[0].errorMessage:fallback;
	}
}
