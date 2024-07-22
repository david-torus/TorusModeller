import { Controller, Get, Logger } from "@nestjs/common";
import { TeCommonService } from "./teCommonService";

@Controller('log')
export class LogController {
    constructor(private readonly tecommonService:TeCommonService ) {}        
        private readonly logger = new Logger(LogController.name);

    @Get('processLog')   
    async getPrcLogs(): Promise<any> {   
       return await this.tecommonService.getPrcLogs();       
    }
 
    @Get('exceptionLog')
    async getExceplogs(): Promise<any> {   
       return await this.tecommonService.getExceplogs()     
    }
  
    
    @Get('debugLog')
    async getDebugLogs(): Promise<any> {   
         return await this.tecommonService.getDebugLogs();       
    }
 
    @Get('debugExceptionLog')
    async getdebugExceplogs(): Promise<any> {   
       return await this.tecommonService.getdebugExceplogs()     
    }
    
    @Get('nodeDebugLog')
    async getNodeDebugLogs(): Promise<any> {   
         return await this.tecommonService.getNodeDebugLogs();       
    }
 
    @Get('nodeExcepLog')
    async getNodeExceplogs(): Promise<any> {   
         return await this.tecommonService.getNodeExceplogs();       
    }  
}