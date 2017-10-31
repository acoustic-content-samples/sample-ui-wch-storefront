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
import { SearchService } from "./search.service";
import { CommerceEnvironment } from "../../../commerce.environment";
/* beautify ignore:end */

export class ProductViewService extends SearchService {

    /**
     * Finds a product by its ID.
     * `@method`
     * `@name ProductView#findProductsByCategory`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store ID.
     ** `@property {string} categoryId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The category identifier.
     ** `@property {string} associationType ` The type of the merchandising association to be returned.
     ** `@property {string} attributeKeyword ` The attribute associated keywords to be returned.
     ** `@property {string} facet ` The selected facets.
     ** `@property {string} facetLimit ` The multiple name-value pairs of facet limit defining the maximum number of items to be returned under each facet. The sequence of limits honored alongside with the sequence of facet name-value pairs.
     ** `@property {string} advancedFacetList ` The advanced facet list.
     ** `@property {string} filterFacet ` The filter facet.
     ** `@property {string} filterTerm ` The filter term.
     ** `@property {string} manufacturer ` The manufacturer name.
     ** `@property {string} contractId ` The contractId
     ** `@property {string} minPrice ` The minimum price. Based on the selected currency.
     ** `@property {string} maxPrice ` The maximum price. Based on the selected currency.mc
     ** `@property {string} orderBy ` The field name to use when ordering the results.
     ** `@property {string} searchType ` The search type is a numeric string with controls the query operator: ANY, OR, AND and control what data to be returned. For a detailed list of valid values, see the online documentation on Match type (_wcf.search.type). Known valid values include : 0: ANY (exclude SKU)1: EXACT (exclude SKU), 2: ALL (exclude SKU), 3: NONE (exclude SKU), 10: ANY (include SKU), 11: EXACT (include SKU), 12: ALL (include SKU), 13: NONE (include SKU), 100: ANY (only SKU), 101: EXACT (only SKU), 102: ALL (only SKU), 103: NONE (only SKU), 1000: ANY (include products, kits, bundles, category level SKU) (exclude product level SKU), 1001: EXACT (include products, kits, bundles, category level SKU) (exclude product level SKU), 1002: ALL (include products, kits, bundles, category level SKU) (exclude product level SKU), 1003: NONE (include products, kits, bundles, category level SKU) (exclude product level SKU), 10000: ANY (include category level SKU) (exclude products, kits, bundles, product level SKU), 10001: EXACT (include category level SKU) (exclude products, kits, bundles, product level SKU), 10002: ALL (include category level SKU) (exclude products, kits, bundles, product level SKU), 10003: NONE (include category level SKU) (exclude products, kits, bundles, product level SKU)
     ** `@property {string} searchSource ` The search source. The default is "N" for shallow search navigation. All other values will result in expanded search in sub-categories.
     ** `@property {string} priceMode ` The price mode.
     ** `@property {boolean} checkEntitlement ` Option to force an entitlement check.
     ** `@property {string} attachementFilter ` The attachment filter.
     ** `@property {string} catalogId ` The catalog identifier. If none is specified, the store default catalog shall be used.
     ** `@property {string} langId ` Language identifier. If not specified, the "locale" parameter will be used. If "locale" isn't specified, then the store default language shall be used.
     ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
     ** `@property {string} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
     ** `@property {string} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a search query.
     */
    findProductsByCategory(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/productview/byCategory/{categoryId}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.searchUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/search' + path + '.findProductsByCategory.mocks.json';
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
        headerValues['Accept'] = ['application/json'];
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
            throw new Error("Request '/store/{storeId}/productview/byCategory/{categoryId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['categoryId'] = parameters['categoryId'] || parameters['categoryId'];
        parameters.pathParameters['categoryId'] = parameters.pathParameters['categoryId'] || parameters.pathParameters['categoryId'];
        if (parameters.pathParameters['categoryId'] === undefined) {
            parameters.pathParameters['categoryId'] = parameters['categoryId'];
        }
        requestUrl = requestUrl.replace('{categoryId}', parameters.pathParameters['categoryId']);

        if (parameters.pathParameters['categoryId'] === undefined) {
            throw new Error("Request '/store/{storeId}/productview/byCategory/{categoryId}' missing required parameter categoryId");
        }

        //allow use of param with or without underscore
        parameters['associationType'] = parameters['associationType'] || parameters['associationType'];
        if (parameters['associationType'] !== undefined) {
            queryParameters = queryParameters.set('associationType', parameters['associationType']);
        }

        //allow use of param with or without underscore
        parameters['attributeKeyword'] = parameters['attributeKeyword'] || parameters['attributeKeyword'];
        if (parameters['attributeKeyword'] !== undefined) {
            queryParameters = queryParameters.set('attributeKeyword', parameters['attributeKeyword']);
        }

        //allow use of param with or without underscore
        parameters['facet'] = parameters['facet'] || parameters['facet'];
        if (parameters['facet'] !== undefined) {
            queryParameters = queryParameters.set('facet', parameters['facet']);
        }

        //allow use of param with or without underscore
        parameters['facetLimit'] = parameters['facetLimit'] || parameters['facetLimit'];
        if (parameters['facetLimit'] !== undefined) {
            queryParameters = queryParameters.set('facetLimit', parameters['facetLimit']);
        }

        //allow use of param with or without underscore
        parameters['advancedFacetList'] = parameters['advancedFacetList'] || parameters['advancedFacetList'];
        if (parameters['advancedFacetList'] !== undefined) {
            queryParameters = queryParameters.set('advancedFacetList', parameters['advancedFacetList']);
        }

        //allow use of param with or without underscore
        parameters['filterFacet'] = parameters['filterFacet'] || parameters['filterFacet'];
        if (parameters['filterFacet'] !== undefined) {
            queryParameters = queryParameters.set('filterFacet', parameters['filterFacet']);
        }

        //allow use of param with or without underscore
        parameters['filterTerm'] = parameters['filterTerm'] || parameters['filterTerm'];
        if (parameters['filterTerm'] !== undefined) {
            queryParameters = queryParameters.set('filterTerm', parameters['filterTerm']);
        }

        //allow use of param with or without underscore
        parameters['manufacturer'] = parameters['manufacturer'] || parameters['manufacturer'];
        if (parameters['manufacturer'] !== undefined) {
            queryParameters = queryParameters.set('manufacturer', parameters['manufacturer']);
        }

        //allow use of param with or without underscore
        parameters['contractId'] = parameters['contractId'] || parameters['contractId'];
        if (parameters['contractId'] !== undefined) {
            queryParameters = queryParameters.set('contractId', parameters['contractId']);
        }

        //allow use of param with or without underscore
        parameters['minPrice'] = parameters['minPrice'] || parameters['minPrice'];
        if (parameters['minPrice'] !== undefined) {
            queryParameters = queryParameters.set('minPrice', parameters['minPrice']);
        }

        //allow use of param with or without underscore
        parameters['maxPrice'] = parameters['maxPrice'] || parameters['maxPrice'];
        if (parameters['maxPrice'] !== undefined) {
            queryParameters = queryParameters.set('maxPrice', parameters['maxPrice']);
        }

        //allow use of param with or without underscore
        parameters['orderBy'] = parameters['orderBy'] || parameters['orderBy'];
        if (parameters['orderBy'] !== undefined) {
            queryParameters = queryParameters.set('orderBy', parameters['orderBy']);
        }

        //allow use of param with or without underscore
        parameters['searchType'] = parameters['searchType'] || parameters['searchType'];
        if (parameters['searchType'] !== undefined) {
            queryParameters = queryParameters.set('searchType', parameters['searchType']);
        }

        //allow use of param with or without underscore
        parameters['searchSource'] = parameters['searchSource'] || parameters['searchSource'];
        if (parameters['searchSource'] !== undefined) {
            queryParameters = queryParameters.set('searchSource', parameters['searchSource']);
        }

        //allow use of param with or without underscore
        parameters['priceMode'] = parameters['priceMode'] || parameters['priceMode'];
        if (parameters['priceMode'] !== undefined) {
            queryParameters = queryParameters.set('priceMode', parameters['priceMode']);
        }

        //allow use of param with or without underscore
        parameters['checkEntitlement'] = parameters['checkEntitlement'] || parameters['checkEntitlement'];
        if (parameters['checkEntitlement'] !== undefined) {
            queryParameters = queryParameters.set('checkEntitlement', parameters['checkEntitlement']);
        }

        //allow use of param with or without underscore
        parameters['attachementFilter'] = parameters['attachementFilter'] || parameters['attachementFilter'];
        if (parameters['attachementFilter'] !== undefined) {
            queryParameters = queryParameters.set('attachementFilter', parameters['attachementFilter']);
        }

        //allow use of param with or without underscore
        parameters['catalogId'] = parameters['catalogId'] || parameters['catalogId'];
        if (parameters['catalogId'] !== undefined) {
            queryParameters = queryParameters.set('catalogId', parameters['catalogId']);
        }

        //allow use of param with or without underscore
        parameters['langId'] = parameters['langId'] || parameters['langId'];
        if (parameters['langId'] !== undefined) {
            queryParameters = queryParameters.set('langId', parameters['langId']);
        }

        //allow use of param with or without underscore
        parameters['currency'] = parameters['currency'] || parameters['currency'];
        if (parameters['currency'] !== undefined) {
            queryParameters = queryParameters.set('currency', parameters['currency']);
        }

        //allow use of param with or without underscore
        parameters['pageSize'] = parameters['pageSize'] || parameters['pageSize'];
        if (parameters['pageSize'] !== undefined) {
            queryParameters = queryParameters.set('pageSize', parameters['pageSize']);
        }

        //allow use of param with or without underscore
        parameters['pageNumber'] = parameters['pageNumber'] || parameters['pageNumber'];
        if (parameters['pageNumber'] !== undefined) {
            queryParameters = queryParameters.set('pageNumber', parameters['pageNumber']);
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
     * By default, this API returns all products under the category and subcategories by deep search. It does not only return products in the current category. There is no control over the limit of each subcategory under the category facet.
     * `@method`
     * `@name ProductView#findProductsByCategoryForAdmin`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store ID.
     ** `@property {string} categoryId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The category identifier.
     ** `@property {string} associationType ` The type of the merchandising association to be returned.
     ** `@property {string} attributeKeyword ` The attribute associated keywords to be returned.
     ** `@property {string} facet ` The selected facets.
     ** `@property {string} facetLimit ` The multiple name-value pairs of facet limit defining the maximum number of items to be returned under each facet. The sequence of limits honored alongside with the sequence of facet name-value pairs.
     ** `@property {string} advancedFacetList ` The advanced facet list.
     ** `@property {string} filterFacet ` The filter facet.
     ** `@property {string} filterTerm ` The filter term.
     ** `@property {string} manufacturer ` The manufacturer name.
     ** `@property {string} contractId ` The contractId
     ** `@property {string} minPrice ` The minimum price. Based on the selected currency.
     ** `@property {string} maxPrice ` The maximum price. Based on the selected currency.mc
     ** `@property {string} orderBy ` The field name to use when ordering the results.
     ** `@property {string} searchType ` The search type is a numeric string with controls the query operator: ANY, OR, AND and control what data to be returned. For a detailed list of valid values, see the online documentation on Match type (_wcf.search.type). Known valid values include : 0: ANY (exclude SKU)1: EXACT (exclude SKU), 2: ALL (exclude SKU), 3: NONE (exclude SKU), 10: ANY (include SKU), 11: EXACT (include SKU), 12: ALL (include SKU), 13: NONE (include SKU), 100: ANY (only SKU), 101: EXACT (only SKU), 102: ALL (only SKU), 103: NONE (only SKU), 1000: ANY (include products, kits, bundles, category level SKU) (exclude product level SKU), 1001: EXACT (include products, kits, bundles, category level SKU) (exclude product level SKU), 1002: ALL (include products, kits, bundles, category level SKU) (exclude product level SKU), 1003: NONE (include products, kits, bundles, category level SKU) (exclude product level SKU), 10000: ANY (include category level SKU) (exclude products, kits, bundles, product level SKU), 10001: EXACT (include category level SKU) (exclude products, kits, bundles, product level SKU), 10002: ALL (include category level SKU) (exclude products, kits, bundles, product level SKU), 10003: NONE (include category level SKU) (exclude products, kits, bundles, product level SKU)
     ** `@property {string} searchSource ` The search source. The default is "N" for shallow search navigation. All other values will result in expanded search in sub-categories.
     ** `@property {string} priceMode ` The price mode.
     ** `@property {string} checkEntitlement ` Option to force an entitlement check.
     ** `@property {string} attachementFilter ` The attachment filter.
     ** `@property {string} catalogId ` The catalog identifier. If none is specified, the store default catalog shall be used.
     ** `@property {string} langId ` Language identifier. If not specified, the "locale" parameter will be used. If "locale" isn't specified, then the store default language shall be used.
     ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
     ** `@property {string} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
     ** `@property {string} sequenceRule ` The dynamic sequencing formula to be applied on the search results, 
     ** `@property {string} excludeIds `  The list of product to be excluded from the search results , this is comma separated productId
     ** `@property {string} debug ` Used to display debug info. Set to 'true' to display sequence score.
     ** `@property {string} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a search query.
     */
    findProductsByCategoryForAdmin(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/productview/byCategoryForAdmin/{categoryId}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.searchUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/search' + path + '.findProductsByCategoryForAdmin.mocks.json';
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
        headerValues['Accept'] = ['application/json'];
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
            throw new Error("Request '/store/{storeId}/productview/byCategoryForAdmin/{categoryId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['categoryId'] = parameters['categoryId'] || parameters['categoryId'];
        parameters.pathParameters['categoryId'] = parameters.pathParameters['categoryId'] || parameters.pathParameters['categoryId'];
        if (parameters.pathParameters['categoryId'] === undefined) {
            parameters.pathParameters['categoryId'] = parameters['categoryId'];
        }
        requestUrl = requestUrl.replace('{categoryId}', parameters.pathParameters['categoryId']);

        if (parameters.pathParameters['categoryId'] === undefined) {
            throw new Error("Request '/store/{storeId}/productview/byCategoryForAdmin/{categoryId}' missing required parameter categoryId");
        }

        //allow use of param with or without underscore
        parameters['associationType'] = parameters['associationType'] || parameters['associationType'];
        if (parameters['associationType'] !== undefined) {
            queryParameters = queryParameters.set('associationType', parameters['associationType']);
        }

        //allow use of param with or without underscore
        parameters['attributeKeyword'] = parameters['attributeKeyword'] || parameters['attributeKeyword'];
        if (parameters['attributeKeyword'] !== undefined) {
            queryParameters = queryParameters.set('attributeKeyword', parameters['attributeKeyword']);
        }

        //allow use of param with or without underscore
        parameters['facet'] = parameters['facet'] || parameters['facet'];
        if (parameters['facet'] !== undefined) {
            queryParameters = queryParameters.set('facet', parameters['facet']);
        }

        //allow use of param with or without underscore
        parameters['facetLimit'] = parameters['facetLimit'] || parameters['facetLimit'];
        if (parameters['facetLimit'] !== undefined) {
            queryParameters = queryParameters.set('facetLimit', parameters['facetLimit']);
        }

        //allow use of param with or without underscore
        parameters['advancedFacetList'] = parameters['advancedFacetList'] || parameters['advancedFacetList'];
        if (parameters['advancedFacetList'] !== undefined) {
            queryParameters = queryParameters.set('advancedFacetList', parameters['advancedFacetList']);
        }

        //allow use of param with or without underscore
        parameters['filterFacet'] = parameters['filterFacet'] || parameters['filterFacet'];
        if (parameters['filterFacet'] !== undefined) {
            queryParameters = queryParameters.set('filterFacet', parameters['filterFacet']);
        }

        //allow use of param with or without underscore
        parameters['filterTerm'] = parameters['filterTerm'] || parameters['filterTerm'];
        if (parameters['filterTerm'] !== undefined) {
            queryParameters = queryParameters.set('filterTerm', parameters['filterTerm']);
        }

        //allow use of param with or without underscore
        parameters['manufacturer'] = parameters['manufacturer'] || parameters['manufacturer'];
        if (parameters['manufacturer'] !== undefined) {
            queryParameters = queryParameters.set('manufacturer', parameters['manufacturer']);
        }

        //allow use of param with or without underscore
        parameters['contractId'] = parameters['contractId'] || parameters['contractId'];
        if (parameters['contractId'] !== undefined) {
            queryParameters = queryParameters.set('contractId', parameters['contractId']);
        }

        //allow use of param with or without underscore
        parameters['minPrice'] = parameters['minPrice'] || parameters['minPrice'];
        if (parameters['minPrice'] !== undefined) {
            queryParameters = queryParameters.set('minPrice', parameters['minPrice']);
        }

        //allow use of param with or without underscore
        parameters['maxPrice'] = parameters['maxPrice'] || parameters['maxPrice'];
        if (parameters['maxPrice'] !== undefined) {
            queryParameters = queryParameters.set('maxPrice', parameters['maxPrice']);
        }

        //allow use of param with or without underscore
        parameters['orderBy'] = parameters['orderBy'] || parameters['orderBy'];
        if (parameters['orderBy'] !== undefined) {
            queryParameters = queryParameters.set('orderBy', parameters['orderBy']);
        }

        //allow use of param with or without underscore
        parameters['searchType'] = parameters['searchType'] || parameters['searchType'];
        if (parameters['searchType'] !== undefined) {
            queryParameters = queryParameters.set('searchType', parameters['searchType']);
        }

        //allow use of param with or without underscore
        parameters['searchSource'] = parameters['searchSource'] || parameters['searchSource'];
        if (parameters['searchSource'] !== undefined) {
            queryParameters = queryParameters.set('searchSource', parameters['searchSource']);
        }

        //allow use of param with or without underscore
        parameters['priceMode'] = parameters['priceMode'] || parameters['priceMode'];
        if (parameters['priceMode'] !== undefined) {
            queryParameters = queryParameters.set('priceMode', parameters['priceMode']);
        }

        //allow use of param with or without underscore
        parameters['checkEntitlement'] = parameters['checkEntitlement'] || parameters['checkEntitlement'];
        if (parameters['checkEntitlement'] !== undefined) {
            queryParameters = queryParameters.set('checkEntitlement', parameters['checkEntitlement']);
        }

        //allow use of param with or without underscore
        parameters['attachementFilter'] = parameters['attachementFilter'] || parameters['attachementFilter'];
        if (parameters['attachementFilter'] !== undefined) {
            queryParameters = queryParameters.set('attachementFilter', parameters['attachementFilter']);
        }

        //allow use of param with or without underscore
        parameters['catalogId'] = parameters['catalogId'] || parameters['catalogId'];
        if (parameters['catalogId'] !== undefined) {
            queryParameters = queryParameters.set('catalogId', parameters['catalogId']);
        }

        //allow use of param with or without underscore
        parameters['langId'] = parameters['langId'] || parameters['langId'];
        if (parameters['langId'] !== undefined) {
            queryParameters = queryParameters.set('langId', parameters['langId']);
        }

        //allow use of param with or without underscore
        parameters['currency'] = parameters['currency'] || parameters['currency'];
        if (parameters['currency'] !== undefined) {
            queryParameters = queryParameters.set('currency', parameters['currency']);
        }

        //allow use of param with or without underscore
        parameters['pageSize'] = parameters['pageSize'] || parameters['pageSize'];
        if (parameters['pageSize'] !== undefined) {
            queryParameters = queryParameters.set('pageSize', parameters['pageSize']);
        }

        //allow use of param with or without underscore
        parameters['sequenceRule'] = parameters['sequenceRule'] || parameters['sequenceRule'];
        if (parameters['sequenceRule'] !== undefined) {
            queryParameters = queryParameters.set('sequenceRule', parameters['sequenceRule']);
        }

        //allow use of param with or without underscore
        parameters['excludeIds'] = parameters['excludeIds'] || parameters['excludeIds'];
        if (parameters['excludeIds'] !== undefined) {
            queryParameters = queryParameters.set('excludeIds', parameters['excludeIds']);
        }

        //allow use of param with or without underscore
        parameters['debug'] = parameters['debug'] || parameters['debug'];
        if (parameters['debug'] !== undefined) {
            queryParameters = queryParameters.set('debug', parameters['debug']);
        }

        //allow use of param with or without underscore
        parameters['pageNumber'] = parameters['pageNumber'] || parameters['pageNumber'];
        if (parameters['pageNumber'] !== undefined) {
            queryParameters = queryParameters.set('pageNumber', parameters['pageNumber']);
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
     * Gets product details based on the product ID.
     * `@method`
     * `@name ProductView#findProductById`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store ID.
     ** `@property {string} productId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The product identifier.
     ** `@property {string} associationType ` The type of the merchandising association to be returned.
     ** `@property {string} attributeKeyword ` The attribute associated keywords to be returned.
     ** `@property {string} catalogId ` The catalog identifier. If none is specified, the store default catalog shall be used.
     ** `@property {string} contractId ` The contractId
     ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
     ** `@property {string} langId ` Language identifier. If not specified, the "locale" parameter will be used. If "locale" isn't specified, then the store default language shall be used.
     ** `@property {boolean} checkEntitlement ` Option to force an entitlement check.
     ** `@property {string} attachementFilter ` The attachment filter.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a search query.
     */
    findProductById(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/productview/byId/{productId}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.searchUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/search' + path + '.findProductById.mocks.json';
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
        headerValues['Accept'] = ['application/json'];
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
            throw new Error("Request '/store/{storeId}/productview/byId/{productId}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['productId'] = parameters['productId'] || parameters['productId'];
        parameters.pathParameters['productId'] = parameters.pathParameters['productId'] || parameters.pathParameters['productId'];
        if (parameters.pathParameters['productId'] === undefined) {
            parameters.pathParameters['productId'] = parameters['productId'];
        }
        requestUrl = requestUrl.replace('{productId}', parameters.pathParameters['productId']);

        if (parameters.pathParameters['productId'] === undefined) {
            throw new Error("Request '/store/{storeId}/productview/byId/{productId}' missing required parameter productId");
        }

        //allow use of param with or without underscore
        parameters['associationType'] = parameters['associationType'] || parameters['associationType'];
        if (parameters['associationType'] !== undefined) {
            queryParameters = queryParameters.set('associationType', parameters['associationType']);
        }

        //allow use of param with or without underscore
        parameters['attributeKeyword'] = parameters['attributeKeyword'] || parameters['attributeKeyword'];
        if (parameters['attributeKeyword'] !== undefined) {
            queryParameters = queryParameters.set('attributeKeyword', parameters['attributeKeyword']);
        }

        //allow use of param with or without underscore
        parameters['catalogId'] = parameters['catalogId'] || parameters['catalogId'];
        if (parameters['catalogId'] !== undefined) {
            queryParameters = queryParameters.set('catalogId', parameters['catalogId']);
        }

        //allow use of param with or without underscore
        parameters['contractId'] = parameters['contractId'] || parameters['contractId'];
        if (parameters['contractId'] !== undefined) {
            queryParameters = queryParameters.set('contractId', parameters['contractId']);
        }

        //allow use of param with or without underscore
        parameters['currency'] = parameters['currency'] || parameters['currency'];
        if (parameters['currency'] !== undefined) {
            queryParameters = queryParameters.set('currency', parameters['currency']);
        }

        //allow use of param with or without underscore
        parameters['langId'] = parameters['langId'] || parameters['langId'];
        if (parameters['langId'] !== undefined) {
            queryParameters = queryParameters.set('langId', parameters['langId']);
        }

        //allow use of param with or without underscore
        parameters['checkEntitlement'] = parameters['checkEntitlement'] || parameters['checkEntitlement'];
        if (parameters['checkEntitlement'] !== undefined) {
            queryParameters = queryParameters.set('checkEntitlement', parameters['checkEntitlement']);
        }

        //allow use of param with or without underscore
        parameters['attachementFilter'] = parameters['attachementFilter'] || parameters['attachementFilter'];
        if (parameters['attachementFilter'] !== undefined) {
            queryParameters = queryParameters.set('attachementFilter', parameters['attachementFilter']);
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
     * Gets product details based on the product ID.
     * `@method`
     * `@name ProductView#findProductsByIds`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store ID.
     ** `@property {array} id (required)` The product identifiers.
     ** `@property {string} associationType ` The type of the merchandising association to be returned.
     ** `@property {string} attributeKeyword ` The attribute associated keywords to be returned.
     ** `@property {string} catalogId ` The catalog identifier. If none is specified, the store default catalog shall be used.
     ** `@property {string} contractId ` The contractId
     ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
     ** `@property {string} langId ` Language identifier. If not specified, the "locale" parameter will be used. If "locale" isn't specified, then the store default language shall be used.
     ** `@property {boolean} checkEntitlement ` Option to force an entitlement check.
     ** `@property {string} attachementFilter ` The attachment filter.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a search query.
     */
    findProductsByIds(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/productview/byIds';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.searchUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/search' + path + '.findProductsByIds.mocks.json';
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
        headerValues['Accept'] = ['application/json'];
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
            throw new Error("Request '/store/{storeId}/productview/byIds' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['id'] = parameters['id'] || parameters['id'];
        if (parameters['id'] !== undefined) {
            queryParameters = queryParameters.set('id', parameters['id']);
        }

        if (parameters['id'] === undefined) {
            throw new Error("Request '/store/{storeId}/productview/byIds' missing required parameter id");
        }

        //allow use of param with or without underscore
        parameters['associationType'] = parameters['associationType'] || parameters['associationType'];
        if (parameters['associationType'] !== undefined) {
            queryParameters = queryParameters.set('associationType', parameters['associationType']);
        }

        //allow use of param with or without underscore
        parameters['attributeKeyword'] = parameters['attributeKeyword'] || parameters['attributeKeyword'];
        if (parameters['attributeKeyword'] !== undefined) {
            queryParameters = queryParameters.set('attributeKeyword', parameters['attributeKeyword']);
        }

        //allow use of param with or without underscore
        parameters['catalogId'] = parameters['catalogId'] || parameters['catalogId'];
        if (parameters['catalogId'] !== undefined) {
            queryParameters = queryParameters.set('catalogId', parameters['catalogId']);
        }

        //allow use of param with or without underscore
        parameters['contractId'] = parameters['contractId'] || parameters['contractId'];
        if (parameters['contractId'] !== undefined) {
            queryParameters = queryParameters.set('contractId', parameters['contractId']);
        }

        //allow use of param with or without underscore
        parameters['currency'] = parameters['currency'] || parameters['currency'];
        if (parameters['currency'] !== undefined) {
            queryParameters = queryParameters.set('currency', parameters['currency']);
        }

        //allow use of param with or without underscore
        parameters['langId'] = parameters['langId'] || parameters['langId'];
        if (parameters['langId'] !== undefined) {
            queryParameters = queryParameters.set('langId', parameters['langId']);
        }

        //allow use of param with or without underscore
        parameters['checkEntitlement'] = parameters['checkEntitlement'] || parameters['checkEntitlement'];
        if (parameters['checkEntitlement'] !== undefined) {
            queryParameters = queryParameters.set('checkEntitlement', parameters['checkEntitlement']);
        }

        //allow use of param with or without underscore
        parameters['attachementFilter'] = parameters['attachementFilter'] || parameters['attachementFilter'];
        if (parameters['attachementFilter'] !== undefined) {
            queryParameters = queryParameters.set('attachementFilter', parameters['attachementFilter']);
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
     * Gets products by part numbers.
     * `@method`
     * `@name ProductView#findProductByPartNumbers`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store ID.
     ** `@property {array} partNumber (required)` The product part numbers.
     ** `@property {string} associationType ` The type of the merchandising association to be returned.
     ** `@property {string} catalogId ` The catalog identifier. If none is specified, the store default catalog shall be used.
     ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
     ** `@property {string} langId ` Language identifier. If not specified, the "locale" parameter will be used. If "locale" isn't specified, then the store default language shall be used.
     ** `@property {string} contractId ` The contractId
     ** `@property {boolean} checkEntitlement ` Option to force an entitlement check.
     ** `@property {string} attachementFilter ` The attachment filter.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a search query.
     */
    findProductByPartNumbers(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/productview/byPartNumbers';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.searchUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/search' + path + '.findProductByPartNumbers.mocks.json';
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
        headerValues['Accept'] = ['application/json'];
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
            throw new Error("Request '/store/{storeId}/productview/byPartNumbers' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['partNumber'] = parameters['partNumber'] || parameters['partNumber'];
        if (parameters['partNumber'] !== undefined) {
            queryParameters = queryParameters.set('partNumber', parameters['partNumber']);
        }

        if (parameters['partNumber'] === undefined) {
            throw new Error("Request '/store/{storeId}/productview/byPartNumbers' missing required parameter partNumber");
        }

        //allow use of param with or without underscore
        parameters['associationType'] = parameters['associationType'] || parameters['associationType'];
        if (parameters['associationType'] !== undefined) {
            queryParameters = queryParameters.set('associationType', parameters['associationType']);
        }

        //allow use of param with or without underscore
        parameters['catalogId'] = parameters['catalogId'] || parameters['catalogId'];
        if (parameters['catalogId'] !== undefined) {
            queryParameters = queryParameters.set('catalogId', parameters['catalogId']);
        }

        //allow use of param with or without underscore
        parameters['currency'] = parameters['currency'] || parameters['currency'];
        if (parameters['currency'] !== undefined) {
            queryParameters = queryParameters.set('currency', parameters['currency']);
        }

        //allow use of param with or without underscore
        parameters['langId'] = parameters['langId'] || parameters['langId'];
        if (parameters['langId'] !== undefined) {
            queryParameters = queryParameters.set('langId', parameters['langId']);
        }

        //allow use of param with or without underscore
        parameters['contractId'] = parameters['contractId'] || parameters['contractId'];
        if (parameters['contractId'] !== undefined) {
            queryParameters = queryParameters.set('contractId', parameters['contractId']);
        }

        //allow use of param with or without underscore
        parameters['checkEntitlement'] = parameters['checkEntitlement'] || parameters['checkEntitlement'];
        if (parameters['checkEntitlement'] !== undefined) {
            queryParameters = queryParameters.set('checkEntitlement', parameters['checkEntitlement']);
        }

        //allow use of param with or without underscore
        parameters['attachementFilter'] = parameters['attachementFilter'] || parameters['attachementFilter'];
        if (parameters['attachementFilter'] !== undefined) {
            queryParameters = queryParameters.set('attachementFilter', parameters['attachementFilter']);
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
     * Gets product details based on a search term.
     * `@method`
     * `@name ProductView#findProductsBySearchTerm`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store ID.
     ** `@property {string} searchTerm (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The term to search for.
     ** `@property {string} associationType ` The type of the merchandising association to be returned.
     ** `@property {string} attributeKeyword ` The attribute associated keywords to be returned.
     ** `@property {string} facet ` The selected facets.
     ** `@property {string} facetLimit ` The multiple name-value pairs of facet limit defining the maximum number of items to be returned under each facet. The sequence of limits honored alongside with the sequence of facet name-value pairs.
     ** `@property {string} advancedFacetList ` The advanced facet list.
     ** `@property {string} filterFacet ` The filter facet.
     ** `@property {string} contractId ` The contractId
     ** `@property {string} filterTerm ` The filter term.
     ** `@property {string} manufacturer ` The manufacturer name.
     ** `@property {string} minPrice ` The minimum price. Based on the selected currency.
     ** `@property {string} maxPrice ` The maximum price. Based on the selected currency.mc
     ** `@property {string} orderBy ` The field name to use when ordering the results.
     ** `@property {string} searchType ` The search type is a numeric string with controls the query operator: ANY, OR, AND and control what data to be returned. For a detailed list of valid values, see the online documentation on Match type (_wcf.search.type). Known valid values include : 0: ANY (exclude SKU)1: EXACT (exclude SKU), 2: ALL (exclude SKU), 3: NONE (exclude SKU), 10: ANY (include SKU), 11: EXACT (include SKU), 12: ALL (include SKU), 13: NONE (include SKU), 100: ANY (only SKU), 101: EXACT (only SKU), 102: ALL (only SKU), 103: NONE (only SKU), 1000: ANY (include products, kits, bundles, category level SKU) (exclude product level SKU), 1001: EXACT (include products, kits, bundles, category level SKU) (exclude product level SKU), 1002: ALL (include products, kits, bundles, category level SKU) (exclude product level SKU), 1003: NONE (include products, kits, bundles, category level SKU) (exclude product level SKU), 10000: ANY (include category level SKU) (exclude products, kits, bundles, product level SKU), 10001: EXACT (include category level SKU) (exclude products, kits, bundles, product level SKU), 10002: ALL (include category level SKU) (exclude products, kits, bundles, product level SKU), 10003: NONE (include category level SKU) (exclude products, kits, bundles, product level SKU)
     ** `@property {string} searchSource ` The search source. The default is "N" for shallow search navigation. All other values will result in expanded search in sub-categories.
     ** `@property {string} priceMode ` The price mode.
     ** `@property {boolean} checkEntitlement ` Option to force an entitlement check.
     ** `@property {string} categoryId ` The category identifier.
     ** `@property {string} searchTerm ` The optional searchTerm parameter that will replace the {searchTerm} value in the context path parameter. It is used to avoid potential limitation of the special characters as being part of the context path.
     ** `@property {string} intentSearchTerm ` The value of the parameter is the term that the user intends to search. Characters are not escaped for the search engine.
     ** `@property {string} originalSearchTerm ` The value of the parameter is the term that the user intends to search. Characters are escaped for the search engine.
     ** `@property {string} filterType ` Used for advanced search option. 0 - search for any match, 1 - search for exact match, 2 - search for all matches
     ** `@property {string} physicalStoreIds ` The list of physical store identifiers.
     ** `@property {string} attachementFilter ` The attachment filter.
     ** `@property {string} catalogId ` The catalog identifier. If none is specified, the store default catalog shall be used.
     ** `@property {string} langId ` Language identifier. If not specified, the "locale" parameter will be used. If "locale" isn't specified, then the store default language shall be used.
     ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
     ** `@property {string} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
     ** `@property {string} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a search query.
     */
    findProductsBySearchTerm(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/productview/bySearchTerm/{searchTerm}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.searchUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/search' + path + '.findProductsBySearchTerm.mocks.json';
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
        headerValues['Accept'] = ['application/json'];
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
            throw new Error("Request '/store/{storeId}/productview/bySearchTerm/{searchTerm}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['searchTerm'] = parameters['searchTerm'] || parameters['searchTerm'];
        parameters.pathParameters['searchTerm'] = parameters.pathParameters['searchTerm'] || parameters.pathParameters['searchTerm'];
        if (parameters.pathParameters['searchTerm'] === undefined) {
            parameters.pathParameters['searchTerm'] = parameters['searchTerm'];
        }
        requestUrl = requestUrl.replace('{searchTerm}', parameters.pathParameters['searchTerm']);

        if (parameters.pathParameters['searchTerm'] === undefined) {
            throw new Error("Request '/store/{storeId}/productview/bySearchTerm/{searchTerm}' missing required parameter searchTerm");
        }

        //allow use of param with or without underscore
        parameters['associationType'] = parameters['associationType'] || parameters['associationType'];
        if (parameters['associationType'] !== undefined) {
            queryParameters = queryParameters.set('associationType', parameters['associationType']);
        }

        //allow use of param with or without underscore
        parameters['attributeKeyword'] = parameters['attributeKeyword'] || parameters['attributeKeyword'];
        if (parameters['attributeKeyword'] !== undefined) {
            queryParameters = queryParameters.set('attributeKeyword', parameters['attributeKeyword']);
        }

        //allow use of param with or without underscore
        parameters['facet'] = parameters['facet'] || parameters['facet'];
        if (parameters['facet'] !== undefined) {
            queryParameters = queryParameters.set('facet', parameters['facet']);
        }

        //allow use of param with or without underscore
        parameters['facetLimit'] = parameters['facetLimit'] || parameters['facetLimit'];
        if (parameters['facetLimit'] !== undefined) {
            queryParameters = queryParameters.set('facetLimit', parameters['facetLimit']);
        }

        //allow use of param with or without underscore
        parameters['advancedFacetList'] = parameters['advancedFacetList'] || parameters['advancedFacetList'];
        if (parameters['advancedFacetList'] !== undefined) {
            queryParameters = queryParameters.set('advancedFacetList', parameters['advancedFacetList']);
        }

        //allow use of param with or without underscore
        parameters['filterFacet'] = parameters['filterFacet'] || parameters['filterFacet'];
        if (parameters['filterFacet'] !== undefined) {
            queryParameters = queryParameters.set('filterFacet', parameters['filterFacet']);
        }

        //allow use of param with or without underscore
        parameters['contractId'] = parameters['contractId'] || parameters['contractId'];
        if (parameters['contractId'] !== undefined) {
            queryParameters = queryParameters.set('contractId', parameters['contractId']);
        }

        //allow use of param with or without underscore
        parameters['filterTerm'] = parameters['filterTerm'] || parameters['filterTerm'];
        if (parameters['filterTerm'] !== undefined) {
            queryParameters = queryParameters.set('filterTerm', parameters['filterTerm']);
        }

        //allow use of param with or without underscore
        parameters['manufacturer'] = parameters['manufacturer'] || parameters['manufacturer'];
        if (parameters['manufacturer'] !== undefined) {
            queryParameters = queryParameters.set('manufacturer', parameters['manufacturer']);
        }

        //allow use of param with or without underscore
        parameters['minPrice'] = parameters['minPrice'] || parameters['minPrice'];
        if (parameters['minPrice'] !== undefined) {
            queryParameters = queryParameters.set('minPrice', parameters['minPrice']);
        }

        //allow use of param with or without underscore
        parameters['maxPrice'] = parameters['maxPrice'] || parameters['maxPrice'];
        if (parameters['maxPrice'] !== undefined) {
            queryParameters = queryParameters.set('maxPrice', parameters['maxPrice']);
        }

        //allow use of param with or without underscore
        parameters['orderBy'] = parameters['orderBy'] || parameters['orderBy'];
        if (parameters['orderBy'] !== undefined) {
            queryParameters = queryParameters.set('orderBy', parameters['orderBy']);
        }

        //allow use of param with or without underscore
        parameters['searchType'] = parameters['searchType'] || parameters['searchType'];
        if (parameters['searchType'] !== undefined) {
            queryParameters = queryParameters.set('searchType', parameters['searchType']);
        }

        //allow use of param with or without underscore
        parameters['searchSource'] = parameters['searchSource'] || parameters['searchSource'];
        if (parameters['searchSource'] !== undefined) {
            queryParameters = queryParameters.set('searchSource', parameters['searchSource']);
        }

        //allow use of param with or without underscore
        parameters['priceMode'] = parameters['priceMode'] || parameters['priceMode'];
        if (parameters['priceMode'] !== undefined) {
            queryParameters = queryParameters.set('priceMode', parameters['priceMode']);
        }

        //allow use of param with or without underscore
        parameters['checkEntitlement'] = parameters['checkEntitlement'] || parameters['checkEntitlement'];
        if (parameters['checkEntitlement'] !== undefined) {
            queryParameters = queryParameters.set('checkEntitlement', parameters['checkEntitlement']);
        }

        //allow use of param with or without underscore
        parameters['categoryId'] = parameters['categoryId'] || parameters['categoryId'];
        if (parameters['categoryId'] !== undefined) {
            queryParameters = queryParameters.set('categoryId', parameters['categoryId']);
        }

        //allow use of param with or without underscore
        parameters['searchTerm'] = parameters['searchTerm'] || parameters['searchTerm'];
        if (parameters['searchTerm'] !== undefined) {
            queryParameters = queryParameters.set('searchTerm', parameters['searchTerm']);
        }

        //allow use of param with or without underscore
        parameters['intentSearchTerm'] = parameters['intentSearchTerm'] || parameters['intentSearchTerm'];
        if (parameters['intentSearchTerm'] !== undefined) {
            queryParameters = queryParameters.set('intentSearchTerm', parameters['intentSearchTerm']);
        }

        //allow use of param with or without underscore
        parameters['originalSearchTerm'] = parameters['originalSearchTerm'] || parameters['originalSearchTerm'];
        if (parameters['originalSearchTerm'] !== undefined) {
            queryParameters = queryParameters.set('originalSearchTerm', parameters['originalSearchTerm']);
        }

        //allow use of param with or without underscore
        parameters['filterType'] = parameters['filterType'] || parameters['filterType'];
        if (parameters['filterType'] !== undefined) {
            queryParameters = queryParameters.set('filterType', parameters['filterType']);
        }

        //allow use of param with or without underscore
        parameters['physicalStoreIds'] = parameters['physicalStoreIds'] || parameters['physicalStoreIds'];
        if (parameters['physicalStoreIds'] !== undefined) {
            queryParameters = queryParameters.set('physicalStoreIds', parameters['physicalStoreIds']);
        }

        //allow use of param with or without underscore
        parameters['attachementFilter'] = parameters['attachementFilter'] || parameters['attachementFilter'];
        if (parameters['attachementFilter'] !== undefined) {
            queryParameters = queryParameters.set('attachementFilter', parameters['attachementFilter']);
        }

        //allow use of param with or without underscore
        parameters['catalogId'] = parameters['catalogId'] || parameters['catalogId'];
        if (parameters['catalogId'] !== undefined) {
            queryParameters = queryParameters.set('catalogId', parameters['catalogId']);
        }

        //allow use of param with or without underscore
        parameters['langId'] = parameters['langId'] || parameters['langId'];
        if (parameters['langId'] !== undefined) {
            queryParameters = queryParameters.set('langId', parameters['langId']);
        }

        //allow use of param with or without underscore
        parameters['currency'] = parameters['currency'] || parameters['currency'];
        if (parameters['currency'] !== undefined) {
            queryParameters = queryParameters.set('currency', parameters['currency']);
        }

        //allow use of param with or without underscore
        parameters['pageSize'] = parameters['pageSize'] || parameters['pageSize'];
        if (parameters['pageSize'] !== undefined) {
            queryParameters = queryParameters.set('pageSize', parameters['pageSize']);
        }

        //allow use of param with or without underscore
        parameters['pageNumber'] = parameters['pageNumber'] || parameters['pageNumber'];
        if (parameters['pageNumber'] !== undefined) {
            queryParameters = queryParameters.set('pageNumber', parameters['pageNumber']);
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
     * Gets products by part number.
     * `@method`
     * `@name ProductView#findProductByPartNumber`
     *
     * `@param {any} headers (optional)` will add headers to rest request
     *
     * `@param {string} url (optional)` will override the default domain used by the service. Url can be relative or absolute
     *
     * `@param {any} parameters` have following properties:
     ** `@property {any} pathParameters` the list of path parameters. If a path parameter was not found, the same named property in `parameters` will be used.
     ** `@property {string} storeId (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The store ID.
     ** `@property {string} partNumber (required)` The child property of `pathParameters`. If not specified in `pathParameters`, the same named property in `parameters` will be used. The product part number.
     ** `@property {string} associationType ` The type of the merchandising association to be returned.
     ** `@property {string} attributeKeyword ` The attribute associated keywords to be returned.
     ** `@property {string} catalogId ` The catalog identifier. If none is specified, the store default catalog shall be used.
     ** `@property {string} contractId ` The contractId
     ** `@property {string} currency ` The currency code to use. Example usage : currency=USD. If no currency code is specified, the store default currency shall be used.
     ** `@property {string} langId ` Language identifier. If not specified, the "locale" parameter will be used. If "locale" isn't specified, then the store default language shall be used.
     ** `@property {boolean} checkEntitlement ` Option to force an entitlement check.
     ** `@property {string} attachementFilter ` The attachment filter.
     ** `@property {string} profileName ` Profile name. Profiles determine the subset of data to be returned by a search query.
     */
    findProductByPartNumber(parameters: any, headers ? : any, url ? : string): Observable < HttpResponse < any >> {
        let useMocks = false;
        //Set domain based on profile.
        if (url && url === 'mocks') {
            url = undefined;
            useMocks = true;
        }
        let domain = url || this.getRequestUrl();
        let path = '/store/{storeId}/productview/{partNumber}';
        let requestUrl = domain + path;
        let method = 'GET';
        if (CommerceEnvironment.searchUseMocks || useMocks) {
            method = 'GET';
            requestUrl = 'mocks/commerce/search' + path + '.findProductByPartNumber.mocks.json';
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
        headerValues['Accept'] = ['application/json'];
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
            throw new Error("Request '/store/{storeId}/productview/{partNumber}' missing required parameter storeId");
        }

        //allow use of param with or without underscore
        parameters['partNumber'] = parameters['partNumber'] || parameters['partNumber'];
        parameters.pathParameters['partNumber'] = parameters.pathParameters['partNumber'] || parameters.pathParameters['partNumber'];
        if (parameters.pathParameters['partNumber'] === undefined) {
            parameters.pathParameters['partNumber'] = parameters['partNumber'];
        }
        requestUrl = requestUrl.replace('{partNumber}', parameters.pathParameters['partNumber']);

        if (parameters.pathParameters['partNumber'] === undefined) {
            throw new Error("Request '/store/{storeId}/productview/{partNumber}' missing required parameter partNumber");
        }

        //allow use of param with or without underscore
        parameters['associationType'] = parameters['associationType'] || parameters['associationType'];
        if (parameters['associationType'] !== undefined) {
            queryParameters = queryParameters.set('associationType', parameters['associationType']);
        }

        //allow use of param with or without underscore
        parameters['attributeKeyword'] = parameters['attributeKeyword'] || parameters['attributeKeyword'];
        if (parameters['attributeKeyword'] !== undefined) {
            queryParameters = queryParameters.set('attributeKeyword', parameters['attributeKeyword']);
        }

        //allow use of param with or without underscore
        parameters['catalogId'] = parameters['catalogId'] || parameters['catalogId'];
        if (parameters['catalogId'] !== undefined) {
            queryParameters = queryParameters.set('catalogId', parameters['catalogId']);
        }

        //allow use of param with or without underscore
        parameters['contractId'] = parameters['contractId'] || parameters['contractId'];
        if (parameters['contractId'] !== undefined) {
            queryParameters = queryParameters.set('contractId', parameters['contractId']);
        }

        //allow use of param with or without underscore
        parameters['currency'] = parameters['currency'] || parameters['currency'];
        if (parameters['currency'] !== undefined) {
            queryParameters = queryParameters.set('currency', parameters['currency']);
        }

        //allow use of param with or without underscore
        parameters['langId'] = parameters['langId'] || parameters['langId'];
        if (parameters['langId'] !== undefined) {
            queryParameters = queryParameters.set('langId', parameters['langId']);
        }

        //allow use of param with or without underscore
        parameters['checkEntitlement'] = parameters['checkEntitlement'] || parameters['checkEntitlement'];
        if (parameters['checkEntitlement'] !== undefined) {
            queryParameters = queryParameters.set('checkEntitlement', parameters['checkEntitlement']);
        }

        //allow use of param with or without underscore
        parameters['attachementFilter'] = parameters['attachementFilter'] || parameters['attachementFilter'];
        if (parameters['attachementFilter'] !== undefined) {
            queryParameters = queryParameters.set('attachementFilter', parameters['attachementFilter']);
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

}
/* jshint ignore:end */