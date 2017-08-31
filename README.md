# Adonis Eureka

> ServiceProvider for registering an AdonisJs Application with Netflix Eureka

Adonis Eureka is a Service Provider for registering an AdonisJs 4 application with [Eureka built by Netflix](https://github.com/Netflix/eureka). It also works with the Spring Cloud powered version of Eureka.

Built on top of [eureka-js-client](https://github.com/jquatier/eureka-js-client) for Node.js. 

## Requirements
 - AdonisJs >= 4.0
 - Adonis Ignitor (```$ adonis install @adonisjs/ignitor```)
 
## Setup

#### Install via adonis

```shell
$ adonis install @mig-frankfurt/???
```

#### Register Provider

```javascript
const providers = [
  '@mig-frankfurt/???/providers/EurekaProvider'
]
```

This ServiceProvider will be available under the namespace `'MigFrankfurt/Adonis/Eureka'`

#### Use hook

If not already existent, create `/start/hooks.js`

```js
const { hooks } = require('@adonisjs/ignitor')
const Eureka = use('MigFrankfurt/Adonis/Eureka')

hooks.after.httpServer(() => {
    // TODO
})
```

## Developed by

Medical Informatics Group (MIG)\
University Hospital Frankfurt\
Theodor-Stern-Kai 7\
60590 Frankfurt\
[https://mig-frankfurt.de](https://www.mig-frankfurt.de/)

**Maintained by:** Patric Vormstein (vormstein@med.uni-frankfurt.de)

## License

MIT License

Copyright (c) 2017 Medical Informatics Group (MIG) Frankfurt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
