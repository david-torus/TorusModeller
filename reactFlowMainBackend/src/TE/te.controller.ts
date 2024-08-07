import { Controller,Post, Body, Headers, Logger, UseGuards } from '@nestjs/common';
import { TeService } from './te.service';
import { DebugService } from './debugService';
import { NodeExecutionService } from './nodeExecService';
import { RedisService } from 'src/redisService';
import { SavehandlerService} from './savehandlerService';
import { TeCommonService } from './teCommonService';
import { AuthGuard } from './Guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('pe')
export class TeController {
  constructor(private readonly appService: TeService, private readonly debugservice: DebugService, 
  private readonly nodeExecService:NodeExecutionService, private readonly savehandlerService:SavehandlerService,
  private readonly tecommonService:TeCommonService,private readonly redisService : RedisService ) {}
  
  private readonly logger = new Logger(TeController.name);


//validation
@Post('validate')
async validate(@Body() input): Promise<any> {    
   if(input.key) 
      return await this.tecommonService.validate(input.key); 
   else
      return 'key is empty'      
} 

//Execution

  // Processflow Execution   
  @Post('peStream')
   async getPeStream(@Body() input, @Headers('Authorization') auth:any){       
    var token = auth.split(' ')[1];   
    if(input.sfkey && input.key && token) {
    //  var validate = await this.tecommonService.validate(input.key)
     // if(validate.validateresult == 'validation completed')     
          return await this.appService.getPeStream(input.sfkey,input.key,token);
      //  else{
      //   return validate
      // }
    }
    else
       return 'key/sfkey/token is empty'  
   }

   //process resume after process flow stopped
   @Post('resume')
   async resumeProcess(@Body() input, @Headers('Authorization') auth:any){       
    var token = auth.split(' ')[1];    
      return await this.appService.resumeProcess(input.sfkey,input.key,input.upId,token);  
   }  

  // process execution after humantask data collected
  @Post('formdata')
  async getFormdata(@Body() input, @Headers('Authorization') auth:any): Promise<any> {  
    var token = auth.split(' ')[1];    
     if(input.sfkey && input.key && input.upId && input.nodeId && input.nodeName && input.formdata && token) 
       return await this.appService.getFormdata(input.sfkey,input.key,input.upId,input.nodeId,input.nodeName, input.formdata, token);  
     else
       return 'sfkey/key/upId/nodeId/nodename/formdata/token is empty'        
  } 

  //node level execution
  @Post('nodeExec')
  async nodeExecution(@Body() input, @Headers('Authorization') auth:any): Promise<any> { 
    var token = auth.split(' ')[1];     
       return await this.nodeExecService.nodeExecution(input.sfkey,input.key,input.nodeId,input.nodeName,input.nodeType,token);       
  } 
  
  //retry execution
  @Post('retry')
  async getRetryProcess(@Body() input, @Headers('Authorization') auth:any): Promise<any> {  
    var token = auth.split(' ')[1];   
     if(input.key && input.sfkey && input.upId && token) 
       return await this.appService.getProcess(input.sfkey,input.key,input.upId,token); 
     else
       return 'key/token is empty'      
  } 

  //Debug  

  //debug execution
  @Post('debugExecution')
  async getdebug(@Body() input,@Headers('Authorization') auth:any): Promise<any> { 
    var token = auth.split(' ')[1];   
     if(input.sfkey && input.key && token) 
       return await this.debugservice.getdebug(input.sfkey,input.key, token); 
     else
       return 'key/sfkey/token is empty'      
  }  

  // debug node level
  @Post('debugNode')
  async getdebugProcess(@Body() input, @Headers('Authorization') auth:any): Promise<any> {        
      var token = auth.split(' ')[1];   
     if(input.sfnodeDetails && input.key && input.upId && input.nodeName && input.nodeType && input.nodeId && input.params){        
        await this.debugservice.getdebugNodeProcess(input.sfnodeDetails,input.key,input.upId,input.nodeName,input.nodeType,input.nodeId,input.params);       
        return await this.debugservice.getDebugResponse(input.key,input.upId, input.nodeName, input.nodeId);
     }
     else
      return 'sfnodeDetails/key/upId/nodename/nodeid/nodetype/params is empty'
  } 

  //debug form data
  @Post('debugformdata')
  async getdebugFormdata(@Body() input, @Headers('Authorization') auth:any): Promise<any> { 
    var token = auth.split(' ')[1];   
     if(input.key && input.upId && input.nodeId && input.nodeName && input.formdata && token)  
       return await this.debugservice.getFormdata(input.key,input.upId,input.nodeId,input.nodeName,input.formdata,token); 
     else
     return 'key/upId/nodeId/nodename/formdata/token is empty'      
  }

  @Post('debugrequest')
  async debugRequest(@Body() input, @Headers('Authorization') auth:any): Promise<any> {         
      var token = auth.split(' ')[1]; 
    return await this.debugservice.getDebugRequest(input.key,input.upId, input.nodeName, input.nodeId);
  }

  @Post('debughtrequest')
  async debughtRequest(@Body() input, @Headers('Authorization') auth:any): Promise<any> {
    var token = auth.split(' ')[1]; 
    return await this.debugservice.getDebughtRequest(input.key,input.upId, input.nodeName, input.nodeId);
  }

  @Post('debugresponse')
  async debugResponse(@Body() input,@Headers('Authorization') auth:any): Promise<any> {
    var token = auth.split(' ')[1]; 
    return await this.debugservice.getDebugResponse(input.key,input.upId, input.nodeName, input.nodeId);
  }
      
   @Post('save')
   async save(@Body() input, @Headers('Authorization') auth:any) : Promise<any> {  
    var token = auth.split(' ')[1];    
    console.log(input,token)
      return await this.savehandlerService.savehandler(input.key,input.sfkey,input.pKey,input.nodeId,input.nodeName,token,input.mode,input.upId) 
   } 
}
