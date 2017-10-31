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

export class OrderService extends TransactionService {

    /**
     * Gets the order history for the authenticated user.
     * `@method`
     * `@name Order#findOrderHistory`
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
     ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
     */
    findOrderHistory(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order/@history';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findOrderHistory.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order/@history' missing required parameter storeId");
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
        parameters['currency'] = parameters['currency'] || parameters['currency'];
        if (parameters['currency'] !== undefined) {
            queryParameters = queryParameters.set('currency', parameters['currency']);
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
     * Gets the order details for a specific order ID.
     * `@method`
     * `@name Order#findByOrderId`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} orderId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The order identifier.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
     ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
     ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.
     */
    findByOrderId(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order/{orderId}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findByOrderId.mocks.json';
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
        parameters['orderId'] = parameters['orderId'] || parameters['orderId'];
        parameters.pathParameters['orderId'] = parameters.pathParameters['orderId'] || parameters.pathParameters['orderId'];
        if (parameters.pathParameters['orderId'] === undefined) {
            parameters.pathParameters['orderId'] = parameters['orderId'];
        }
        requestUrl = requestUrl.replace('{orderId}', parameters.pathParameters['orderId']);

        if (parameters.pathParameters['orderId'] === undefined) {
            throw new Error("Request '/store/{storeId}/order/{orderId}' missing required parameter orderId");
        }

        //allow use of param with or without underscore
        parameters['storeId'] = parameters['storeId'] || parameters['storeId'];
        parameters.pathParameters['storeId'] = parameters.pathParameters['storeId'] || parameters.pathParameters['storeId'];
        if (parameters.pathParameters['storeId'] === undefined) {
            parameters.pathParameters['storeId'] = parameters['storeId'];
        }
        requestUrl = requestUrl.replace('{storeId}', parameters.pathParameters['storeId']);

        if (parameters.pathParameters['storeId'] === undefined) {
            throw new Error("Request '/store/{storeId}/order/{orderId}' missing required parameter storeId");
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
        parameters['currency'] = parameters['currency'] || parameters['currency'];
        if (parameters['currency'] !== undefined) {
            queryParameters = queryParameters.set('currency', parameters['currency']);
        }

        //allow use of param with or without underscore
        parameters['profileName'] = parameters['profileName'] || parameters['profileName'];
        if (parameters['profileName'] !== undefined) {
            queryParameters = queryParameters.set('profileName', parameters['profileName']);
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
     * Gets a list of orders by order status.
     * `@method`
     * `@name Order#findByStatus`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} status (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The order status.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
     ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
     ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
     */
    findByStatus(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order/byStatus/{status}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findByStatus.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order/byStatus/{status}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['status'] = parameters['status'] || parameters['status'];
        parameters.pathParameters['status'] = parameters.pathParameters['status'] || parameters.pathParameters['status'];
        if (parameters.pathParameters['status'] === undefined) {
            parameters.pathParameters['status'] = parameters['status'];
        }
        requestUrl = requestUrl.replace('{status}', parameters.pathParameters['status']);

        if (parameters.pathParameters['status'] === undefined) {
            throw new Error("Request '/store/{storeId}/order/byStatus/{status}' missing required parameter status");
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
        parameters['currency'] = parameters['currency'] || parameters['currency'];
        if (parameters['currency'] !== undefined) {
            queryParameters = queryParameters.set('currency', parameters['currency']);
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
     * Gets a list of orders by buyer id.
     * `@method`
     * `@name Order#findByBuyerId`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} buyerId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
     ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
     ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
     */
    findByBuyerId(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order/byBuyerId/{buyerId}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findByBuyerId.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order/byBuyerId/{buyerId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['buyerId'] = parameters['buyerId'] || parameters['buyerId'];
        parameters.pathParameters['buyerId'] = parameters.pathParameters['buyerId'] || parameters.pathParameters['buyerId'];
        if (parameters.pathParameters['buyerId'] === undefined) {
            parameters.pathParameters['buyerId'] = parameters['buyerId'];
        }
        requestUrl = requestUrl.replace('{buyerId}', parameters.pathParameters['buyerId']);

        if (parameters.pathParameters['buyerId'] === undefined) {
            throw new Error("Request '/store/{storeId}/order/byBuyerId/{buyerId}' missing required parameter buyerId");
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
        parameters['currency'] = parameters['currency'] || parameters['currency'];
        if (parameters['currency'] !== undefined) {
            queryParameters = queryParameters.set('currency', parameters['currency']);
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
     * Get order details for a given external order Id.
     * `@method`
     * `@name Order#findOMSOrderDetailsByExternalOrderId`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} extOrderId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The external order identifier.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     */
    findOMSOrderDetailsByExternalOrderId(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order/oms_order/{extOrderId}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findOMSOrderDetailsByExternalOrderId.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order/oms_order/{extOrderId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['extOrderId'] = parameters['extOrderId'] || parameters['extOrderId'];
        parameters.pathParameters['extOrderId'] = parameters.pathParameters['extOrderId'] || parameters.pathParameters['extOrderId'];
        if (parameters.pathParameters['extOrderId'] === undefined) {
            parameters.pathParameters['extOrderId'] = parameters['extOrderId'];
        }
        requestUrl = requestUrl.replace('{extOrderId}', parameters.pathParameters['extOrderId']);

        if (parameters.pathParameters['extOrderId'] === undefined) {
            throw new Error("Request '/store/{storeId}/order/oms_order/{extOrderId}' missing required parameter extOrderId");
        }

        //allow use of param with or without underscore
        parameters['responseFormat'] = parameters['responseFormat'] || parameters['responseFormat'];
        if (parameters['responseFormat'] !== undefined) {
            queryParameters = queryParameters.set('responseFormat', parameters['responseFormat']);
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
     * Process for a given external order Id.
     * `@method`
     * `@name Order#processOMSOrderByExternalOrderId`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} extOrderId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The external order identifier.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     */
    processOMSOrderByExternalOrderId(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order/process_oms_order/{extOrderId}';
        let requestUrl = domain + path;
        let method = 'POST';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.processOMSOrderByExternalOrderId.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order/process_oms_order/{extOrderId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['extOrderId'] = parameters['extOrderId'] || parameters['extOrderId'];
        parameters.pathParameters['extOrderId'] = parameters.pathParameters['extOrderId'] || parameters.pathParameters['extOrderId'];
        if (parameters.pathParameters['extOrderId'] === undefined) {
            parameters.pathParameters['extOrderId'] = parameters['extOrderId'];
        }
        requestUrl = requestUrl.replace('{extOrderId}', parameters.pathParameters['extOrderId']);

        if (parameters.pathParameters['extOrderId'] === undefined) {
            throw new Error("Request '/store/{storeId}/order/process_oms_order/{extOrderId}' missing required parameter extOrderId");
        }

        //allow use of param with or without underscore
        parameters['responseFormat'] = parameters['responseFormat'] || parameters['responseFormat'];
        if (parameters['responseFormat'] !== undefined) {
            queryParameters = queryParameters.set('responseFormat', parameters['responseFormat']);
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
     * Copy order for a given external order Id.
     * `@method`
     * `@name Order#copyOMSOrderByExternalOrderId`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} extOrderId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The external order identifier.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     */
    copyOMSOrderByExternalOrderId(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order/copy_oms_order/{extOrderId}';
        let requestUrl = domain + path;
        let method = 'POST';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.copyOMSOrderByExternalOrderId.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order/copy_oms_order/{extOrderId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['extOrderId'] = parameters['extOrderId'] || parameters['extOrderId'];
        parameters.pathParameters['extOrderId'] = parameters.pathParameters['extOrderId'] || parameters.pathParameters['extOrderId'];
        if (parameters.pathParameters['extOrderId'] === undefined) {
            parameters.pathParameters['extOrderId'] = parameters['extOrderId'];
        }
        requestUrl = requestUrl.replace('{extOrderId}', parameters.pathParameters['extOrderId']);

        if (parameters.pathParameters['extOrderId'] === undefined) {
            throw new Error("Request '/store/{storeId}/order/copy_oms_order/{extOrderId}' missing required parameter extOrderId");
        }

        //allow use of param with or without underscore
        parameters['responseFormat'] = parameters['responseFormat'] || parameters['responseFormat'];
        if (parameters['responseFormat'] !== undefined) {
            queryParameters = queryParameters.set('responseFormat', parameters['responseFormat']);
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
     * Find order by the parent order ID.
     * `@method`
     * `@name Order#findByParentOrderId`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
      ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.

     ** `@property {string} orderId (required)` The order identifier.
     ** `@property {string} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
     ** `@property {string} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
     */
    findByParentOrderId(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findByParentOrderId.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order' missing required parameter storeId");
        }

        queryParameters = queryParameters.set('q', 'findByParentOrderId');

        if (parameters['q'] === undefined) {
            throw new Error("Request '/store/{storeId}/order' missing required parameter q");
        }

        //allow use of param with or without underscore
        parameters['orderId'] = parameters['orderId'] || parameters['orderId'];
        if (parameters['orderId'] !== undefined) {
            queryParameters = queryParameters.set('orderId', parameters['orderId']);
        }

        if (parameters['orderId'] === undefined) {
            throw new Error("Request '/store/{storeId}/order' missing required parameter orderId");
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
     * Finds orders by a query. See each query for details on input and output.
     * `@method`
     * `@name Order#findByQuery`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} q (required)` The query name.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     */
    findByQuery(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findByQuery.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['q'] = parameters['q'] || parameters['q'];
        if (parameters['q'] !== undefined) {
            queryParameters = queryParameters.set('q', parameters['q']);
        }

        if (parameters['q'] === undefined) {
            throw new Error("Request '/store/{storeId}/order' missing required parameter q");
        }

        //allow use of param with or without underscore
        parameters['responseFormat'] = parameters['responseFormat'] || parameters['responseFormat'];
        if (parameters['responseFormat'] !== undefined) {
            queryParameters = queryParameters.set('responseFormat', parameters['responseFormat']);
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
     * Find order status by external order ID.
     * `@method`
     * `@name Order#findByStatusExt`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
      ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.

     ** `@property {string} extOrderId ` The external order identifier.
     ** `@property {string} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
     ** `@property {string} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
     ** `@property {string} recordSetTotal (required)` The total number of records in set.
     ** `@property {string} status (required)` The order status.
     */
    findByStatusExt(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findByStatusExt.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order' missing required parameter storeId");
        }

        queryParameters = queryParameters.set('q', 'findByStatusExt');

        if (parameters['q'] === undefined) {
            throw new Error("Request '/store/{storeId}/order' missing required parameter q");
        }

        //allow use of param with or without underscore
        parameters['extOrderId'] = parameters['extOrderId'] || parameters['extOrderId'];
        if (parameters['extOrderId'] !== undefined) {
            queryParameters = queryParameters.set('extOrderId', parameters['extOrderId']);
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
        parameters['recordSetTotal'] = parameters['recordSetTotal'] || parameters['recordSetTotal'];
        if (parameters['recordSetTotal'] !== undefined) {
            queryParameters = queryParameters.set('recordSetTotal', parameters['recordSetTotal']);
        }

        if (parameters['recordSetTotal'] === undefined) {
            throw new Error("Request '/store/{storeId}/order' missing required parameter recordSetTotal");
        }

        //allow use of param with or without underscore
        parameters['status'] = parameters['status'] || parameters['status'];
        if (parameters['status'] !== undefined) {
            queryParameters = queryParameters.set('status', parameters['status']);
        }

        if (parameters['status'] === undefined) {
            throw new Error("Request '/store/{storeId}/order' missing required parameter status");
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
     * Find child order by order item ID
     * `@method`
     * `@name Order#findChildOrderByOrderItemId`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
      ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.

     ** `@property {string} orderItemId (required)` The order item identifier.
     ** `@property {string} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
     ** `@property {string} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
     */
    findChildOrderByOrderItemId(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findChildOrderByOrderItemId.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order' missing required parameter storeId");
        }

        queryParameters = queryParameters.set('q', 'findChildOrderByOrderItemId');

        if (parameters['q'] === undefined) {
            throw new Error("Request '/store/{storeId}/order' missing required parameter q");
        }

        //allow use of param with or without underscore
        parameters['orderItemId'] = parameters['orderItemId'] || parameters['orderItemId'];
        if (parameters['orderItemId'] !== undefined) {
            queryParameters = queryParameters.set('orderItemId', parameters['orderItemId']);
        }

        if (parameters['orderItemId'] === undefined) {
            throw new Error("Request '/store/{storeId}/order' missing required parameter orderItemId");
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
     * Get an order item configuration by an order item ID.
     * `@method`
     * `@name Order#findConfigurationByOrderItemId`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
      ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.

     ** `@property {string} orderItemId (required)` The order item identifier.
     ** `@property {string} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
     ** `@property {string} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
     */
    findConfigurationByOrderItemId(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findConfigurationByOrderItemId.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order' missing required parameter storeId");
        }

        queryParameters = queryParameters.set('q', 'findConfigurationByOrderItemId');

        if (parameters['q'] === undefined) {
            throw new Error("Request '/store/{storeId}/order' missing required parameter q");
        }

        //allow use of param with or without underscore
        parameters['orderItemId'] = parameters['orderItemId'] || parameters['orderItemId'];
        if (parameters['orderItemId'] !== undefined) {
            queryParameters = queryParameters.set('orderItemId', parameters['orderItemId']);
        }

        if (parameters['orderItemId'] === undefined) {
            throw new Error("Request '/store/{storeId}/order' missing required parameter orderItemId");
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
     * Gets a list of orders by ORMOrder.
     * `@method`
     * `@name Order#findByORMOrder`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} ormOrder (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
     ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
     */
    findByORMOrder(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order/byORMOrder/{ORMOrder}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findByORMOrder.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order/byORMOrder/{ORMOrder}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['ormOrder'] = parameters['ormOrder'] || parameters['ORMOrder'];
        parameters.pathParameters['ormOrder'] = parameters.pathParameters['ormOrder'] || parameters.pathParameters['ORMOrder'];
        if (parameters.pathParameters['ormOrder'] === undefined) {
            parameters.pathParameters['ormOrder'] = parameters['ormOrder'];
        }
        requestUrl = requestUrl.replace('{ORMOrder}', parameters.pathParameters['ormOrder']);

        if (parameters.pathParameters['ormOrder'] === undefined) {
            throw new Error("Request '/store/{storeId}/order/byORMOrder/{ORMOrder}' missing required parameter ormOrder");
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
     * Find the profile order and its default payment and billing information.
     * `@method`
     * `@name Order#orderProfile`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
      ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} retrievalOrderStatus ` The order status to use for the retrieval of orders.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.

     ** `@property {integer} userId ` 
     */
    orderProfile(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.orderProfile.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['retrievalOrderStatus'] = parameters['retrievalOrderStatus'] || parameters['retrievalOrderStatus'];
        if (parameters['retrievalOrderStatus'] !== undefined) {
            queryParameters = queryParameters.set('retrievalOrderStatus', parameters['retrievalOrderStatus']);
        }

        //allow use of param with or without underscore
        parameters['profileName'] = parameters['profileName'] || parameters['profileName'];
        if (parameters['profileName'] !== undefined) {
            queryParameters = queryParameters.set('profileName', parameters['profileName']);
        }

        queryParameters = queryParameters.set('q', 'orderProfile');

        if (parameters['q'] === undefined) {
            throw new Error("Request '/store/{storeId}/order' missing required parameter q");
        }

        //allow use of param with or without underscore
        parameters['userId'] = parameters['userId'] || parameters['userId'];
        if (parameters['userId'] !== undefined) {
            queryParameters = queryParameters.set('userId', parameters['userId']);
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
     * Find promotions applied to order.
     * `@method`
     * `@name Order#findOrderPromotions`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
      ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} orderId (required)` The order identifier.


     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     */
    findOrderPromotions(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findOrderPromotions.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['orderId'] = parameters['orderId'] || parameters['orderId'];
        if (parameters['orderId'] !== undefined) {
            queryParameters = queryParameters.set('orderId', parameters['orderId']);
        }

        if (parameters['orderId'] === undefined) {
            throw new Error("Request '/store/{storeId}/order' missing required parameter orderId");
        }

        //allow use of param with or without underscore
        parameters['profileName'] = parameters['profileName'] || parameters['profileName'];
        if (parameters['profileName'] !== undefined) {
            queryParameters = queryParameters.set('profileName', parameters['profileName']);
        }

        queryParameters = queryParameters.set('q', 'findOrderPromotions');

        if (parameters['q'] === undefined) {
            throw new Error("Request '/store/{storeId}/order' missing required parameter q");
        }

        //allow use of param with or without underscore
        parameters['responseFormat'] = parameters['responseFormat'] || parameters['responseFormat'];
        if (parameters['responseFormat'] !== undefined) {
            queryParameters = queryParameters.set('responseFormat', parameters['responseFormat']);
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
     * This allows a CSR to find orders that he/she can work on behalf.
     * `@method`
     * `@name Order#ordersICanWorkonbehalf`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
      ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.


     ** `@property {string} orderByTableName ` The order by table name.
     ** `@property {string} orderByFieldName ` The order by field name.
     ** `@property {string} startIndex ` The starting index of the result.
     ** `@property {string} retrievePendingGuestOrders ` The flag of retrieving pending guest orders or not. Default value is false.
     ** `@property {string} maxResults ` The maximum number of results to be returned.
     */
    ordersICanWorkonbehalf(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.ordersICanWorkonbehalf.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['profileName'] = parameters['profileName'] || parameters['profileName'];
        if (parameters['profileName'] !== undefined) {
            queryParameters = queryParameters.set('profileName', parameters['profileName']);
        }

        queryParameters = queryParameters.set('q', 'ordersICanWorkonbehalf');

        if (parameters['q'] === undefined) {
            throw new Error("Request '/store/{storeId}/order' missing required parameter q");
        }

        //allow use of param with or without underscore
        parameters['orderByTableName'] = parameters['orderByTableName'] || parameters['orderByTableName'];
        if (parameters['orderByTableName'] !== undefined) {
            queryParameters = queryParameters.set('orderByTableName', parameters['orderByTableName']);
        }

        //allow use of param with or without underscore
        parameters['orderByFieldName'] = parameters['orderByFieldName'] || parameters['orderByFieldName'];
        if (parameters['orderByFieldName'] !== undefined) {
            queryParameters = queryParameters.set('orderByFieldName', parameters['orderByFieldName']);
        }

        //allow use of param with or without underscore
        parameters['startIndex'] = parameters['startIndex'] || parameters['startIndex'];
        if (parameters['startIndex'] !== undefined) {
            queryParameters = queryParameters.set('startIndex', parameters['startIndex']);
        }

        //allow use of param with or without underscore
        parameters['retrievePendingGuestOrders'] = parameters['retrievePendingGuestOrders'] || parameters['retrievePendingGuestOrders'];
        if (parameters['retrievePendingGuestOrders'] !== undefined) {
            queryParameters = queryParameters.set('retrievePendingGuestOrders', parameters['retrievePendingGuestOrders']);
        }

        //allow use of param with or without underscore
        parameters['maxResults'] = parameters['maxResults'] || parameters['maxResults'];
        if (parameters['maxResults'] !== undefined) {
            queryParameters = queryParameters.set('maxResults', parameters['maxResults']);
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
     * Add CSR comments to the order.
     * `@method`
     * `@name Order#addCSROrderComments`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} orderId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The order identifier.
     ** `@property {string} mode ` CSR add comment mode.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     ** `@property {any} body ` CSR comment body.
     */
    addCSROrderComments(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order/{orderId}/comment';
        let requestUrl = domain + path;
        let method = 'POST';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.addCSROrderComments.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order/{orderId}/comment' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['orderId'] = parameters['orderId'] || parameters['orderId'];
        parameters.pathParameters['orderId'] = parameters.pathParameters['orderId'] || parameters.pathParameters['orderId'];
        if (parameters.pathParameters['orderId'] === undefined) {
            parameters.pathParameters['orderId'] = parameters['orderId'];
        }
        requestUrl = requestUrl.replace('{orderId}', parameters.pathParameters['orderId']);

        if (parameters.pathParameters['orderId'] === undefined) {
            throw new Error("Request '/store/{storeId}/order/{orderId}/comment' missing required parameter orderId");
        }

        //allow use of param with or without underscore
        parameters['mode'] = parameters['mode'] || parameters['mode'];
        if (parameters['mode'] !== undefined) {
            queryParameters = queryParameters.set('mode', parameters['mode']);
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
     * Find the order comments for the specific order
     * `@method`
     * `@name Order#getOrderCommentsByOrderId`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} orderId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The order identifier.
     ** `@property {boolean} isAsc ` Returned order comment sorted ascending or not
     ** `@property {string} orderByField ` The order by filed name.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
     ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
     */
    getOrderCommentsByOrderId(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/order/{orderId}/comment';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.getOrderCommentsByOrderId.mocks.json';
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
            throw new Error("Request '/store/{storeId}/order/{orderId}/comment' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['orderId'] = parameters['orderId'] || parameters['orderId'];
        parameters.pathParameters['orderId'] = parameters.pathParameters['orderId'] || parameters.pathParameters['orderId'];
        if (parameters.pathParameters['orderId'] === undefined) {
            parameters.pathParameters['orderId'] = parameters['orderId'];
        }
        requestUrl = requestUrl.replace('{orderId}', parameters.pathParameters['orderId']);

        if (parameters.pathParameters['orderId'] === undefined) {
            throw new Error("Request '/store/{storeId}/order/{orderId}/comment' missing required parameter orderId");
        }

        //allow use of param with or without underscore
        parameters['isAsc'] = parameters['isAsc'] || parameters['isAsc'];
        if (parameters['isAsc'] !== undefined) {
            queryParameters = queryParameters.set('isAsc', parameters['isAsc']);
        }

        //allow use of param with or without underscore
        parameters['orderByField'] = parameters['orderByField'] || parameters['orderByField'];
        if (parameters['orderByField'] !== undefined) {
            queryParameters = queryParameters.set('orderByField', parameters['orderByField']);
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