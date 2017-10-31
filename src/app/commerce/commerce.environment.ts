/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
export const CommerceEnvironment = {
    searchUseMocks: false,
    transactionUseMocks: false,
    pageSize: 25,
    errors: {
        genericUserError: "USR.CWXFR0130E",
        expiredActivityTokenError: "CWXBB1011E"
    },
    order: {
        orderStatus: {
            I: "Submitted",
            M: "Order received and ready for processing",
            C: "Payment approved",
            S: "Order shipped",
            W: "Pending approval",
            N: "Approval denied",
            B: "Back ordered",
            R: "Inventory fulfilled",
            D: "Order completed",
            L: "Insufficient inventory",
            A: "Payment authorization requires review",
            F: "Order transferred to fulfillment",
            G: "Order processing",
            K: "Return associated",
            V: "Partially shipped",
            X: "Order canceled",
            E: "Currently edited by the store",
            T: "Currently locked by the store",
            InActive:"InActive",
            Active:"Active",
            Expired:"Expired",
            Cancelled:"Cancelled",
            Completed:"Completed",
            Suspended:"Suspended",
            PendingCancel:"PendingCancel"
        },
        validOrderStatusForCancel: ["A","B","C","E","I","L","M","N","P","W"],
        types: {
            history:"History",
            recurring:"RecurringOrder",
            subscription:"All"
        },
        typeDisplay: {
            History:"Order History",
            RecurringOrder:"Recurring Orders",
            All:"Subscriptions"
        },
        freq:{
            onceOnly:"OnceOnly",
            everyHour:"EveryHour",
            everyDay:"EveryDay",
            everyWeek:"EveryWeek",
            everyMonth:"EveryMonth",
            everyYear:"EveryYear",
            everyXHours:"EveryXHours",
            everyXDays:"EveryXDays",
            everyXWeeks:"EveryXWeeks",
            everyXMonths:"EveryXMonths",
            everyXYears:"EveryXYears"
        },
        uom: {
            hour:"HUR",
            day:"DAY",
            week:"WEE",
            month:"MON",
            year:"ANN"
        },
        msgKeys: {
            infoNA:"InfoNA",
            subscrAllFuture:"SubscrAllFuture",
            subscrAllFutureExcCurrent:"SubscrAllFutureExcCurrent",
            recurOrderAllFuture:"RecurOrderAllFuture",
            recurOrderAllFutureExcCurrent:"RecurOrderAllFutureExcCurrent",
            subscrCancelSubmitted:"SubscrCancelSubmitted",
            subscrCancelled:"SubscrCancelled",
            recurOrderCancelSubmitted:"RecurOrderCancelSubmitted",
            recurOrderCancelled:"RecurOrderCancelled"
        }
    },
    shopOnBehalfSessionEstablished: false,
    address:{
        types:["Shipping","Billing","ShippingAndBilling"],
        reqAttrs:["nickName","firstName","lastName","city","state","country","email1","phone1","addressLine","addressType","zipCode"],
        defaults:{
            addressLine:["","",""],
            addressType:"ShippingAndBilling",
            country:"US"
        }
    },
    confSupportedCurrencies: "com.ibm.commerce.foundation.supportedCurrencies",
    confSupportedLanguages: "com.ibm.commerce.foundation.supportedLanguages",
    confDefaultLanguage: "com.ibm.commerce.foundation.defaultLanguage",
    defaultLang: "en",
    personalInfo:{
        reqAttrs:["firstName","lastName","city","state","country","zipCode","addressLine","address1","address2","email1","phone1"],
        defaults:{
            addressLine:["","",""],
            country:"US"
        },
        genderList:[{name:"Male",value:"M"},{name:"Female",value:"F"}]
    },
    eSpotTypeStoreFeature: "STOREFEATURE"
};