import { Module } from '@nestjs/common';
import { DfErdService } from './df_erd.service';
import { DfErdController } from './df_erd.controller';
import { RedisService } from 'src/redisService';
import { VptService } from '../vpt.service';
import { CommonVptServices } from '../commonVptServices';

@Module({

  controllers: [DfErdController],
  providers: [DfErdService, RedisService,CommonVptServices],
})
export class DfErdModule {}
