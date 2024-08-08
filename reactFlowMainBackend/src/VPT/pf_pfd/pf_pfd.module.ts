import { Module } from '@nestjs/common';
import { PfPfdService } from './pf_pfd.service';
import { PfPfdController } from './pf_pfd.controller';
import { RedisService } from 'src/redisService';
import { CommonVptServices } from '../commonVptServices';

@Module({
  controllers: [PfPfdController],
  providers: [PfPfdService,RedisService,CommonVptServices],
})
export class PfPfdModule {}
