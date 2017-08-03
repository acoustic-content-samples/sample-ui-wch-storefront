/*
 * Copyright IBM Corp. 2017
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

const fs = require('fs');
const swaggerGen = require('swagger-js-codegen').CodeGen;
const minimist = require('minimist');


let swaggerDistDir = "src/app";
let opts = { //defaults
    string: ['spec', 'name', 'module', 'resourceDomain', 'tag'],
    default: { name: 'undefined', spec: 'undefined', module: 'undefined', resourceDomain: 'undefined', tag: 'undefined' }
};
//console.log(process.execPath);
let cmdArgs = minimist(process.argv.slice(2), opts);
//console.log(cmdArgs);

//verify cms args
if (cmdArgs.spec === 'undefined' || cmdArgs.name === 'undefined' || cmdArgs.module === 'undefined' || cmdArgs.resourceDomain === 'undefined') {
    console.error(`Error: You must specify the following cmd line arguments: spec, name, module, resourceDomain
    Swagger v1.X example:
        npm run generate-rest -- --name GuestIdentity --module Commerce --resourceDomain Transaction --spec scripts/codeGen/swaggerSpec/commerce/guestIdentity.swagger.json
    Swaggeer v2.x example with tag:
        npm run generate-rest -- --name ProductView --module Commerce --resourceDomain Search --spec scripts/codeGen/swaggerSpec/commerce/search.swagger.json --tag ProductView`);
    return;
}

generateRestClass(cmdArgs);

function generateRestClass(opts) {
    let classTemplate = fs.readFileSync('scripts/codeGen/templates/swagger/clazz.mustache', 'utf-8');
    let methodTemplate = fs.readFileSync('scripts/codeGen/templates/swagger/method.mustache', 'utf-8');
    let requestTemplate = fs.readFileSync('scripts/codeGen/templates/swagger/request.mustache', 'utf-8');

    let spec = JSON.parse(fs.readFileSync(opts.spec, 'utf-8'));

    //A tag has been specified indicating SWAGGER v2.x. We filter spec to remove
    if (opts.tag && opts.tag !== 'undefined') {
        let tagList = opts.tag.split(',');

        let filteredTags = spec.tags.filter(function (tag) {
            return tagList.indexOf(tag.name) >= 0;
        });

        if (filteredTags.length === 0) {
            console.error("Error: The specified tag " + opts.tag + "  is not present in Swagger spec " + opts.spec + ".");
            return;
        }

        Object.keys(spec.paths).forEach(function (pathRoute) {
            /*
             * path = { get: { tags: [] }, post: {  tags: [] } , etc}
             */
            let path = spec.paths[pathRoute];
            delete spec.paths[pathRoute];

            let filteredPath = {};
            Object.keys(path).forEach(function (method) {
                //remvoe deprecated spec for Swagger spec 2.0
                if (!method.deprecated) {
                    tagList.forEach(function (tag) {
                        if (path[method].tags.indexOf(tag) !== -1) {
                            filteredPath[method] = path[method];
                        }
                    });
                }
            });

            if (Object.keys(filteredPath).length > 0) {
                spec.paths[pathRoute] = filteredPath;
            }
        });

        spec.tags = filteredTags;
    }
    else {
        //remove deprecated spec Swagger spec 1.0
        let apis = spec.apis.filter(function(api){
            let operations = api.operations.filter(function(op){
                return !op.deprecated;
            });
            api.operations = operations;
            return operations.length > 0;
        });
        spec.apis = apis;
    }

    opts.camelCaseResourceDomain = opts.resourceDomain.substr(0,1).toLowerCase().concat(opts.resourceDomain.substr(1));
    opts.camelCaseModuleName =  opts.module.substr(0,1).toLowerCase().concat(opts.module.substr(1));
    opts.camelCaseClassName = opts.name.substr(0,1).toLowerCase().concat(opts.name.substr(1));
    //generate
    let source = swaggerGen.getCustomCode({
        moduleName: opts.module,
        className: opts.name,
        mustache: {
            resourceDomainNameCamelCase: opts.camelCaseResourceDomain,
            resourceDomainName: opts.resourceDomain,
            moduleNameCamelCase: opts.camelCaseModuleName,
            classNameCamelCase: opts.camelCaseClassName
        },
        swagger: spec,
        template: {
            class: classTemplate,
            method: methodTemplate,
            request: requestTemplate
        }
    });
    fs.writeFile(`${swaggerDistDir}/${opts.camelCaseModuleName}/services/rest/${opts.camelCaseResourceDomain}/${opts.camelCaseClassName}.service.ts`, source, 'UTF-8', err => {
        if (err) {
            console.error(err);
        } else {
            console.log(`wrote to ${swaggerDistDir}/${opts.camelCaseModuleName}/services/rest/${opts.camelCaseResourceDomain}/${opts.camelCaseClassName}.service.ts successfully`);
        }
    });
}