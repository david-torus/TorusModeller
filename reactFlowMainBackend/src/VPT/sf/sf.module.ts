import { Module } from '@nestjs/common';
import { SFService } from './sf.service';
import { SFController } from './sf.controller';
import { RedisService } from 'src/redisService';
import { CommonVptServices } from '../commonVptServices';

@Module({
  controllers: [SFController],
  providers: [SFService,RedisService,CommonVptServices],
})
export class SFModule {}
