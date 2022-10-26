import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyInstance } from 'fastify';
import { MODULE_OPTIONS } from './loader.constants';
@Module({
  controllers: [],
  providers: [],
  exports: [],
})
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
    this.options.forEach((item) => app.register(item));
  }
  static forRoot(options: void[]): DynamicModule {
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
