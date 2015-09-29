import rest from 'rest';
import mime from 'rest/interceptor/mime';
import errorCode from 'rest/interceptor/errorCode';
import defaultRequest from 'rest/interceptor/defaultRequest';

export let httpClient = rest
  .wrap(mime, { mime: 'application/json' })
  .wrap(errorCode)
  .wrap(defaultRequest, { headers: { 'x-yb-client': 'jazz' } });

import { Model } from 'falcor';
import HttpDataSource from 'falcor-http-datasource';
let httpDataSource = new HttpDataSource('/falcor/users.json');
export let falcorModel = new Model({ source: httpDataSource });
