import 'jest-extended';
import MockDate = require('mockdate');
import { SimpleLogger } from '../src/index';

describe('Simple logger', () => {

  it('should be able to console.log message', () => {
    // Setup
    const spyConsoleLog = jest.spyOn(console, 'log')
    spyConsoleLog.mockImplementation(() => {/*noop*/ });

    // Do stuff
    const logger = new SimpleLogger('test');
    logger.log('Hello world');

    // Assert
    expect(spyConsoleLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledTimes(1);
    expect(spyConsoleLog.mock.calls[0][0]).toBeString();

    // Cleanup
    spyConsoleLog.mockReset();
    spyConsoleLog.mockRestore();

  })

  it('should be able to debug, log, warn, error', () => {
    // Setup - Mock debug, log, warn, error
    const spyConsoleDebug = jest.spyOn(console, 'debug')
    spyConsoleDebug.mockImplementation(() => {/*noop*/ });

    const spyConsoleLog = jest.spyOn(console, 'log')
    spyConsoleLog.mockImplementation(() => {/*noop*/ });

    const spyConsoleWarn = jest.spyOn(console, 'warn')
    spyConsoleWarn.mockImplementation(() => {/*noop*/ });

    const spyConsoleError = jest.spyOn(console, 'error')
    spyConsoleError.mockImplementation(() => {/*noop*/ });

    // Do stuff
    const logger = new SimpleLogger('test');

    logger.debug('Hello world');
    logger.log('Hello world');
    logger.warn('Hello world');
    logger.error('Hello world');

    // Assert
    expect(spyConsoleDebug).toHaveBeenCalled();
    expect(spyConsoleDebug).toHaveBeenCalledTimes(1);
    expect(spyConsoleDebug.mock.calls[0][0]).toBeString();

    expect(spyConsoleLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledTimes(1);
    expect(spyConsoleLog.mock.calls[0][0]).toBeString();

    expect(spyConsoleWarn).toHaveBeenCalled();
    expect(spyConsoleWarn).toHaveBeenCalledTimes(1);
    expect(spyConsoleWarn.mock.calls[0][0]).toBeString();

    expect(spyConsoleError).toHaveBeenCalled();
    expect(spyConsoleError).toHaveBeenCalledTimes(1);
    expect(spyConsoleError.mock.calls[0][0]).toBeString();


    // Cleanup
    spyConsoleDebug.mockReset();
    spyConsoleDebug.mockRestore();

    spyConsoleLog.mockReset();
    spyConsoleLog.mockRestore();

    spyConsoleWarn.mockReset();
    spyConsoleWarn.mockRestore();

    spyConsoleError.mockReset();
    spyConsoleError.mockRestore();

  })

  it('should log with default format string', () => {
    // Setup
    const spyConsoleLog = jest.spyOn(console, 'log')
    spyConsoleLog.mockImplementation(() => {/*noop*/ });
    MockDate.set(new Date(2000, 1, 1, 10, 40, 50));


    // Do stuff
    const logger = new SimpleLogger('test');
    logger.log('Hello world');

    // Assert
    expect(spyConsoleLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledTimes(1);
    expect(spyConsoleLog.mock.calls[0][0]).toBeString();
    expect(spyConsoleLog.mock.calls[0][0]).toBe('10:40:50 - test - Hello world');

    // Cleanup
    spyConsoleLog.mockReset();
    spyConsoleLog.mockRestore();
    MockDate.reset();
  })

  it('should allow setting blank format string', () => {
    // Setup
    const spyConsoleLog = jest.spyOn(console, 'log')
    spyConsoleLog.mockImplementation(() => {/*noop*/ });

    // Do stuff
    const logger = new SimpleLogger('test');
    logger.setFormatString('');
    logger.log('Hello world');

    // Assert
    expect(spyConsoleLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledTimes(1);
    expect(spyConsoleLog.mock.calls[0][0]).toBeString();
    expect(spyConsoleLog.mock.calls[0][0]).toBe('');

    // Cleanup
    spyConsoleLog.mockReset();
    spyConsoleLog.mockRestore();

  })

  it('should allow setting static format string', () => {
    // Setup
    const spyConsoleLog = jest.spyOn(console, 'log')
    spyConsoleLog.mockImplementation(() => {/*noop*/ });

    // Do stuff
    const logger = new SimpleLogger('test');
    logger.setFormatString('Something');
    logger.log('Hello world');

    // Assert
    expect(spyConsoleLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledTimes(1);
    expect(spyConsoleLog.mock.calls[0][0]).toBeString();
    expect(spyConsoleLog.mock.calls[0][0]).toBe('Something');

    // Cleanup
    spyConsoleLog.mockReset();
    spyConsoleLog.mockRestore();

  })

  it('should allow setting basic format string', () => {
    // Setup
    const spyConsoleLog = jest.spyOn(console, 'log')
    spyConsoleLog.mockImplementation(() => {/*noop*/ });

    // Do stuff
    const logger = new SimpleLogger('test');
    logger.setFormatString('Logging {message}');
    logger.log('Hello world');

    // Assert
    expect(spyConsoleLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledTimes(1);
    expect(spyConsoleLog.mock.calls[0][0]).toBeString();
    expect(spyConsoleLog.mock.calls[0][0]).toBe('Logging Hello world');

    // Cleanup
    spyConsoleLog.mockReset();
    spyConsoleLog.mockRestore();

  })

  it('should allow setting multi placeholder format string', () => {
    // Setup
    const spyConsoleLog = jest.spyOn(console, 'log')
    spyConsoleLog.mockImplementation(() => {/*noop*/ });

    // Do stuff
    const logger = new SimpleLogger('test');
    logger.setFormatString('Logging {message} from module {module}');
    logger.log('Hello world');

    // Assert
    expect(spyConsoleLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledTimes(1);
    expect(spyConsoleLog.mock.calls[0][0]).toBeString();
    expect(spyConsoleLog.mock.calls[0][0]).toBe('Logging Hello world from module test');

    // Cleanup
    spyConsoleLog.mockReset();
    spyConsoleLog.mockRestore();

  })

  it('should allow setting repeating placeholder format string', () => {
    // Setup
    const spyConsoleLog = jest.spyOn(console, 'log')
    spyConsoleLog.mockImplementation(() => {/*noop*/ });

    // Do stuff
    const logger = new SimpleLogger('test');
    logger.setFormatString('{message}, again {message}');
    logger.log('Hi');

    // Assert
    expect(spyConsoleLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledTimes(1);
    expect(spyConsoleLog.mock.calls[0][0]).toBeString();
    expect(spyConsoleLog.mock.calls[0][0]).toBe('Hi, again Hi');

    // Cleanup
    spyConsoleLog.mockReset();
    spyConsoleLog.mockRestore();
  })

  it('should work with format string containing basic date masks', () => {
    // Setup
    const spyConsoleLog = jest.spyOn(console, 'log')
    spyConsoleLog.mockImplementation(() => {/*noop*/ });
    MockDate.set(new Date(2000, 3, 2, 13, 40, 50));

    // Do stuff
    const logger = new SimpleLogger('test');
    logger.setFormatString('Time is {hh} on {mm}/{dd} - {message}');
    logger.log('Hi');

    // Assert
    expect(spyConsoleLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledTimes(1);
    expect(spyConsoleLog.mock.calls[0][0]).toBeString();
    expect(spyConsoleLog.mock.calls[0][0]).toBe('Time is 01 on 04/02 - Hi');

    // Cleanup
    spyConsoleLog.mockReset();
    spyConsoleLog.mockRestore();
  })
  
  it('should work with format string containing named date format', () => {
    // Setup
    const spyConsoleLog = jest.spyOn(console, 'log')
    spyConsoleLog.mockImplementation(() => {/*noop*/ });
    MockDate.set(new Date(2010, 3, 2, 13, 40, 50));

    // Do stuff
    const logger = new SimpleLogger('test');
    logger.setFormatString('{shortDate} - {message}');
    logger.log('Hi');

    // Assert
    expect(spyConsoleLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledTimes(1);
    expect(spyConsoleLog.mock.calls[0][0]).toBeString();
    expect(spyConsoleLog.mock.calls[0][0]).toBe('4/2/10 - Hi');

    // Cleanup
    spyConsoleLog.mockReset();
    spyConsoleLog.mockRestore();
  })
  
  it('should work with format string containing both date mask and named format', () => {
    // Setup
    const spyConsoleLog = jest.spyOn(console, 'log')
    spyConsoleLog.mockImplementation(() => {/*noop*/ });
    MockDate.set(new Date(2010, 3, 2, 13, 40, 50));

    // Do stuff
    const logger = new SimpleLogger('test');
    logger.setFormatString('{shortDate}:{HH} - {message}');
    logger.log('Hi');

    // Assert
    expect(spyConsoleLog).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledTimes(1);
    expect(spyConsoleLog.mock.calls[0][0]).toBeString();
    expect(spyConsoleLog.mock.calls[0][0]).toBe('4/2/10:13 - Hi');

    // Cleanup
    spyConsoleLog.mockReset();
    spyConsoleLog.mockRestore();
  })

})

