import rootSaga from './index';

describe('Saga Tests', function() {
  describe('Root Saga', () => {
    beforeEach(() => {
      this.saga = rootSaga();
    });
  });
});
