// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'ng2-bootstrap':'vendor/ng2-bootstrap',
  'angular2-in-memory-web-api': 'https://unpkg.com/angular2-in-memory-web-api',
  'moment':'vendor/moment'
};

/** User packages configuration. */
const packages: any = {
  'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
  'in-memory-data-service': {main: '../in-memory-data-service.js'},
  'moment':{main: 'min/moment-with-locales.js',defaultExtension: 'js'}
};

var bootstrapPackages:string[] = [
  'alert',
  'buttons',
  'pagination',
  'collapse',
]

bootstrapPackages.forEach((pkg)=>{
  packages[`ng2-bootstrap/components/${pkg}`] = {main: `../${pkg}.js`}
});

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/account-list',
  'app/account-list/create-account',
  'app/account-list/browsing-list',
  'app/account-list/query-list',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
