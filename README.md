[![view on npm](http://img.shields.io/npm/v/stream-handlebars.svg)](https://www.npmjs.org/package/stream-handlebars)
[![npm module downloads per month](http://img.shields.io/npm/dm/stream-handlebars.svg)](https://www.npmjs.org/package/stream-handlebars)
[![Build Status](https://travis-ci.org/75lb/stream-handlebars.svg?branch=master)](https://travis-ci.org/75lb/stream-handlebars)
[![Dependency Status](https://david-dm.org/75lb/stream-handlebars.svg)](https://david-dm.org/75lb/stream-handlebars)

<a name="module_stream-handlebars"></a>
## stream-handlebars
Extends handlebars with a streaming interface for .compile().

**Example**  
```js
var handlebars = require("stream-handlebars");
var myHelpers = require("./myHelpers");
var template = "<p>\{{paragraph}}</p>"

// it's just regular handlebars..
handlebars.registerHelper(myHelpers);

// ..with the addition of a streaming interface for .compile()
var compileStream = handlebars.createCompileStream(template);

process.stdin.pipe(compileStream).pipe(process.stdout);
```

* [stream-handlebars](#module_stream-handlebars)
  * [handlebars](#exp_module_stream-handlebars--handlebars) : <code>object</code> ⏏
    * [.createCompileStream(template, [options])](#module_stream-handlebars--handlebars.createCompileStream) ⇒ <code>[Transform](https://nodejs.org/api/stream.html#stream_class_stream_transform)</code>

<a name="exp_module_stream-handlebars--handlebars"></a>
### handlebars : <code>object</code> ⏏
**Extends:** <code>[handlebars](http://handlebarsjs.com)</code>  
**Kind**: Exported namespace  
<a name="module_stream-handlebars--handlebars.createCompileStream"></a>
#### handlebars.createCompileStream(template, [options]) ⇒ <code>[Transform](https://nodejs.org/api/stream.html#stream_class_stream_transform)</code>
a stream wrapper for the [handlebars.compile](http://handlebarsjs.com/reference.html) function

**Kind**: static method of <code>[handlebars](#exp_module_stream-handlebars--handlebars)</code>  

| Param | Type | Description |
| --- | --- | --- |
| template | <code>string</code> | required template |
| [options] | <code>object</code> | options passed to both Transform() and .compile() |
| [options.objectMode] | <code>object</code> | set to true if you wish you pass in the data as an object |


* * *

&copy; 2015 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown).
