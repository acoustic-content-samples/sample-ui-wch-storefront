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
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CheckoutTransactionService } from "../../commerce/services/componentTransaction/checkout.transaction.service";
import { PersonContactService } from '../../commerce/services/rest/transaction/personContact.service';
import { CountryService } from '../../commerce/services/rest/transaction/country.service';
import { StorefrontUtils } from '../../common/storefrontUtils.service';
import { CommerceEnvironment } from "../../commerce/commerce.environment";

@Component( {
    selector: 'guest-shipping-billing',
    styleUrls: ['./guestShippingBilling.scss'],
    templateUrl: './guestShippingBilling.html'
} )
export class GuestShippingBillingComponent implements OnInit {

    useSameAddressCheckbox : boolean;
    countries: any;
    showStateDropdown: any;
    savedAddress: any[] = [];
    @Output() onSave: EventEmitter<any> =  new EventEmitter();

    // forms settings
    addressForms: any = [
        {
            'title': 'Billing Address',
            'key': 'Billing',
            'showCopyCheckbox': false
        },
        {
            'title': 'Shipping Address',
            'key': 'Shipping',
            'showCopyCheckbox': true,
            'useSameAddress': false
        }
    ];

    constructor(private router: Router, 
        private countryService: CountryService, 
        private storefrontUtils: StorefrontUtils,
        private personContactService: PersonContactService) { }

    ngOnInit() {
        this.initCountries();
        this.initAddressObject();
    }

    initCountries() {
        this.countryService.findCountryStateList({"storeId":this.storefrontUtils.commerceStoreId}).toPromise()
        .then( response => {
            this.countries = response.body.countries;
        });
    }

    initAddressObject() {
        for (var i = 0; i < this.addressForms.length; i++){
            this.addressForms[i].data = this.deepCopy(CommerceEnvironment.address.defaults);
            this.addressForms[i].data.addressType = this.addressForms[i].key;
        }
    }

    onUseSameAddressCheckboxChange() {
        this.addressForms[1].useSameAddress = this.useSameAddressCheckbox;
    }

    onCountrySelect(countryObj: any, addressObj: any){
        addressObj.data.country = countryObj.displayName;
        addressObj.data.showStateDropdown = countryObj.states && countryObj.states.length !== 0;
        delete addressObj.data.states;
        if (addressObj.data.showStateDropdown){
            addressObj.data.states = countryObj.states;
        }
    }

    deepCopy(input: any):any {
		return JSON.parse(JSON.stringify(input));
    }

    saveAddress(){
        let param = {
            storeId: this.storefrontUtils.commerceStoreId,
            body: this.addressForms[0].data
        }
        // billing address
        this.personContactService.addPersonContact(param).toPromise()
        .then( response => { 
            // shipping address
            this.addressForms[0].response = response.body;
            if (!this.useSameAddressCheckbox) {
                param.body = this.addressForms[1].data;
                this.personContactService.addPersonContact(param).toPromise()
                .then( response => { 
                    this.addressForms[1].response = response.body;
                    this.onSave.emit(this.addressForms);
                })
            } else {
                this.onSave.emit(this.addressForms);
            }
        }) 
        .catch( error => {
            alert(this._parseErrorMsg(error, "Could not add the specified address. The address contains error or recipient already exists."))
        })       
    }

    private _parseErrorMsg(error:HttpErrorResponse,fallback:string): string {
		const eBody=error.error,
		      rc=eBody.errors&&eBody.errors.length&&eBody.errors[0].errorMessage?eBody.errors[0].errorMessage:fallback;
		return rc;
	}
}
