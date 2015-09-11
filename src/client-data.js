import rest from 'rest';
import mime from 'rest/interceptor/mime';
import errorCode from 'rest/interceptor/errorCode';
import defaultRequest from 'rest/interceptor/defaultRequest';

export let httpClient = rest
  .wrap(mime, { mime: 'application/json' })
  .wrap(errorCode)
  .wrap(defaultRequest, { headers: { 'x-yb-client': 'jazz' } });

// TODO figure out how best to import browser HttpDataSource to avoid
//      "This seems to be a pre-built javascript file." warnings
import falcor from 'falcor/dist/falcor.browser';
let httpDataSource = new falcor.HttpDataSource('/falcor/users.json');
export let falcorModel = new falcor.Model({ source: httpDataSource });
