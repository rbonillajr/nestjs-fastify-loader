# nestjs-fastify-loader

### Nestjs nestjs module to register fastify plugins

## Install

```bash
npm install nestjs-fastify-loader
```
Or, if you use yarn
```bash
yarn add nestjs-fastify-loader
```

## Documentation

## Getting Started

Create plugin or use existing plugin.

```javascript
import fp from 'fastify-plugin';
import proxy from '@fastify/http-proxy';

export default fp(async (fastify) => {
  void fastify.register(proxy, {
    upstream: "url",
    prefix: '/api',
    proxyPayloads: false,
  });
});
```

Import FastifyLoaderModule on the module you want to use

```javascript
// One plugin

import { Module } from '@nestjs/common';
import { FastifyLoaderModule } from '@rbonillajr/nestjs-fastify-loader';
import proxy from 'plugin path'

@Module({
  imports: [
    FastifyLoaderModule.forRoot(proxy),
  ],
})
export class ExampleModule {}
```

```javascript
// More than one plugin

import { Module } from '@nestjs/common';
import { FastifyLoaderModule } from '@rbonillajr/nestjs-fastify-loader';
import proxy from 'plugin path'
const plugins = [];
plugins.push(proxy);

@Module({
  imports: [
    FastifyLoaderModule.forRoot(plugins),
  ],
})
export class ExampleModule {}
```