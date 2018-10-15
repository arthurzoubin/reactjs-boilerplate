import typeToReducer from 'type-to-reducer';
import Bem from 'react-bem-helper';
import get from './get';
import arrayConcat from './arrayConcat';
import {
  isNodeInTree,
  isPromise,
  hasWindow,
  isBrowser,
  isEnv,
  SOCKET_FLAG,
} from './predicates';
import { compact } from './helpers';
import { RequestClientClass as RequestClient } from './request';

export {
  get,
  typeToReducer,
  arrayConcat,
  isNodeInTree,
  isPromise,
  hasWindow,
  isBrowser,
  isEnv,
  SOCKET_FLAG,
  compact,
  RequestClient,
  Bem,
};
