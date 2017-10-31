/* jshint ignore:start */
//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
//
// (C) Copyright IBM Corp. 2017
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------

/* beautify ignore:start */
import { URLSearchParams } from '@angular/http';
import { HttpResponse, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { TransactionService } from "./transaction.service";
import { CommerceEnvironment } from "../../../commerce.environment";
/* beautify ignore:end */

export class CountryService extends TransactionService {

    /**
     * Retrieve a list of countries/region and corresponding states/provinces.
     * `@method`
     * `@name Country#findCountryStateList`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
      ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.

     ** `@property {string} countryCode ` The country or region abbreviation code
     */
    findCountryStateList(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse<any> > {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/country/country_state_list';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findCountryStateList.mocks.json';
        }
        let form = {};
        let body = {};
        let header: HttpHeaders;
        let queryParameters = new HttpParams();
        let formParams = new URLSearchParams();
        if (typeof headers === 'undefined' || headers === null) {
            header = new HttpHeaders();
        } else {
            header = new HttpHeaders(headers);
        }
        if (parameters === undefined) {
            parameters = {};
        }
        if (parameters.pathParameters === undefined) {
            parameters.pathParameters = {};
        }

        let headerValues = {};
        headerValues['Accept'] = ['application/json', 'application/xml', 'application/xhtml+xml', 'application/atom+xml'];
        for (let val of headerValues['Accept']) {
            header = header.append('Accept', val);
        }

        //allow use of param with or without underscore
        parameters['storeId'] = parameters['storeId'] || parameters['storeId'];
        parameters.pathParameters['storeId'] = parameters.pathParameters['storeId'] || parameters.pathParameters['storeId'];
        if (parameters.pathParameters['storeId'] === undefined) {
            parameters.pathParameters['storeId'] = parameters['storeId'];
        }
        requestUrl = requestUrl.replace('{storeId}', parameters.pathParameters['storeId']);

        if (parameters.pathParameters['storeId'] === undefined) {
            throw new Error("Request '/store/{storeId}/country/country_state_list' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['profileName'] = parameters['profileName'] || parameters['profileName'];
        queryParameters = queryParameters.set('profileName', 'IBM_countryStateList_Summary');

        //allow use of param with or without underscore
        parameters['countryCode'] = parameters['countryCode'] || parameters['countryCode'];
        if (parameters['countryCode'] !== undefined) {
            queryParameters = queryParameters.set('countryCode', parameters['countryCode']);
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters = queryParameters.set(parameterName, parameter);
                });
        }

        if (!header.get('Content-Type')) {
            header = header.append('Content-Type', 'application/json; charset=utf-8');
        }

        if (header.get('Accept').indexOf('application/json') > -1) {
            header = header.set('Accept', 'application/json');
        }

        if (header.get('content-type') === 'multipart/form-data' && Object.keys(form).length > 0) {
            let formData = new FormData();
            for (let p in form) {
                if (form[p].name !== undefined) {
                    formData.append(p, form[p], form[p].name);
                } else {
                    formData.append(p, form[p]);
                }
            }
            body = formData;
        } else if (Object.keys(form).length > 0) {
            header = header.set('content-type', 'application/x-www-form-urlencoded');
            for (let p in form) {
                formParams.append(p, form[p]);
            }
            body = formParams;
        }

        let requestOptions = {
            'params': queryParameters,
            'method': method,
            'headers': header,
            'body': body,
            'url': requestUrl
        };

        return this.invokeService(requestOptions);
    };

    /**
     * Retrieve the display name of a country and/or a state.
     * `@method`
     * `@name Country#findCountryStateName`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
      ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.

     ** `@property {string} countryCode ` The country or region abbreviation code
     ** `@property {string} stateCode ` The state or province abbreviation code.
     */
    findCountryStateName(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse<any> > {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/country/country_state_name';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findCountryStateName.mocks.json';
        }
        let form = {};
        let body = {};
        let header: HttpHeaders;
        let queryParameters = new HttpParams();
        let formParams = new URLSearchParams();
        if (typeof headers === 'undefined' || headers === null) {
            header = new HttpHeaders();
        } else {
            header = new HttpHeaders(headers);
        }
        if (parameters === undefined) {
            parameters = {};
        }
        if (parameters.pathParameters === undefined) {
            parameters.pathParameters = {};
        }

        let headerValues = {};
        headerValues['Accept'] = ['application/json', 'application/xml', 'application/xhtml+xml', 'application/atom+xml'];
        for (let val of headerValues['Accept']) {
            header = header.append('Accept', val);
        }

        //allow use of param with or without underscore
        parameters['storeId'] = parameters['storeId'] || parameters['storeId'];
        parameters.pathParameters['storeId'] = parameters.pathParameters['storeId'] || parameters.pathParameters['storeId'];
        if (parameters.pathParameters['storeId'] === undefined) {
            parameters.pathParameters['storeId'] = parameters['storeId'];
        }
        requestUrl = requestUrl.replace('{storeId}', parameters.pathParameters['storeId']);

        if (parameters.pathParameters['storeId'] === undefined) {
            throw new Error("Request '/store/{storeId}/country/country_state_name' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['profileName'] = parameters['profileName'] || parameters['profileName'];
        queryParameters = queryParameters.set('profileName', 'IBM_countryStateName');

        //allow use of param with or without underscore
        parameters['countryCode'] = parameters['countryCode'] || parameters['countryCode'];
        if (parameters['countryCode'] !== undefined) {
            queryParameters = queryParameters.set('countryCode', parameters['countryCode']);
        }

        //allow use of param with or without underscore
        parameters['stateCode'] = parameters['stateCode'] || parameters['stateCode'];
        if (parameters['stateCode'] !== undefined) {
            queryParameters = queryParameters.set('stateCode', parameters['stateCode']);
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters = queryParameters.set(parameterName, parameter);
                });
        }

        if (!header.get('Content-Type')) {
            header = header.append('Content-Type', 'application/json; charset=utf-8');
        }

        if (header.get('Accept').indexOf('application/json') > -1) {
            header = header.set('Accept', 'application/json');
        }

        if (header.get('content-type') === 'multipart/form-data' && Object.keys(form).length > 0) {
            let formData = new FormData();
            for (let p in form) {
                if (form[p].name !== undefined) {
                    formData.append(p, form[p], form[p].name);
                } else {
                    formData.append(p, form[p]);
                }
            }
            body = formData;
        } else if (Object.keys(form).length > 0) {
            header = header.set('content-type', 'application/x-www-form-urlencoded');
            for (let p in form) {
                formParams.append(p, form[p]);
            }
            body = formParams;
        }

        let requestOptions = {
            'params': queryParameters,
            'method': method,
            'headers': header,
            'body': body,
            'url': requestUrl
        };

        return this.invokeService(requestOptions);
    };

}
/* jshint ignore:end */