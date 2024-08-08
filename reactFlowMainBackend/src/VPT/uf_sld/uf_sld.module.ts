import { Module } from '@nestjs/common';
import { UfSldService } from './uf_sld.service';
import { UfSldController } from './uf_sld.controller';
import { RedisService } from 'src/redisService';
import { CommonVptServices } from '../commonVptServices';

@Module({
  controllers: [UfSldController],
  providers: [UfSldService,RedisService,CommonVptServices],
})
export class UfSldModule {}
