/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { CommerceEnvironment } from "../../../commerce/commerce.environment";
import { AccountTransactionService } from '../../../commerce/services/componentTransaction/account.transaction.service';
import { AuthenticationTransactionService } from '../../../commerce/services/componentTransaction/authentication.transaction.service';
import { PersonContactService } from '../../../commerce/services/rest/transaction/personContact.service';
import { StorefrontUtils } from '../../../common/storefrontUtils.service';

@Component({
	selector: 'address-book',
	styleUrls: ['./addressBook.scss'],
	templateUrl: './addressBook.html'
})
export class AddressBookComponent {
	isLoggedIn:boolean=false;
	authSub:any;
	addrList:any[]=[];
	addrDesc:any={};
	dispDesc:any={};
	selectedAddr:string;
	editMode:boolean=false;
	modAddrNickName:string="";
	success:boolean=false;

	constructor(private storeUtils:StorefrontUtils, private contactSvc:PersonContactService, private route:ActivatedRoute, private router:Router, private accountService:AccountTransactionService, private authService:AuthenticationTransactionService) {
		this.isLoggedIn=this.authService.isLoggedIn();
		this.authSub=this.authService.authUpdate.subscribe(status=>this.isLoggedIn=status);
	}

	ngOnInit() {
		if (this.isLoggedIn)
			this.initializeAddressBook();
		else
			this.router.navigate(["/login"]);
	}

	setEditMode(payload:any) {
		if (!payload.editMode) {
			if (payload.success)
				this.initializeAddressBook(payload.addrSelect);
			else if (this.dispDesc[this.selectedAddr].newAddr)
				this.selectedAddr=this.addrList[0].nickName;
			else
				this.dispDesc[this.selectedAddr]=this.deepCopy(this.addrDesc[this.selectedAddr]);
		}
		this.editMode=payload.editMode;
		this.success=payload.success;
		this.modAddrNickName=payload.success?payload.addrSelect:"";
	}

	addNew() {
		this.setEditMode({editMode:true});
		this.selectedAddr="";
		this.dispDesc[this.selectedAddr]={newAddr:true};
		this.initAddr(this.dispDesc[this.selectedAddr]);
	}

	delete() {
		this.setEditMode({editMode:true});
		const p={storeId:this.storeUtils.commerceStoreId,nickName:this.selectedAddr};
		this.selectedAddr=this.addrList[0].nickName;
		this.contactSvc.deletePersonContact(p).toPromise().then(r=>this.setEditMode({editMode:false,addrSelect:p.nickName,success:true}));
	}

	edit() {
		this.setEditMode({editMode:true});
	}

	deepCopy(i:any):any {
		return JSON.parse(JSON.stringify(i));
	}

	initAddr(inAddr:any) {
		let defsCopy:any;
		for (let a of CommerceEnvironment.address.reqAttrs)
			if (!inAddr[a])
				if (CommerceEnvironment.address.defaults[a]) {
					if (!defsCopy)
						defsCopy=this.deepCopy(CommerceEnvironment.address.defaults);
					inAddr[a]=defsCopy[a];
				} else {
					inAddr[a]=""
				}
	}

	populate(inAddr:any) {
		this.initAddr(inAddr);
		this.addrList.push(inAddr);
		this.addrDesc[inAddr.nickName]=inAddr;
		this.dispDesc[inAddr.nickName]=this.deepCopy(inAddr);
	}

	initializeAddressBook(addrSelect?:string) {
		this.accountService.getCurrentUserPersonalInfo().then(r=>{
			let def=r.body;
			def.defAddr=true;

			this.addrList=[];
			this.addrDesc={};
			this.dispDesc={};

			this.populate(def);

			this.contactSvc.getAllPersonContact({storeId:this.storeUtils.commerceStoreId}).toPromise().then(r=>{
				let book=r.body.contact;
				if (book&&book.length)
					for (let c of book)
						this.populate(c);
				this.selectedAddr=addrSelect&&this.addrDesc[addrSelect]?addrSelect:def.nickName;
			});
		});
	}
}
