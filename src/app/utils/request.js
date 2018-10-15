import axios from 'axios';
import { merge } from 'ramda';
import { constructUrlGetParameters } from 'app/utils/helpers';
import debug from 'debug';

const log = debug('utils.requestClient');

export const defaultHeaders = {
  'Content-Type': 'application/json',
};

const defaultOptions = {
  method: 'GET',
  headers: defaultHeaders,
};

export class RequestClientClass {
  constructor(baseUrl, fetch = axios) {
    this.baseUrl = baseUrl;
    this.fetch = fetch;
    this.headers = defaultOptions.headers;
    this.payload = '';
    this.uri = '';
    this.queryUrl = {};
    this.requireHeadersReturn = false;
  }

  /**
   * Trim up extra space, and leading slash
   * @param string
   */
  static clean(string) {
    if (typeof string === 'string') {
      return string.trim().replace(/\/$/, '');
    }
    return string;
  }

  setUri(uri) {
    this.uri = uri;
    return this;
  }

  setHeaders(headers) {
    this.headers = merge(this.headers, headers);
    return this;
  }

  setPayload(payload) {
    this.payload = payload;
    return this;
  }

  /**
   * Set Get Parameter
   * @param {Object} queryUrl
   * @returns {HttpClient}
   */
  setQueryParameter(queryUrl) {
    if (typeof queryUrl === 'object') {
      Object.keys(queryUrl).forEach((key) => {
        this.setQueryParameterUrl(key, queryUrl[key]);
      });
    }
    return this;
  }

  setQueryParameterUrl(key, value) {
    this.queryUrl[key] = value;
    return this;
  }

  constructFQDN() {
    const uri = [this.baseUrl, this.uri].map(RequestClientClass.clean).filter(Boolean).join('/');

    return constructUrlGetParameters(uri, this.queryUrl);
  }

  setRequireHeadersReturn(value) {
    this.requireHeadersReturn = value;
    return this;
  }

  async doMethod(method = 'GET') {
    const options = {
      baseURL: this.baseUrl,
      url: this.uri,
      ...defaultOptions,
      headers: {
        ...this.headers,
      },
      method,
    };
    if (method === 'GET') {
      options.data = this.queryUrl;
    }
    if (method === 'POST' || method === 'PUT') {
      options.data = this.payload;
    }
    log('options', options);

    const response = await this.fetch(options);
    log('response', { status: response.status });

    if (response.status >= 400) {
      throw new Error(`Response error: ${this.uri}`);
    }

    const contentType = response.headers['content-type'];
    log('contentType', contentType);
    const finalResponse = response.data;
    if (!this.requireHeadersReturn) {
      delete finalResponse.headers;
    }
    return finalResponse;
  }

  doPost() {
    return this.doMethod('POST');
  }

  doPut() {
    return this.doMethod('PUT');
  }

  doGet() {
    return this.doMethod('GET');
  }
}
