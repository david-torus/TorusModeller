import { MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TeController } from './te.controller';
import { RedisService } from 'src/redisService';
import { DebugService } from './debugService';
import { NodeExecutionService } from './nodeExecService';
import { AuthMiddleware } from './Middleware/auth.middleware';
import { TeCommonService } from './teCommonService';
import { SavehandlerService } from './savehandlerService';
import { LogController } from './log.controller';
import { TeService } from './te.service';
import { CommonService } from 'src/commonService';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [HttpModule],
  controllers: [TeController,LogController],
  providers: [RedisService,CommonService, DebugService,NodeExecutionService, TeCommonService, TeService,SavehandlerService,JwtService],
})

export class TeModule implements NestModule 
{
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(AuthMiddleware).forRoutes('pe');
    consumer.apply(AuthMiddleware).forRoutes({path:'pe/peStream',method:RequestMethod.POST });
  }  
}

