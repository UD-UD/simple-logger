# Simple Logger

## API Usage

```js

import { SimpleLogger, LogLevel } from 'simple-logger';

const l = new SimpleLogger('testModule');

// Log methods
l.log('message'); // 10:40:50::testModule::LOG:: message
l.debug('message'); // 10:40:50::testModule::DEBUG:: message
l.warn('message'); // 10:40:50::testModule::WARN:: message
l.error('message'); // 10:40:50::testModule::ERROR:: message

// Change format string
l.setFormatString('Module is: {module} - {message} - at time {HH}:{MM}:{ss}');

l.debug('Hello world'); // Module is: testModule - Hello world - at time 11:48:57

// Change log level 
SimpleLogger.setLogLevel(LogLevel.warn);

l.debug('Hello world'); // No log

// Reset log level
SimpleLogger.resetLogLevel();

```

Details of the string which can be passed into `setFormatString` is described below.

### Format string specs

We are using two libraries called `string-format` and `dateformat`.

#### [string-format](https://github.com/davidchambers/string-format) -

We use this for the template string syntax. It allows quite a few syntaxes, but we are using the simple object destructuring syntax, which is shown in the first example [here](https://github.com/davidchambers/string-format#string-format).

To explain it simply, the formatting string looks like `"Hello Mr.{key1} - Welcome to {key2}"` and the values of this keys will be replaced with those from the formatting object. Invalid keys will create empty replacement string.

We pass in a formatting object with these keys:

1. `module` - Module name, passed in the Logger constructor.
2. `message` - String passed in log / warn / error methods.
3. `logLevel` - Log level in upper case, eg. DEBUG.
4. Timestamp related keys - Documented below

Default format string is `'{HH}:{MM}:{ss}::{module}::{logLevel}:: {message}'`

#### [dateformat](https://www.npmjs.com/package/dateformat) -

Using this library, we create many time related keys, which are mostly equivalent to what is documented in [mask options](https://www.npmjs.com/package/dateformat#mask-options) and [named formats](https://www.npmjs.com/package/dateformat#named-formats). 

What is slightly different from the above documentation is that we don't support `N`, `o`, `S`, `Z` and `UTC:` as they act as modifiers and don't make much sense as individual keys.

Some examples of supported date format strings are:

1. `"{default}"` - Sat Jun 09 2007 17:46:21
2. `"{HH}:{MM}:{ss}"` - 11:48:57
3. `"{shortDate} ({W}th week of the year)"` - 6/9/07 (34th week of the year) 