/* jshint ignore:start */
/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/* beautify ignore:start */
import { URLSearchParams } from '@angular/http';
import { HttpResponse, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { TransactionService } from "./transaction.service";
import { CommerceEnvironment } from "../../../commerce.environment";
/* beautify ignore:end */

export class ShippingInfoService extends TransactionService {

    /**
     * Gets shipping information for the shopping cart.
     * `@method`
     * `@name ShippingInfo#getShippingInfo`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
     ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
     ** `@property {string} langId ` Language identifier. If not specified, the "locale" parameter will be used. If "locale" isn't specified, then the store default language shall be used.
     ** `@property {string} locale ` The locale to use. Example usage : locale=en_US. If the "langId" parameter is specified, the "locale" parameter will be ignored. If no locale is specified, the store default locale will be used.
     ** `@property {string} forUser ` User name to act on behalf of.
     ** `@property {string} forUserId ` User identifier to act on behalf of.
     */
    getShippingInfo(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/cart/@self/shipping_info';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.getShippingInfo.mocks.json';
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
            throw new Error("Request '/store/{storeId}/cart/@self/shipping_info' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['responseFormat'] = parameters['responseFormat'] || parameters['responseFormat'];
        if (parameters['responseFormat'] !== undefined) {
            queryParameters = queryParameters.set('responseFormat', parameters['responseFormat']);
        }

        //allow use of param with or without underscore
        parameters['pageNumber'] = parameters['pageNumber'] || parameters['pageNumber'];
        if (parameters['pageNumber'] !== undefined) {
            queryParameters = queryParameters.set('pageNumber', parameters['pageNumber']);
        }

        //allow use of param with or without underscore
        parameters['pageSize'] = parameters['pageSize'] || parameters['pageSize'];
        if (parameters['pageSize'] !== undefined) {
            queryParameters = queryParameters.set('pageSize', parameters['pageSize']);
        }

        //allow use of param with or without underscore
        parameters['langId'] = parameters['langId'] || parameters['langId'];
        if (parameters['langId'] !== undefined) {
            queryParameters = queryParameters.set('langId', parameters['langId']);
        }

        //allow use of param with or without underscore
        parameters['locale'] = parameters['locale'] || parameters['locale'];
        if (parameters['locale'] !== undefined) {
            queryParameters = queryParameters.set('locale', parameters['locale']);
        }

        //allow use of param with or without underscore
        parameters['forUser'] = parameters['forUser'] || parameters['forUser'];
        if (parameters['forUser'] !== undefined) {
            queryParameters = queryParameters.set('forUser', parameters['forUser']);
        }

        //allow use of param with or without underscore
        parameters['forUserId'] = parameters['forUserId'] || parameters['forUserId'];
        if (parameters['forUserId'] !== undefined) {
            queryParameters = queryParameters.set('forUserId', parameters['forUserId']);
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

        if (header.getAll('Accept').indexOf('application/json') > -1) {
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
     * Updates shipping information for the shopping cart.
     * `@method`
     * `@name ShippingInfo#updateOrderShippingInfo`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     ** `@property {any} body ` Request body.
     ** `@property {string} forUser ` User name to act on behalf of.
     ** `@property {string} forUserId ` User identifier to act on behalf of.
     */
    updateOrderShippingInfo(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/cart/@self/shipping_info';
        let requestUrl = domain + path;
        let method = 'PUT';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.updateOrderShippingInfo.mocks.json';
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
            throw new Error("Request '/store/{storeId}/cart/@self/shipping_info' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['responseFormat'] = parameters['responseFormat'] || parameters['responseFormat'];
        if (parameters['responseFormat'] !== undefined) {
            queryParameters = queryParameters.set('responseFormat', parameters['responseFormat']);
        }

        //allow use of param with or without underscore
        parameters['body'] = parameters['body'] || parameters['body'];
        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        //allow use of param with or without underscore
        parameters['forUser'] = parameters['forUser'] || parameters['forUser'];
        if (parameters['forUser'] !== undefined) {
            queryParameters = queryParameters.set('forUser', parameters['forUser']);
        }

        //allow use of param with or without underscore
        parameters['forUserId'] = parameters['forUserId'] || parameters['forUserId'];
        if (parameters['forUserId'] !== undefined) {
            queryParameters = queryParameters.set('forUserId', parameters['forUserId']);
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

        if (header.getAll('Accept').indexOf('application/json') > -1) {
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