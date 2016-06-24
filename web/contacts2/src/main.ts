import { bootstrap } from '@angular/platform-browser-dynamic';

import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';

import { InMemoryBackendService, SEED_DATA} from 'angular2-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data-service';
import { XHRBackend, HTTP_PROVIDERS } from '@angular/http';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent,[
  HTTP_PROVIDERS,
  // {provide: XHRBackend, useClass: InMemoryBackendService },
  // {provide: SEED_DATA, useClass: InMemoryDataService }
]);
