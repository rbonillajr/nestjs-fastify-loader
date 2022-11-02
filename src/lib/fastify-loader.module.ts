import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { MODULE_OPTIONS } from './loader.constants';
@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class FastifyLoaderModule implements OnModuleInit {
  constructor(
    private readonly adapterHost: HttpAdapterHost,
    @Inject(MODULE_OPTIONS) private readonly options: [],
  ) {}
  onModuleInit() {
    const app = this.adapterHost.httpAdapter.getInstance<FastifyInstance>();
    if (Array.isArray(this.options)) {
      this.options.forEach((item) => app.register(item));
    } else {
      app.register(this.options);
    }
  }
  static forRoot(
    options: string | void[] | FastifyPluginCallback,
  ): DynamicModule {
    return {
      module: FastifyLoaderModule,
      providers: [
        {
          provide: MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
