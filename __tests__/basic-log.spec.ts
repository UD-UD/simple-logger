import { SimpleLogger } from '../src/index';

describe('Simple logger', () => {
  it('should be able to console.log message', () => {
    const spyConsole = jest.spyOn(console, 'log')
    spyConsole.mockImplementation(() => {/*noop*/ });

    const logger = new SimpleLogger('testModule');
    logger.log('Hello world');

    expect(spyConsole).toHaveBeenCalled();
    expect(spyConsole).toHaveBeenCalledTimes(1);

    spyConsole.mockReset();
    spyConsole.mockRestore();

  })
})