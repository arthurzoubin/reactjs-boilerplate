import { sync as globSync } from 'glob';
import { readFileSync } from 'fs';
import * as path from 'path';
import { LOCALES } from 'config/paths';

const log = debug('intl-translations-loader');

export function load(localesGlob = `${LOCALES}/*.json`) {
  return globSync(localesGlob)
    .map(filename => [
      path.basename(filename, '.json'),
      readFileSync(filename, 'utf8'),
    ])
    .map(([locale, file]) => [locale, JSON.parse(file)])
    .reduce((collection, [locale, messages]) => {
      log('Loaded', locale);
      const collectionRes = collection;
      collectionRes[locale] = messages;
      return collectionRes;
    }, {});
}
