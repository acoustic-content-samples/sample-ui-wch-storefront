# sample-ui-wch-storefront

To use
------

1. Install dependencies, `npm install`
2. Add your WCH and Commerce configuration or leverage the mock data (in case you do not want to connect to a commerce server)
	A. In `src/app/common/dxconfig/serverConfig.json`, replace each empty string with a string containing the correct value for the according key for your environment



	The file 'serverConfig.json' should contain the following values:

	`can be found in Homepange of WCH-> Profile Tab with username-> Hub information -> Content hub ID`
	"contentHubID": "YOUR WATSON CONTENT HUB ID", 

	`--can be found in Homepange of WCH-> Profile Tab with username-> Hub information -> Domain name`
 	"contentHubDomainName": "YOUR WCH DOMAIN NAME",

 	`put your backend commerce server domain name - i.e. commerceserver.ibm.com`
 	"commerceSearchDomainName": "commerceserver.ibm.com", 

	`put your backend commerce server ssl port - i.e. 443`
 	"commerceSearchSecurePort":"443",

	`put your backend commerce server context root for search - i.e. /search/resources`
 	"commerceSearchContextPath":"/search/resources",

 	`put your transaction commerce server domain name - i.e. commerceserver.ibm.com`
 	"commerceTransactionDomainName": "commerceserver.ibm.com", 

	`put your transaction commerce server SSL port - i.e. 443`
 	"commerceTransactionSecurePort": "443",

	`put your transaction commerce server context root - i.e. /wcs/resources`
 	"commerceTransactionContextPath":"/wcs/resources",

	`put your transaction commerce server store ID - i.e. 1`
 	"commerceStoreID": "1",

	`put your transaction commerce server catalog ID - i.e. 10502`
 	"commerceCatalogID": "10502"




	B. In `package.json`, replace the empty strings for `url`, `username`, & `password` with strings containing your WCH API URL, WCH username, & WCH Password respectively



	The `package.json` should be input in this way:

	"version": "1.0.0",

	"description": "",

	"main": "index.js",

	"user": "YOUR WCH USERNAME",

	"password": "YOUR WCH PASSWORD",

	`can be found in Homepange of WCH-> Profile Tab with username-> Hub information -> API URL`
	"url": "YOUR WCH API URL",




3. Build assets, `npm run bundle`
4. Run local server, `npm start`
5. Deploy to WCH, `npm run deploy`


Creating a component
--------------------

`npm run create-component -- <componentName> [<parentComponent>]`

where component names are camelCased. This will create the directory and layout
the file adjusting names accordingly. All that’s needed after that is to add
the component to a module. `parentComponent` is optional.

Generating rest service class
---------------------------

`npm run generate-rest -- --name <YourServieClassName> --module <NameOfModule> --resourceDomain <NameOfResourceDomain> --spec <path/to/your/spec.swagger.json> --tag <tagName>`

run `npm run generate-rest` without arguments for hints. `--tag` argument is for Swagger 2.x, do not use this argument for Swagger 1.x.

Using mock data
-------------

### Use one of two ways:
1. set `const CommerceEnvironemnt.transactionUseMocks = true` for Commerce transaction server service or `CommerceEnvironemnt.searchUseMocks = true` for Commerce search server.
2. call service with parameter `url = 'mocks'`

### Available mock data
1. top categories
2. product with partNumber `AuroraWMDRS-1` and `AuroraWMDRS-001` under category Women/dresses
3. shopping cart page and guest checkout flow.

Screenshots
-------------
https://developer.ibm.com/customer-engagement/2017/07/31/new-sample-hosting-storefront-watson-content-hub/
