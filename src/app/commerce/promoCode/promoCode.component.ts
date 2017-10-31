/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, DoCheck } from '@angular/core';
import { CartTransactionService } from '../../commerce/services/componentTransaction/cart.transaction.service';
import { CartComponent } from '../../pages/cart/cart.component';

@Component({
    selector: 'promo-code',
    templateUrl: './promoCode.component.html',
    styleUrls: ['./promoCode.component.scss']
})

export class PromoCodeComponent implements DoCheck {

    @Input() cart : CartComponent;
    
    private _promoCode :  string;
    private _appliedPromoCodes :  string[] = [];
    private _cartInitialized : boolean = false;

    constructor(private cartTransactionService: CartTransactionService){}

    ngDoCheck(){
        if (this.cart.cart !== undefined && !this._cartInitialized) {
            this._cartInitialized = true;
            this.getAppliedPromotionCode();
        }
    }

    set promoCode( promoCode : string) {
        this._promoCode = promoCode;
    }

    get promoCode() :  string {
        return this._promoCode;
    }

    get appliedPromoCodes() : string[] {
        return this._appliedPromoCodes;
    }

    private applyPromotionCode(){
		this.cartTransactionService
			.applyPromotionCode(this._promoCode)
            .then (response => this.updateCart(response, this._promoCode, "add"))
            .catch(err => this.handleErrorCase(err));
    }

    private getAppliedPromotionCode(){
        let promoCodes: any[] = this.cart.cart.promotionCode;
        if (promoCodes) {
            promoCodes.forEach(promoCode => {
                this._appliedPromoCodes.push(promoCode.code);
            });
        }
    }

    private updateCart(response : any, code : string, action : string){
        this.updateAppliedPromoCodes(code, action);
        this.cart.initializeCart();
    }

    private updateAppliedPromoCodes(newCode : string, action : string){
        if (action === "remove") {
            let newCodeIndex = this._appliedPromoCodes.indexOf(newCode);
            if (newCodeIndex !== -1) {
                this._appliedPromoCodes.splice(newCodeIndex, 1);
            }
        }
        else if (action === "add") {
            this._appliedPromoCodes.push(newCode);
        }
    }

    private handleErrorCase(error : any){
        let errorMessage: string;
        let response: any [] = JSON.parse(error._body).errors;
        let errorBody: any;

        if (response.length) {
            errorBody = response[0];
            if (this.errorCodeExists(errorBody)) {
                this.displayStoreErrorMessage(errorBody);
            } else {
                this.displayServerErrorMessage(errorBody);
            }  
        } 
    }

    private removePromotionCode(code : string) {
        this.cartTransactionService
        .removePromotionCode(code)
        .then(response => this.updateCart(response, code, "remove"))
        .catch(err => console.error(err));
    }

    // ==================================================================================
    // ERROR messages - temporary for now, move this to common messaging component later
    // ==================================================================================

    private errorCodeExists(error : any ){
        return error.errorKey && error.errorCode;
    }

    private displayStoreErrorMessage(error : any){
        let errorCode = error.errorKey + "." + error.errorCode;
        alert(this._storeErrorMessages[errorCode]);
    }

    private displayServerErrorMessage(error: any){
        alert(error.errorMessage);
    }

    private _storeErrorMessages = {
        "ERR_PROMOTION_CODE_INVALID.-1200" : "The promotion code you have entered is not valid. Verify the code and try again.",
        "ERR_PROMOTION_NOT_AVAILABLE_AT_THIS_TIME.-2200" : "The promotion code you have entered is not available at this time. Try again later.",
        "ERR_PROMOTION_CODE_DUPLICATED.-1150" : "You have entered a duplicate promotion code {0}"
    }
}