// to run:
//		npm run create-component -- <componentName> [<parentComponent>]
//		where the parentComponent is probably either theme or pages

const
	fs = require('fs');
	fsExtra = require('fs-extra');

const componentsDir = 'src/app';

let name = process.argv[2];
let dir = (process.argv[3]) ? `${process.argv[3]}/${name}` : name;

fsExtra.copy(`scripts/componentTemplate`, `${componentsDir}/${dir}`, err => {
	if (err) {
		console.error(err);
	} else {
		fsExtra.move(`${componentsDir}/${dir}/componentTemplate.component.ts`, `${componentsDir}/${dir}/${name}.component.ts`, err => {
			if (err) {
				console.error(err);
			} else {
				let component = fs.readFileSync(`${componentsDir}/${dir}/${name}.component.ts`, 'utf8');
				
				// generate the selector name
				let selector = name.replace(/[A-Z]/g, match => {
					return `-${match.toLowerCase()}`;
				});

				let componentClassName = `${name.charAt(0).toUpperCase()}${name.slice(1)}Component` 

				component = component.replace(/component-template/, selector);
				component = component.replace(/componentTemplate/g, name);
				component = component.replace(/ComponentTemplateComponent/, componentClassName);

				fs.writeFile(`${componentsDir}/${dir}/${name}.component.ts`, component, 'utf8', err => {
					if (err) {
						console.error(err);
					} else {
						console.log(`wrote to ${componentsDir}/${dir}/${name}.component.ts successfully`);
					}
				});
			}
		});

		fsExtra.move(`${componentsDir}/${dir}/componentTemplate.html`, `${componentsDir}/${dir}/${name}.html`, ()=>{});

		fsExtra.move(`${componentsDir}/${dir}/componentTemplate.scss`, `${componentsDir}/${dir}/${name}.scss`, ()=>{});
	}
});
