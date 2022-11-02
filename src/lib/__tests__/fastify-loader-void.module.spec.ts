import { INestApplication } from '@nestjs/common';
import { FastifyLoaderModule } from '../fastify-loader.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fp from 'fastify-plugin';
import { NestFactory } from '@nestjs/core';

describe('Integration module', () => {
  let app: INestApplication;
  const fn = fp(
    (fastify, opts, next) => {
      fastify.decorate('accessible', true);
      next();
    },
    {
      name: 'accessible-plugin',
    },
  );
  beforeAll(async () => {
    app = await NestFactory.create<NestFastifyApplication>(
      FastifyLoaderModule.forRoot(fn),
      new FastifyAdapter(),
    );
    const port = 3000;
    const host = '0.0.0.0';
    await app.listen(port, host);
  });
  afterAll(async () => {
    await app.close();
  });
  test('should be plugin registered', async () => {
    expect(
      (app as any).httpAdapter.instance.hasDecorator('accessible'),
    ).toEqual(true);
  });
});
