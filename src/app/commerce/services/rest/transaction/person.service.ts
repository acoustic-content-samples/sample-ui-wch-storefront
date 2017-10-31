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

export class PersonService extends TransactionService {

    /**
     * Gets the account data for a registered user.
     * `@method`
     * `@name Person#findPersonBySelf`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     */
    findPersonBySelf(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/@self';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findPersonBySelf.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/@self' missing required parameter storeId");
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
     * Change language and currency preference in profile and in context
     * `@method`
     * `@name Person#changeLanguageCurrency`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     */
    changeLanguageCurrency(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/@self/languageCurrency';
        let requestUrl = domain + path;
        let method = 'PUT';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.changeLanguageCurrency.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/@self/languageCurrency' missing required parameter storeId");
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
     * This allows an administrator to find user information by user identifier.
     * `@method`
     * `@name Person#findByUserId`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} userId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The user identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_Display_Details
     */
    findByUserId(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/{userId}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findByUserId.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['userId'] = parameters['userId'] || parameters['userId'];
        parameters.pathParameters['userId'] = parameters.pathParameters['userId'] || parameters.pathParameters['userId'];
        if (parameters.pathParameters['userId'] === undefined) {
            parameters.pathParameters['userId'] = parameters['userId'];
        }
        requestUrl = requestUrl.replace('{userId}', parameters.pathParameters['userId']);

        if (parameters.pathParameters['userId'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter userId");
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
     * This allows an administrator to find user information by user identifier.
     * `@method`
     * `@name Person#findByUserIdWUserRegistrationDetailsProfileName`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} userId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The user identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_Display_Details
     */
    findByUserIdWUserRegistrationDetailsProfileName(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/{userId}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findByUserIdWUserRegistrationDetailsProfileName.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['userId'] = parameters['userId'] || parameters['userId'];
        parameters.pathParameters['userId'] = parameters.pathParameters['userId'] || parameters.pathParameters['userId'];
        if (parameters.pathParameters['userId'] === undefined) {
            parameters.pathParameters['userId'] = parameters['userId'];
        }
        requestUrl = requestUrl.replace('{userId}', parameters.pathParameters['userId']);

        if (parameters.pathParameters['userId'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter userId");
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
     * This allows an administrator to find user information by user identifier.
     * `@method`
     * `@name Person#findByUserIdWUserRegistrationSummaryProfileName`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} userId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The user identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_Display_Details
     */
    findByUserIdWUserRegistrationSummaryProfileName(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/{userId}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findByUserIdWUserRegistrationSummaryProfileName.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['userId'] = parameters['userId'] || parameters['userId'];
        parameters.pathParameters['userId'] = parameters.pathParameters['userId'] || parameters.pathParameters['userId'];
        if (parameters.pathParameters['userId'] === undefined) {
            parameters.pathParameters['userId'] = parameters['userId'];
        }
        requestUrl = requestUrl.replace('{userId}', parameters.pathParameters['userId']);

        if (parameters.pathParameters['userId'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter userId");
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
     * This allows an administrator to find user information by user identifier.
     * `@method`
     * `@name Person#findByUserIdWAssignedRolesDetailsProfileName`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} userId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The user identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_Display_Details
     */
    findByUserIdWAssignedRolesDetailsProfileName(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/{userId}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findByUserIdWAssignedRolesDetailsProfileName.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['userId'] = parameters['userId'] || parameters['userId'];
        parameters.pathParameters['userId'] = parameters.pathParameters['userId'] || parameters.pathParameters['userId'];
        if (parameters.pathParameters['userId'] === undefined) {
            parameters.pathParameters['userId'] = parameters['userId'];
        }
        requestUrl = requestUrl.replace('{userId}', parameters.pathParameters['userId']);

        if (parameters.pathParameters['userId'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter userId");
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
     * This allows an administrator to find user information by user identifier.
     * `@method`
     * `@name Person#findByUserIdWUserTopLevelOrganizationsAdministered`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} userId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The user identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_Display_Details
     */
    findByUserIdWUserTopLevelOrganizationsAdministered(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/{userId}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findByUserIdWUserTopLevelOrganizationsAdministered.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['userId'] = parameters['userId'] || parameters['userId'];
        parameters.pathParameters['userId'] = parameters.pathParameters['userId'] || parameters.pathParameters['userId'];
        if (parameters.pathParameters['userId'] === undefined) {
            parameters.pathParameters['userId'] = parameters['userId'];
        }
        requestUrl = requestUrl.replace('{userId}', parameters.pathParameters['userId']);

        if (parameters.pathParameters['userId'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter userId");
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
     * This allows an administrator to find user information by user identifier.
     * `@method`
     * `@name Person#findByUserIdWRolesOfUserAllProfileName`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} userId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The user identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_Display_Details
     */
    findByUserIdWRolesOfUserAllProfileName(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/{userId}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findByUserIdWRolesOfUserAllProfileName.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['userId'] = parameters['userId'] || parameters['userId'];
        parameters.pathParameters['userId'] = parameters.pathParameters['userId'] || parameters.pathParameters['userId'];
        if (parameters.pathParameters['userId'] === undefined) {
            parameters.pathParameters['userId'] = parameters['userId'];
        }
        requestUrl = requestUrl.replace('{userId}', parameters.pathParameters['userId']);

        if (parameters.pathParameters['userId'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter userId");
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
     * This allows an administrator to find user information by user identifier.
     * `@method`
     * `@name Person#findByUserIdWRolesOfUserInOrgsICanAdminProfileName`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} userId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The user identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_Display_Details
     */
    findByUserIdWRolesOfUserInOrgsICanAdminProfileName(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/{userId}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findByUserIdWRolesOfUserInOrgsICanAdminProfileName.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['userId'] = parameters['userId'] || parameters['userId'];
        parameters.pathParameters['userId'] = parameters.pathParameters['userId'] || parameters.pathParameters['userId'];
        if (parameters.pathParameters['userId'] === undefined) {
            parameters.pathParameters['userId'] = parameters['userId'];
        }
        requestUrl = requestUrl.replace('{userId}', parameters.pathParameters['userId']);

        if (parameters.pathParameters['userId'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter userId");
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
     * This allows an administrator to find users in organizations that he/she can administer.
     * `@method`
     * `@name Person#usersICanAdmin`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
      ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_List_Summary
     ** `@property {string} parentOrgName ` The parent organization name.
     ** `@property {string} roleId ` The role ID.

     ** `@property {string} accountStatus ` The account status.
     ** `@property {string} parentOrgId ` The parent organization ID.
     ** `@property {string} orderByTableName ` The order by table name.
     ** `@property {string} orderByFieldName ` The order by field name.
     ** `@property {string} startIndex ` The starting index of the result.
     ** `@property {string} maxResults ` The maximum number of results to be returned.
     */
    usersICanAdmin(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.usersICanAdmin.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['profileName'] = parameters['profileName'] || parameters['profileName'];
        if (parameters['profileName'] !== undefined) {
            queryParameters = queryParameters.set('profileName', parameters['profileName']);
        }

        //allow use of param with or without underscore
        parameters['parentOrgName'] = parameters['parentOrgName'] || parameters['parentOrgName'];
        if (parameters['parentOrgName'] !== undefined) {
            queryParameters = queryParameters.set('parentOrgName', parameters['parentOrgName']);
        }

        //allow use of param with or without underscore
        parameters['roleId'] = parameters['roleId'] || parameters['roleId'];
        if (parameters['roleId'] !== undefined) {
            queryParameters = queryParameters.set('roleId', parameters['roleId']);
        }

        queryParameters = queryParameters.set('q', 'usersICanAdmin');

        if (parameters['q'] === undefined) {
            throw new Error("Request '/store/{storeId}/person' missing required parameter q");
        }

        //allow use of param with or without underscore
        parameters['accountStatus'] = parameters['accountStatus'] || parameters['accountStatus'];
        if (parameters['accountStatus'] !== undefined) {
            queryParameters = queryParameters.set('accountStatus', parameters['accountStatus']);
        }

        //allow use of param with or without underscore
        parameters['parentOrgId'] = parameters['parentOrgId'] || parameters['parentOrgId'];
        if (parameters['parentOrgId'] !== undefined) {
            queryParameters = queryParameters.set('parentOrgId', parameters['parentOrgId']);
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
     * This allows CSR/CSS to find approved registered users in store organizations that he/she can manage.
     * `@method`
     * `@name Person#registeredUsersICanManage`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
      ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_List_Summary

     ** `@property {string} orderByTableName ` The order by table name.
     ** `@property {string} orderByFieldName ` The order by field name.
     ** `@property {string} startIndex ` The starting index of the result.
     ** `@property {string} maxResults ` The maximum number of results to be returned.
     ** `@property {string} logonId ` Logon Id of the customer to search for.
     ** `@property {string} logonIdSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} parentOrgName ` Parent organization name to search buyers. Only used in B2B store.
     ** `@property {string} parentOrgNameSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} firstName ` First name of the customer to search for.
     ** `@property {string} firstNameSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} firstName ` First name of the customer to search for.
     ** `@property {string} firstNameSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} lastName ` Last name of the customer to search for.
     ** `@property {string} lastNameSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} middleName ` Middle name of the customer to search for.
     ** `@property {string} middleNameSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} address1 ` Address line 1 of the customer to search for.
     ** `@property {string} address1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} city ` The city name of the customer to search for.
     ** `@property {string} citySearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} country ` The country or region name of the customer to search for.
     ** `@property {string} countrySearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} email1 ` The primary e-mail address of the customer to search for.
     ** `@property {string} email1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} email2 ` The secondary e-mail address of the customer to search for.
     ** `@property {string} email2SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} fax1 ` The primary fax number of the customer to search for.
     ** `@property {string} fax1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} fax2 ` The secondary fax number of the customer to search for.
     ** `@property {string} fax2SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} field1 ` Customizable field1 to search for.
     ** `@property {string} field1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} field2 ` Customizable field1 to search for.
     ** `@property {string} field2SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} phone1 ` The primary phone number of the customer to search for.
     ** `@property {string} phone1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} phone2 ` The secondary phone number of the customer to search for.
     ** `@property {string} phone2SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} state ` The state or province name of the customer to search for.
     ** `@property {string} stateSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} zipcode `  ZIP or postal code of the customer to search for.
     ** `@property {string} zipcodeSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     */
    registeredUsersICanManage(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.registeredUsersICanManage.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['profileName'] = parameters['profileName'] || parameters['profileName'];
        if (parameters['profileName'] !== undefined) {
            queryParameters = queryParameters.set('profileName', parameters['profileName']);
        }

        queryParameters = queryParameters.set('q', 'registeredUsersICanManage');

        if (parameters['q'] === undefined) {
            throw new Error("Request '/store/{storeId}/person' missing required parameter q");
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
        parameters['maxResults'] = parameters['maxResults'] || parameters['maxResults'];
        if (parameters['maxResults'] !== undefined) {
            queryParameters = queryParameters.set('maxResults', parameters['maxResults']);
        }

        //allow use of param with or without underscore
        parameters['logonId'] = parameters['logonId'] || parameters['logonId'];
        if (parameters['logonId'] !== undefined) {
            queryParameters = queryParameters.set('logonId', parameters['logonId']);
        }

        //allow use of param with or without underscore
        parameters['logonIdSearchType'] = parameters['logonIdSearchType'] || parameters['logonIdSearchType'];
        if (parameters['logonIdSearchType'] !== undefined) {
            queryParameters = queryParameters.set('logonIdSearchType', parameters['logonIdSearchType']);
        }

        //allow use of param with or without underscore
        parameters['parentOrgName'] = parameters['parentOrgName'] || parameters['parentOrgName'];
        if (parameters['parentOrgName'] !== undefined) {
            queryParameters = queryParameters.set('parentOrgName', parameters['parentOrgName']);
        }

        //allow use of param with or without underscore
        parameters['parentOrgNameSearchType'] = parameters['parentOrgNameSearchType'] || parameters['parentOrgNameSearchType'];
        if (parameters['parentOrgNameSearchType'] !== undefined) {
            queryParameters = queryParameters.set('parentOrgNameSearchType', parameters['parentOrgNameSearchType']);
        }

        //allow use of param with or without underscore
        parameters['firstName'] = parameters['firstName'] || parameters['firstName'];
        if (parameters['firstName'] !== undefined) {
            queryParameters = queryParameters.set('firstName', parameters['firstName']);
        }

        //allow use of param with or without underscore
        parameters['firstNameSearchType'] = parameters['firstNameSearchType'] || parameters['firstNameSearchType'];
        if (parameters['firstNameSearchType'] !== undefined) {
            queryParameters = queryParameters.set('firstNameSearchType', parameters['firstNameSearchType']);
        }

        //allow use of param with or without underscore
        parameters['firstName'] = parameters['firstName'] || parameters['firstName'];
        if (parameters['firstName'] !== undefined) {
            queryParameters = queryParameters.set('firstName', parameters['firstName']);
        }

        //allow use of param with or without underscore
        parameters['firstNameSearchType'] = parameters['firstNameSearchType'] || parameters['firstNameSearchType'];
        if (parameters['firstNameSearchType'] !== undefined) {
            queryParameters = queryParameters.set('firstNameSearchType', parameters['firstNameSearchType']);
        }

        //allow use of param with or without underscore
        parameters['lastName'] = parameters['lastName'] || parameters['lastName'];
        if (parameters['lastName'] !== undefined) {
            queryParameters = queryParameters.set('lastName', parameters['lastName']);
        }

        //allow use of param with or without underscore
        parameters['lastNameSearchType'] = parameters['lastNameSearchType'] || parameters['lastNameSearchType'];
        if (parameters['lastNameSearchType'] !== undefined) {
            queryParameters = queryParameters.set('lastNameSearchType', parameters['lastNameSearchType']);
        }

        //allow use of param with or without underscore
        parameters['middleName'] = parameters['middleName'] || parameters['middleName'];
        if (parameters['middleName'] !== undefined) {
            queryParameters = queryParameters.set('middleName', parameters['middleName']);
        }

        //allow use of param with or without underscore
        parameters['middleNameSearchType'] = parameters['middleNameSearchType'] || parameters['middleNameSearchType'];
        if (parameters['middleNameSearchType'] !== undefined) {
            queryParameters = queryParameters.set('middleNameSearchType', parameters['middleNameSearchType']);
        }

        //allow use of param with or without underscore
        parameters['address1'] = parameters['address1'] || parameters['address1'];
        if (parameters['address1'] !== undefined) {
            queryParameters = queryParameters.set('address1', parameters['address1']);
        }

        //allow use of param with or without underscore
        parameters['address1SearchType'] = parameters['address1SearchType'] || parameters['address1SearchType'];
        if (parameters['address1SearchType'] !== undefined) {
            queryParameters = queryParameters.set('address1SearchType', parameters['address1SearchType']);
        }

        //allow use of param with or without underscore
        parameters['city'] = parameters['city'] || parameters['city'];
        if (parameters['city'] !== undefined) {
            queryParameters = queryParameters.set('city', parameters['city']);
        }

        //allow use of param with or without underscore
        parameters['citySearchType'] = parameters['citySearchType'] || parameters['citySearchType'];
        if (parameters['citySearchType'] !== undefined) {
            queryParameters = queryParameters.set('citySearchType', parameters['citySearchType']);
        }

        //allow use of param with or without underscore
        parameters['country'] = parameters['country'] || parameters['country'];
        if (parameters['country'] !== undefined) {
            queryParameters = queryParameters.set('country', parameters['country']);
        }

        //allow use of param with or without underscore
        parameters['countrySearchType'] = parameters['countrySearchType'] || parameters['countrySearchType'];
        if (parameters['countrySearchType'] !== undefined) {
            queryParameters = queryParameters.set('countrySearchType', parameters['countrySearchType']);
        }

        //allow use of param with or without underscore
        parameters['email1'] = parameters['email1'] || parameters['email1'];
        if (parameters['email1'] !== undefined) {
            queryParameters = queryParameters.set('email1', parameters['email1']);
        }

        //allow use of param with or without underscore
        parameters['email1SearchType'] = parameters['email1SearchType'] || parameters['email1SearchType'];
        if (parameters['email1SearchType'] !== undefined) {
            queryParameters = queryParameters.set('email1SearchType', parameters['email1SearchType']);
        }

        //allow use of param with or without underscore
        parameters['email2'] = parameters['email2'] || parameters['email2'];
        if (parameters['email2'] !== undefined) {
            queryParameters = queryParameters.set('email2', parameters['email2']);
        }

        //allow use of param with or without underscore
        parameters['email2SearchType'] = parameters['email2SearchType'] || parameters['email2SearchType'];
        if (parameters['email2SearchType'] !== undefined) {
            queryParameters = queryParameters.set('email2SearchType', parameters['email2SearchType']);
        }

        //allow use of param with or without underscore
        parameters['fax1'] = parameters['fax1'] || parameters['fax1'];
        if (parameters['fax1'] !== undefined) {
            queryParameters = queryParameters.set('fax1', parameters['fax1']);
        }

        //allow use of param with or without underscore
        parameters['fax1SearchType'] = parameters['fax1SearchType'] || parameters['fax1SearchType'];
        if (parameters['fax1SearchType'] !== undefined) {
            queryParameters = queryParameters.set('fax1SearchType', parameters['fax1SearchType']);
        }

        //allow use of param with or without underscore
        parameters['fax2'] = parameters['fax2'] || parameters['fax2'];
        if (parameters['fax2'] !== undefined) {
            queryParameters = queryParameters.set('fax2', parameters['fax2']);
        }

        //allow use of param with or without underscore
        parameters['fax2SearchType'] = parameters['fax2SearchType'] || parameters['fax2SearchType'];
        if (parameters['fax2SearchType'] !== undefined) {
            queryParameters = queryParameters.set('fax2SearchType', parameters['fax2SearchType']);
        }

        //allow use of param with or without underscore
        parameters['field1'] = parameters['field1'] || parameters['field1'];
        if (parameters['field1'] !== undefined) {
            queryParameters = queryParameters.set('field1', parameters['field1']);
        }

        //allow use of param with or without underscore
        parameters['field1SearchType'] = parameters['field1SearchType'] || parameters['field1SearchType'];
        if (parameters['field1SearchType'] !== undefined) {
            queryParameters = queryParameters.set('field1SearchType', parameters['field1SearchType']);
        }

        //allow use of param with or without underscore
        parameters['field2'] = parameters['field2'] || parameters['field2'];
        if (parameters['field2'] !== undefined) {
            queryParameters = queryParameters.set('field2', parameters['field2']);
        }

        //allow use of param with or without underscore
        parameters['field2SearchType'] = parameters['field2SearchType'] || parameters['field2SearchType'];
        if (parameters['field2SearchType'] !== undefined) {
            queryParameters = queryParameters.set('field2SearchType', parameters['field2SearchType']);
        }

        //allow use of param with or without underscore
        parameters['phone1'] = parameters['phone1'] || parameters['phone1'];
        if (parameters['phone1'] !== undefined) {
            queryParameters = queryParameters.set('phone1', parameters['phone1']);
        }

        //allow use of param with or without underscore
        parameters['phone1SearchType'] = parameters['phone1SearchType'] || parameters['phone1SearchType'];
        if (parameters['phone1SearchType'] !== undefined) {
            queryParameters = queryParameters.set('phone1SearchType', parameters['phone1SearchType']);
        }

        //allow use of param with or without underscore
        parameters['phone2'] = parameters['phone2'] || parameters['phone2'];
        if (parameters['phone2'] !== undefined) {
            queryParameters = queryParameters.set('phone2', parameters['phone2']);
        }

        //allow use of param with or without underscore
        parameters['phone2SearchType'] = parameters['phone2SearchType'] || parameters['phone2SearchType'];
        if (parameters['phone2SearchType'] !== undefined) {
            queryParameters = queryParameters.set('phone2SearchType', parameters['phone2SearchType']);
        }

        //allow use of param with or without underscore
        parameters['state'] = parameters['state'] || parameters['state'];
        if (parameters['state'] !== undefined) {
            queryParameters = queryParameters.set('state', parameters['state']);
        }

        //allow use of param with or without underscore
        parameters['stateSearchType'] = parameters['stateSearchType'] || parameters['stateSearchType'];
        if (parameters['stateSearchType'] !== undefined) {
            queryParameters = queryParameters.set('stateSearchType', parameters['stateSearchType']);
        }

        //allow use of param with or without underscore
        parameters['zipcode'] = parameters['zipcode'] || parameters['zipcode'];
        if (parameters['zipcode'] !== undefined) {
            queryParameters = queryParameters.set('zipcode', parameters['zipcode']);
        }

        //allow use of param with or without underscore
        parameters['zipcodeSearchType'] = parameters['zipcodeSearchType'] || parameters['zipcodeSearchType'];
        if (parameters['zipcodeSearchType'] !== undefined) {
            queryParameters = queryParameters.set('zipcodeSearchType', parameters['zipcodeSearchType']);
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
     * This allows an administrator to find users in organizations that he/she can administer.
     * `@method`
     * `@name Person#usersICanAdminWUserListDetailsProfileName`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_List_Summary
     ** `@property {string} parentOrgName ` The parent organization name.
     ** `@property {string} roleId ` The role ID.
     ** `@property {string} accountStatus ` The account status.
     ** `@property {string} parentOrgId ` The parent organization ID.
     ** `@property {string} orderByTableName ` The order by table name.
     ** `@property {string} orderByFieldName ` The order by field name.
     ** `@property {string} startIndex ` The starting index of the result.
     ** `@property {string} maxResults ` The maximum number of results to be returned.
     */
    usersICanAdminWUserListDetailsProfileName(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.usersICanAdminWUserListDetailsProfileName.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['profileName'] = parameters['profileName'] || parameters['profileName'];
        if (parameters['profileName'] !== undefined) {
            queryParameters = queryParameters.set('profileName', parameters['profileName']);
        }

        //allow use of param with or without underscore
        parameters['parentOrgName'] = parameters['parentOrgName'] || parameters['parentOrgName'];
        if (parameters['parentOrgName'] !== undefined) {
            queryParameters = queryParameters.set('parentOrgName', parameters['parentOrgName']);
        }

        //allow use of param with or without underscore
        parameters['roleId'] = parameters['roleId'] || parameters['roleId'];
        if (parameters['roleId'] !== undefined) {
            queryParameters = queryParameters.set('roleId', parameters['roleId']);
        }

        //allow use of param with or without underscore
        parameters['accountStatus'] = parameters['accountStatus'] || parameters['accountStatus'];
        if (parameters['accountStatus'] !== undefined) {
            queryParameters = queryParameters.set('accountStatus', parameters['accountStatus']);
        }

        //allow use of param with or without underscore
        parameters['parentOrgId'] = parameters['parentOrgId'] || parameters['parentOrgId'];
        if (parameters['parentOrgId'] !== undefined) {
            queryParameters = queryParameters.set('parentOrgId', parameters['parentOrgId']);
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
     * This allows CSR/CSS to find approved registered users in store organizations that he/she can manage.
     * `@method`
     * `@name Person#registeredUsersICanManageWUserListDetailsProfileName`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_User_List_Summary
     ** `@property {string} orderByTableName ` The order by table name.
     ** `@property {string} orderByFieldName ` The order by field name.
     ** `@property {string} startIndex ` The starting index of the result.
     ** `@property {string} maxResults ` The maximum number of results to be returned.
     ** `@property {string} logonId ` Logon Id of the customer to search for.
     ** `@property {string} logonIdSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} parentOrgName ` Parent organization name to search buyers. Only used in B2B store.
     ** `@property {string} parentOrgNameSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} firstName ` First name of the customer to search for.
     ** `@property {string} firstNameSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} firstName ` First name of the customer to search for.
     ** `@property {string} firstNameSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} lastName ` Last name of the customer to search for.
     ** `@property {string} lastNameSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} middleName ` Middle name of the customer to search for.
     ** `@property {string} middleNameSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} address1 ` Address line 1 of the customer to search for.
     ** `@property {string} address1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} city ` The city name of the customer to search for.
     ** `@property {string} citySearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} country ` The country or region name of the customer to search for.
     ** `@property {string} countrySearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} email1 ` The primary e-mail address of the customer to search for.
     ** `@property {string} email1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} email2 ` The secondary e-mail address of the customer to search for.
     ** `@property {string} email2SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} fax1 ` The primary fax number of the customer to search for.
     ** `@property {string} fax1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} fax2 ` The secondary fax number of the customer to search for.
     ** `@property {string} fax2SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} field1 ` Customizable field1 to search for.
     ** `@property {string} field1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} field2 ` Customizable field1 to search for.
     ** `@property {string} field2SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} phone1 ` The primary phone number of the customer to search for.
     ** `@property {string} phone1SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} phone2 ` The secondary phone number of the customer to search for.
     ** `@property {string} phone2SearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} state ` The state or province name of the customer to search for.
     ** `@property {string} stateSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     ** `@property {string} zipcode `  ZIP or postal code of the customer to search for.
     ** `@property {string} zipcodeSearchType ` The search type. The valid values are 1 (case sensitive and starts with), 2(case sensitive and contains), 3(case insensitive and starts with),4(case insensitive and contains), 5(case sensitive and exact match), 6(case insensitive and exact match),8(not equals)
     */
    registeredUsersICanManageWUserListDetailsProfileName(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.registeredUsersICanManageWUserListDetailsProfileName.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['profileName'] = parameters['profileName'] || parameters['profileName'];
        if (parameters['profileName'] !== undefined) {
            queryParameters = queryParameters.set('profileName', parameters['profileName']);
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
        parameters['maxResults'] = parameters['maxResults'] || parameters['maxResults'];
        if (parameters['maxResults'] !== undefined) {
            queryParameters = queryParameters.set('maxResults', parameters['maxResults']);
        }

        //allow use of param with or without underscore
        parameters['logonId'] = parameters['logonId'] || parameters['logonId'];
        if (parameters['logonId'] !== undefined) {
            queryParameters = queryParameters.set('logonId', parameters['logonId']);
        }

        //allow use of param with or without underscore
        parameters['logonIdSearchType'] = parameters['logonIdSearchType'] || parameters['logonIdSearchType'];
        if (parameters['logonIdSearchType'] !== undefined) {
            queryParameters = queryParameters.set('logonIdSearchType', parameters['logonIdSearchType']);
        }

        //allow use of param with or without underscore
        parameters['parentOrgName'] = parameters['parentOrgName'] || parameters['parentOrgName'];
        if (parameters['parentOrgName'] !== undefined) {
            queryParameters = queryParameters.set('parentOrgName', parameters['parentOrgName']);
        }

        //allow use of param with or without underscore
        parameters['parentOrgNameSearchType'] = parameters['parentOrgNameSearchType'] || parameters['parentOrgNameSearchType'];
        if (parameters['parentOrgNameSearchType'] !== undefined) {
            queryParameters = queryParameters.set('parentOrgNameSearchType', parameters['parentOrgNameSearchType']);
        }

        //allow use of param with or without underscore
        parameters['firstName'] = parameters['firstName'] || parameters['firstName'];
        if (parameters['firstName'] !== undefined) {
            queryParameters = queryParameters.set('firstName', parameters['firstName']);
        }

        //allow use of param with or without underscore
        parameters['firstNameSearchType'] = parameters['firstNameSearchType'] || parameters['firstNameSearchType'];
        if (parameters['firstNameSearchType'] !== undefined) {
            queryParameters = queryParameters.set('firstNameSearchType', parameters['firstNameSearchType']);
        }

        //allow use of param with or without underscore
        parameters['firstName'] = parameters['firstName'] || parameters['firstName'];
        if (parameters['firstName'] !== undefined) {
            queryParameters = queryParameters.set('firstName', parameters['firstName']);
        }

        //allow use of param with or without underscore
        parameters['firstNameSearchType'] = parameters['firstNameSearchType'] || parameters['firstNameSearchType'];
        if (parameters['firstNameSearchType'] !== undefined) {
            queryParameters = queryParameters.set('firstNameSearchType', parameters['firstNameSearchType']);
        }

        //allow use of param with or without underscore
        parameters['lastName'] = parameters['lastName'] || parameters['lastName'];
        if (parameters['lastName'] !== undefined) {
            queryParameters = queryParameters.set('lastName', parameters['lastName']);
        }

        //allow use of param with or without underscore
        parameters['lastNameSearchType'] = parameters['lastNameSearchType'] || parameters['lastNameSearchType'];
        if (parameters['lastNameSearchType'] !== undefined) {
            queryParameters = queryParameters.set('lastNameSearchType', parameters['lastNameSearchType']);
        }

        //allow use of param with or without underscore
        parameters['middleName'] = parameters['middleName'] || parameters['middleName'];
        if (parameters['middleName'] !== undefined) {
            queryParameters = queryParameters.set('middleName', parameters['middleName']);
        }

        //allow use of param with or without underscore
        parameters['middleNameSearchType'] = parameters['middleNameSearchType'] || parameters['middleNameSearchType'];
        if (parameters['middleNameSearchType'] !== undefined) {
            queryParameters = queryParameters.set('middleNameSearchType', parameters['middleNameSearchType']);
        }

        //allow use of param with or without underscore
        parameters['address1'] = parameters['address1'] || parameters['address1'];
        if (parameters['address1'] !== undefined) {
            queryParameters = queryParameters.set('address1', parameters['address1']);
        }

        //allow use of param with or without underscore
        parameters['address1SearchType'] = parameters['address1SearchType'] || parameters['address1SearchType'];
        if (parameters['address1SearchType'] !== undefined) {
            queryParameters = queryParameters.set('address1SearchType', parameters['address1SearchType']);
        }

        //allow use of param with or without underscore
        parameters['city'] = parameters['city'] || parameters['city'];
        if (parameters['city'] !== undefined) {
            queryParameters = queryParameters.set('city', parameters['city']);
        }

        //allow use of param with or without underscore
        parameters['citySearchType'] = parameters['citySearchType'] || parameters['citySearchType'];
        if (parameters['citySearchType'] !== undefined) {
            queryParameters = queryParameters.set('citySearchType', parameters['citySearchType']);
        }

        //allow use of param with or without underscore
        parameters['country'] = parameters['country'] || parameters['country'];
        if (parameters['country'] !== undefined) {
            queryParameters = queryParameters.set('country', parameters['country']);
        }

        //allow use of param with or without underscore
        parameters['countrySearchType'] = parameters['countrySearchType'] || parameters['countrySearchType'];
        if (parameters['countrySearchType'] !== undefined) {
            queryParameters = queryParameters.set('countrySearchType', parameters['countrySearchType']);
        }

        //allow use of param with or without underscore
        parameters['email1'] = parameters['email1'] || parameters['email1'];
        if (parameters['email1'] !== undefined) {
            queryParameters = queryParameters.set('email1', parameters['email1']);
        }

        //allow use of param with or without underscore
        parameters['email1SearchType'] = parameters['email1SearchType'] || parameters['email1SearchType'];
        if (parameters['email1SearchType'] !== undefined) {
            queryParameters = queryParameters.set('email1SearchType', parameters['email1SearchType']);
        }

        //allow use of param with or without underscore
        parameters['email2'] = parameters['email2'] || parameters['email2'];
        if (parameters['email2'] !== undefined) {
            queryParameters = queryParameters.set('email2', parameters['email2']);
        }

        //allow use of param with or without underscore
        parameters['email2SearchType'] = parameters['email2SearchType'] || parameters['email2SearchType'];
        if (parameters['email2SearchType'] !== undefined) {
            queryParameters = queryParameters.set('email2SearchType', parameters['email2SearchType']);
        }

        //allow use of param with or without underscore
        parameters['fax1'] = parameters['fax1'] || parameters['fax1'];
        if (parameters['fax1'] !== undefined) {
            queryParameters = queryParameters.set('fax1', parameters['fax1']);
        }

        //allow use of param with or without underscore
        parameters['fax1SearchType'] = parameters['fax1SearchType'] || parameters['fax1SearchType'];
        if (parameters['fax1SearchType'] !== undefined) {
            queryParameters = queryParameters.set('fax1SearchType', parameters['fax1SearchType']);
        }

        //allow use of param with or without underscore
        parameters['fax2'] = parameters['fax2'] || parameters['fax2'];
        if (parameters['fax2'] !== undefined) {
            queryParameters = queryParameters.set('fax2', parameters['fax2']);
        }

        //allow use of param with or without underscore
        parameters['fax2SearchType'] = parameters['fax2SearchType'] || parameters['fax2SearchType'];
        if (parameters['fax2SearchType'] !== undefined) {
            queryParameters = queryParameters.set('fax2SearchType', parameters['fax2SearchType']);
        }

        //allow use of param with or without underscore
        parameters['field1'] = parameters['field1'] || parameters['field1'];
        if (parameters['field1'] !== undefined) {
            queryParameters = queryParameters.set('field1', parameters['field1']);
        }

        //allow use of param with or without underscore
        parameters['field1SearchType'] = parameters['field1SearchType'] || parameters['field1SearchType'];
        if (parameters['field1SearchType'] !== undefined) {
            queryParameters = queryParameters.set('field1SearchType', parameters['field1SearchType']);
        }

        //allow use of param with or without underscore
        parameters['field2'] = parameters['field2'] || parameters['field2'];
        if (parameters['field2'] !== undefined) {
            queryParameters = queryParameters.set('field2', parameters['field2']);
        }

        //allow use of param with or without underscore
        parameters['field2SearchType'] = parameters['field2SearchType'] || parameters['field2SearchType'];
        if (parameters['field2SearchType'] !== undefined) {
            queryParameters = queryParameters.set('field2SearchType', parameters['field2SearchType']);
        }

        //allow use of param with or without underscore
        parameters['phone1'] = parameters['phone1'] || parameters['phone1'];
        if (parameters['phone1'] !== undefined) {
            queryParameters = queryParameters.set('phone1', parameters['phone1']);
        }

        //allow use of param with or without underscore
        parameters['phone1SearchType'] = parameters['phone1SearchType'] || parameters['phone1SearchType'];
        if (parameters['phone1SearchType'] !== undefined) {
            queryParameters = queryParameters.set('phone1SearchType', parameters['phone1SearchType']);
        }

        //allow use of param with or without underscore
        parameters['phone2'] = parameters['phone2'] || parameters['phone2'];
        if (parameters['phone2'] !== undefined) {
            queryParameters = queryParameters.set('phone2', parameters['phone2']);
        }

        //allow use of param with or without underscore
        parameters['phone2SearchType'] = parameters['phone2SearchType'] || parameters['phone2SearchType'];
        if (parameters['phone2SearchType'] !== undefined) {
            queryParameters = queryParameters.set('phone2SearchType', parameters['phone2SearchType']);
        }

        //allow use of param with or without underscore
        parameters['state'] = parameters['state'] || parameters['state'];
        if (parameters['state'] !== undefined) {
            queryParameters = queryParameters.set('state', parameters['state']);
        }

        //allow use of param with or without underscore
        parameters['stateSearchType'] = parameters['stateSearchType'] || parameters['stateSearchType'];
        if (parameters['stateSearchType'] !== undefined) {
            queryParameters = queryParameters.set('stateSearchType', parameters['stateSearchType']);
        }

        //allow use of param with or without underscore
        parameters['zipcode'] = parameters['zipcode'] || parameters['zipcode'];
        if (parameters['zipcode'] !== undefined) {
            queryParameters = queryParameters.set('zipcode', parameters['zipcode']);
        }

        //allow use of param with or without underscore
        parameters['zipcodeSearchType'] = parameters['zipcodeSearchType'] || parameters['zipcodeSearchType'];
        if (parameters['zipcodeSearchType'] !== undefined) {
            queryParameters = queryParameters.set('zipcodeSearchType', parameters['zipcodeSearchType']);
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
     * This allows an administrator to find users based on a query name. See each query for details on input and output.
     * `@method`
     * `@name Person#findByQuery`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
      ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.

     */
    findByQuery(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person';
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
            throw new Error("Request '/store/{storeId}/person' missing required parameter storeId");
        }

        queryParameters = queryParameters.set('q', 'usersICanAdmin');

        if (parameters['q'] === undefined) {
            throw new Error("Request '/store/{storeId}/person' missing required parameter q");
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
     * Find personal opt-out.  When the store level personal opt-out does not exist, the site level personal opt-out is returned.
     * `@method`
     * `@name Person#findOptOutBySelf`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_optOut_email
     */
    findOptOutBySelf(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/@self/optOut';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findOptOutBySelf.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/@self/optOut' missing required parameter storeId");
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
     * Find personal opt-out.  When the store level personal opt-out does not exist, the site level personal opt-out is returned.
     * `@method`
     * `@name Person#findOptOutBySelfWOptOutSmsProfileName`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_optOut_email
     */
    findOptOutBySelfWOptOutSmsProfileName(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/@self/optOut';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findOptOutBySelfWOptOutSmsProfileName.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/@self/optOut' missing required parameter storeId");
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
     * Find personal opt-out.  When the store level personal opt-out does not exist, the site level personal opt-out is returned.
     * `@method`
     * `@name Person#findOptOutBySelfWOptOutAllProfileName`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a query.  Default profile name = IBM_optOut_email
     */
    findOptOutBySelfWOptOutAllProfileName(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/@self/optOut';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.findOptOutBySelfWOptOutAllProfileName.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/@self/optOut' missing required parameter storeId");
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
     * Registers a new user.  When mode is set to admin, the register is done by an administrator.
     * `@method`
     * `@name Person#registerPerson`
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
     ** `@property {string} mode ` The mode of the rest service. Default value is 'self'.
     */
    registerPerson(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person';
        let requestUrl = domain + path;
        let method = 'POST';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.registerPerson.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person' missing required parameter storeId");
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
        parameters['mode'] = parameters['mode'] || parameters['mode'];
        if (parameters['mode'] !== undefined) {
            queryParameters = queryParameters.set('mode', parameters['mode']);
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
     * Registers a new user.  When mode is set to admin, the register is done by an administrator.
     * `@method`
     * `@name Person#registerPersonOnUserRegistrationAdminAdd`
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
     ** `@property {string} mode ` The mode of the rest service.
     */
    registerPersonOnUserRegistrationAdminAdd(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person';
        let requestUrl = domain + path;
        let method = 'POST';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.registerPersonOnUserRegistrationAdminAdd.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person' missing required parameter storeId");
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
        parameters['mode'] = parameters['mode'] || parameters['mode'];
        if (parameters['mode'] !== undefined) {
            queryParameters = queryParameters.set('mode', parameters['mode']);
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
     * Updates account data for a registered user.  This also supports resetting password for unauthenticated and authenticated users. When action is set to 'updateUserRegistration', user account data is updated using UserRegistrationUpdateCmd
     * `@method`
     * `@name Person#updatePerson`
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

     */
    updatePerson(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/@self';
        let requestUrl = domain + path;
        let method = 'PUT';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.updatePerson.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/@self' missing required parameter storeId");
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
        parameters['action'] = parameters['action'] || parameters['action'];
        if (parameters['action'] !== undefined) {
            queryParameters = queryParameters.set('action', parameters['action']);
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
     * Updates account data for a registered user.  This also supports resetting password for unauthenticated and authenticated users. When action is set to 'updateUserRegistration', user account data is updated using UserRegistrationUpdateCmd
     * `@method`
     * `@name Person#updatePersonOnUserRegistrationUpdate`
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

     */
    updatePersonOnUserRegistrationUpdate(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/@self';
        let requestUrl = domain + path;
        let method = 'PUT';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.updatePersonOnUserRegistrationUpdate.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/@self' missing required parameter storeId");
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
        parameters['action'] = parameters['action'] || parameters['action'];
        if (parameters['action'] !== undefined) {
            queryParameters = queryParameters.set('action', parameters['action']);
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
     * This allows an administrator to update account data for a registered user.
     * `@method`
     * `@name Person#updatePersonByAdmin`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} userId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The user identifier.
     ** `@property {any} body ` Request body.
     */
    updatePersonByAdmin(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/{userId}';
        let requestUrl = domain + path;
        let method = 'PUT';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.updatePersonByAdmin.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['userId'] = parameters['userId'] || parameters['userId'];
        parameters.pathParameters['userId'] = parameters.pathParameters['userId'] || parameters.pathParameters['userId'];
        if (parameters.pathParameters['userId'] === undefined) {
            parameters.pathParameters['userId'] = parameters['userId'];
        }
        requestUrl = requestUrl.replace('{userId}', parameters.pathParameters['userId']);

        if (parameters.pathParameters['userId'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter userId");
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
     * This allows an administrator to assign role(s) to a registered user.
     * `@method`
     * `@name Person#assignRoleByAdmin`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
      ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} userId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The user identifier.
     ** `@property {any} body ` Request body.

     */
    assignRoleByAdmin(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/{userId}';
        let requestUrl = domain + path;
        let method = 'POST';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.assignRoleByAdmin.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['userId'] = parameters['userId'] || parameters['userId'];
        parameters.pathParameters['userId'] = parameters.pathParameters['userId'] || parameters.pathParameters['userId'];
        if (parameters.pathParameters['userId'] === undefined) {
            parameters.pathParameters['userId'] = parameters['userId'];
        }
        requestUrl = requestUrl.replace('{userId}', parameters.pathParameters['userId']);

        if (parameters.pathParameters['userId'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter userId");
        }

        //allow use of param with or without underscore
        parameters['body'] = parameters['body'] || parameters['body'];
        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        queryParameters = queryParameters.set('action', 'assignRole');

        if (parameters['action'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter action");
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
     * This allows an administrator to unassign role(s) from a registered user.
     * `@method`
     * `@name Person#unassignRoleByAdmin`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
      ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} userId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The user identifier.
     ** `@property {any} body ` Request body.

     */
    unassignRoleByAdmin(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/{userId}';
        let requestUrl = domain + path;
        let method = 'POST';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.unassignRoleByAdmin.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['userId'] = parameters['userId'] || parameters['userId'];
        parameters.pathParameters['userId'] = parameters.pathParameters['userId'] || parameters.pathParameters['userId'];
        if (parameters.pathParameters['userId'] === undefined) {
            parameters.pathParameters['userId'] = parameters['userId'];
        }
        requestUrl = requestUrl.replace('{userId}', parameters.pathParameters['userId']);

        if (parameters.pathParameters['userId'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter userId");
        }

        //allow use of param with or without underscore
        parameters['body'] = parameters['body'] || parameters['body'];
        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        queryParameters = queryParameters.set('action', 'unassignRole');

        if (parameters['action'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter action");
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
     * This allows CSR / CSS to reset password for a registered user. It also allows resetting password when the CSR / CSS has established a session to act on behalf of a user.
     * `@method`
     * `@name Person#resetPasswordByAdmin`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {any} body ` Request body.
     ** `@property {string} mode ` The mode in which resetPassword will be executed. ResetPassword can be executed in administrator session or in on-behalf session for a user Default value is 'resetPasswordAdmin'.
     */
    resetPasswordByAdmin(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/updateMemberPassword';
        let requestUrl = domain + path;
        let method = 'POST';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.resetPasswordByAdmin.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/updateMemberPassword' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['body'] = parameters['body'] || parameters['body'];
        if (parameters['body'] !== undefined) {
            body = parameters['body'];
        }

        //allow use of param with or without underscore
        parameters['mode'] = parameters['mode'] || parameters['mode'];
        if (parameters['mode'] !== undefined) {
            queryParameters = queryParameters.set('mode', parameters['mode']);
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
     * Performs an action on a person by an administrator. See each action for details on input and output.
     * `@method`
     * `@name Person#performActionByAdmin`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} userId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The user identifier.
     ** `@property {string} action (required)` The action of the rest service.
     */
    performActionByAdmin(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/{userId}';
        let requestUrl = domain + path;
        let method = 'POST';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.performActionByAdmin.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['userId'] = parameters['userId'] || parameters['userId'];
        parameters.pathParameters['userId'] = parameters.pathParameters['userId'] || parameters.pathParameters['userId'];
        if (parameters.pathParameters['userId'] === undefined) {
            parameters.pathParameters['userId'] = parameters['userId'];
        }
        requestUrl = requestUrl.replace('{userId}', parameters.pathParameters['userId']);

        if (parameters.pathParameters['userId'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter userId");
        }

        //allow use of param with or without underscore
        parameters['action'] = parameters['action'] || parameters['action'];
        if (parameters['action'] !== undefined) {
            queryParameters = queryParameters.set('action', parameters['action']);
        }

        if (parameters['action'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/{userId}' missing required parameter action");
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
     * Deletes one or more values of a context attribute for a registered user.
     * `@method`
     * `@name Person#deleteContextAttributeForPerson`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} jobNames (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. Name of the person's job function to use for the request.
     ** `@property {string} values (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. Value of the person's job function.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
     */
    deleteContextAttributeForPerson(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/@self/contextattributes/{jobNames}/{values}';
        let requestUrl = domain + path;
        let method = 'DELETE';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.deleteContextAttributeForPerson.mocks.json';
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
        parameters['jobNames'] = parameters['jobNames'] || parameters['jobNames'];
        parameters.pathParameters['jobNames'] = parameters.pathParameters['jobNames'] || parameters.pathParameters['jobNames'];
        if (parameters.pathParameters['jobNames'] === undefined) {
            parameters.pathParameters['jobNames'] = parameters['jobNames'];
        }
        requestUrl = requestUrl.replace('{jobNames}', parameters.pathParameters['jobNames']);

        if (parameters.pathParameters['jobNames'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/@self/contextattributes/{jobNames}/{values}' missing required parameter jobNames");
        }

        //allow use of param with or without underscore
        parameters['values'] = parameters['values'] || parameters['values'];
        parameters.pathParameters['values'] = parameters.pathParameters['values'] || parameters.pathParameters['values'];
        if (parameters.pathParameters['values'] === undefined) {
            parameters.pathParameters['values'] = parameters['values'];
        }
        requestUrl = requestUrl.replace('{values}', parameters.pathParameters['values']);

        if (parameters.pathParameters['values'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/@self/contextattributes/{jobNames}/{values}' missing required parameter values");
        }

        //allow use of param with or without underscore
        parameters['storeId'] = parameters['storeId'] || parameters['storeId'];
        parameters.pathParameters['storeId'] = parameters.pathParameters['storeId'] || parameters.pathParameters['storeId'];
        if (parameters.pathParameters['storeId'] === undefined) {
            parameters.pathParameters['storeId'] = parameters['storeId'];
        }
        requestUrl = requestUrl.replace('{storeId}', parameters.pathParameters['storeId']);

        if (parameters.pathParameters['storeId'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/@self/contextattributes/{jobNames}/{values}' missing required parameter storeId");
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
     * Updates user to be included/excluded from a member group or to be unassgined.
     * `@method`
     * `@name Person#updateMemberUser`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store identifier.
     ** `@property {string} userId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The user identifier.
     ** `@property {any} body ` Request body.
     */
    updateMemberUser(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/person/updateMemberUser/{userId}';
        let requestUrl = domain + path;
        let method = 'POST';
        if (CommerceEnvironment.transactionUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/transaction' + path + '.updateMemberUser.mocks.json';
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
            throw new Error("Request '/store/{storeId}/person/updateMemberUser/{userId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['userId'] = parameters['userId'] || parameters['userId'];
        parameters.pathParameters['userId'] = parameters.pathParameters['userId'] || parameters.pathParameters['userId'];
        if (parameters.pathParameters['userId'] === undefined) {
            parameters.pathParameters['userId'] = parameters['userId'];
        }
        requestUrl = requestUrl.replace('{userId}', parameters.pathParameters['userId']);

        if (parameters.pathParameters['userId'] === undefined) {
            throw new Error("Request '/store/{storeId}/person/updateMemberUser/{userId}' missing required parameter userId");
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

}
/* jshint ignore:end */