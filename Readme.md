# Simple Logger

## API Usage

```js

import Logger from 'logger';

const l = new Logger('testModule');

// Log methods
l.log('message'); // 11:46:07 - testModule - message
l.debug('message'); // Same
l.warn('message'); // Same
l.error('message'); // Same

// Change format string
l.setFormatString('Module is: {module} - {message} - at time {HH}:{MM}:{ss}');

l.debug('Hello world'); // Module is: testModule - Hello world - at time 11:48:57

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
3. Timestamp related keys - Documented below


#### [dateformat](https://www.npmjs.com/package/dateformat) -

Using this library, we create many time related keys, which are mostly equivalent to what is documented in [mask options](https://www.npmjs.com/package/dateformat#mask-options) and [named formats](https://www.npmjs.com/package/dateformat#named-formats). 

What is slightly different from the above documentation is that we don't support `N`, `o`, `S`, `Z` and `UTC:` as they act as modifiers and don't make much sense as individual keys.

Some examples of supported date format strings are:

1. `"{default}"` - Sat Jun 09 2007 17:46:21
2. `"{HH}:{MM}:{ss}"` - 11:48:57
3. `"{shortDate} ({W}th week of the year)"` - 6/9/07 (34th week of the year)