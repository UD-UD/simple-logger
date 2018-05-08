import {SimpleLogger} from './index';

describe('Simple logger', () => {
  it('should be able to console.log message', () => {
    const logger = new SimpleLogger('testModule');
    logger.setFormatString('Module is: {module} - {message} - at time {HH}:{MM}:{ss}');
    logger.log('Hello world');
    expect(1).toBe(2);
  })
})