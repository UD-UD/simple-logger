import {SimpleLogger} from './index';

describe('Simple logger', () => {
  it('should be able to console.log message', () => {
    const logger = new SimpleLogger('testModule');
    logger.log('Hello world');
    expect(1).toBe(2);
  })
})