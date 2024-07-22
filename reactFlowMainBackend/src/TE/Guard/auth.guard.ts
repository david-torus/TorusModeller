import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RedisService } from "src/redisService";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

 constructor(private reflector: Reflector,private readonly redisService: RedisService, private readonly jwtService: JwtService) {}
 
 async canActivate(context: ExecutionContext): Promise<boolean>{
 const request = context.switchToHttp().getRequest();

 var tokenhead: any = request.headers.authorization 
 var btoken = tokenhead.split(' ')[1];      
 var token:any = this.jwtService.decode(btoken,{ json: true }) ;
 
 var orggrp = token.orgGrp.orgGrpCode;
 var orgcode = token.orgGrp.orgCode;
 var rolegrp = token.roleGrp.roleGrpCode;
 var rolecode = token.roleGrp.roleCode;
 var psgrp = token.psGrp.psGrpCode;
 var pscode = token.psGrp.psCode;

 var str = request.body.sfkey.split(':')

 var keyobj = {};
 keyobj['tenatName'] = str[0];
 keyobj['appGroupName'] = str[1];
 keyobj['appName'] = str[2];      
 keyobj['fabric'] = str[3];
 keyobj['artifacts'] = str[4]  
 keyobj['version'] = str[5];

             var found = false;
             var PS:any;
             // var oprChk = await this.redisService.exist(str[0] + ':' +str[1] + ':' + str[2] + ':SF:' + str[4] + ':' + str[5]+':summary')
             // if(oprChk == 0){
             //   throw new NotFoundException('Invalid Security Key')
             // }
             var orpSecurity = JSON.parse(
               await this.redisService.getJsonDataWithPath(str[0] + ':' +str[1] + ':' + str[2] + ':SF:' + str[4] + ':' + str[5]+':summary', '.orgGrp', ));
                        
             for (var a = 0; a < orpSecurity.length; a++) {                       
               if(orpSecurity[a].orgGrpCode == orggrp){                     
                  
                   if(orpSecurity[a].SIFlag == 'A'){
                     
                     for(var b=0;b<orpSecurity[a].actionAllowed.length;b++){

                       if(orpSecurity[a].actionAllowed[b] == '*' || orpSecurity[a].actionAllowed[b] == orgcode){
                          
                         var orgname = orpSecurity[a].org
                         for(var d=0;d<orgname.length;d++){
                           if(orgname[d].orgCode == orgcode){
                            
                            
                             var rlegrp = orgname[d].roleGrp
                             for(var e=0;e<rlegrp.length;e++){                                       
                               if(rlegrp[e].roleGrpCode == rolegrp){
                                
                                
                                 if(rlegrp[e].SIFlag == 'A') {
                                  
                                   for(var f=0;f<rlegrp[e].actionAllowed.length;f++){
                                     if(rlegrp[e].actionAllowed[f] == '*' || rlegrp[e].actionAllowed[f] == rolecode){
                                        
                                       var rle = rlegrp[e].roles
                                       for(var h=0;h<rle.length;h++){
                                         if(rle[h].roleCode == rolecode){
                                           
                                          
                                           var psgrpname = rle[h].psGrp
                                           for(var m=0;m<psgrpname.length;m++){
                                             if(psgrpname[m].psGrpCode == psgrp){
                                               
                                               if(psgrpname[m].SIFlag == 'A'){
                                                 
                                                 for(var n = 0; n < psgrpname[m].actionAllowed.length; n++){
                                                   if(psgrpname[m].actionAllowed[n] == '*' || psgrpname[m].actionAllowed[n] == pscode) {
                                                     found = true 
                                                       PS = psgrpname[m].ps                                                        
                                                   }else{
                                                     throw new BadRequestException('Permission denied to access the Product Service')
                                                   }
                                                 }
                                               }else if(psgrpname[m].SIFlag == 'E'){
                                                 for( var j=0;j<psgrpname[m].actionDenied.length;j++){
                                                   if(psgrpname[m].actionDenied[j] == '*' || psgrpname[m].actionDenied[j] == pscode){
                                                     throw new BadRequestException('Permission denied to access the Product Service group')
                                                   }else{
                                                     found = true
                                                      PS = psgrpname[m].ps                                                     
                                                   }
                                                 }
                                               }
                                             }
                                           }
                                         }
                                       }
                                     }else {
                                         throw new BadRequestException('Permission denied to access the Role')
                                     }
                                   }
                                 }
                                 else if(rlegrp[e].SIFlag == 'E'){
                                   for(var g=0;g<rlegrp[e].actionDenied.length;g++){
                                     if(rlegrp[e].actionDenied[g] == '*' || rlegrp[e].actionDenied[g] == rolecode){
                                        throw new BadRequestException('Permission denied to access the Role Group')
                                     }else {
                                       var rle = rlegrp[e].roles
                                       for(var h=0;h<rle.length;h++){
                                         if(rle[h].roleCode == rolecode){
                                           
                                           var psgrpname = rle[h].psGrp
                                           for(var m=0;m<psgrpname.length;m++){
                                             if(psgrpname[m].psGrpCode == psgrp){
                                               
                                               if(psgrpname[m].SIFlag == 'A'){
                                                 for(var n = 0; n < psgrpname[m].actionAllowed.length; n++){
                                                   if(psgrpname[m].actionAllowed[n] == '*' || psgrpname[m].actionAllowed[n] == pscode) {
                                                     found = true
                                                      PS = psgrpname[m].ps                                                       
                                                   }else{
                                                     throw new BadRequestException('Permission denied to access the Product Service')
                                                   }
                                                 }
                                               }else if(psgrpname[m].SIFlag == 'E'){
                                                 for( var j=0;j<psgrpname[m].actionDenied.length;j++){
                                                   if(psgrpname[m].actionDenied[j] == '*' || psgrpname[m].actionDenied[j] == pscode){
                                                      throw new BadRequestException('Permission denied to access the Product Service group')
                                                   }else{
                                                     found = true
                                                      PS = psgrpname[m].ps                                                     
                                                   }
                                                 }
                                               }
                                             }
                                           }
                                         }
                                       }
                                     }
                                   }
                                 }
                               }

                             }
                           }
                         }
                       }else{                                
                           throw new BadRequestException('Permission denied to access the Organisation');                                
                       }                          
                     }
                   }else if(orpSecurity[a].SIFlag == 'E'){  
                     for(var c=0;c<orpSecurity[a].actionDenied.length;c++){
                       if(orpSecurity[a].actionDenied[c] == '*' || orpSecurity[a].actionDenied[c] == orgcode){
                         throw new BadRequestException('Permission denied to access the Organisation group');
                       }else{ 
                           var orgname = orpSecurity[a].org
                           for(var d=0;d<orgname.length;d++){
                             if(orgname[d].orgCode == orgcode){
                               
                               var rlegrp = orgname[d].roleGrp
                               for(var e=0;e<rlegrp.length;e++){                                       
                                 if(rlegrp[e].roleGrpCode == rolegrp){
                                  
                                   if(rlegrp[e].SIFlag == 'A'){
                                     for(var f=0;f<rlegrp[e].actionAllowed.length;f++){
                                       if(rlegrp[e].actionAllowed[f] == '*' || rlegrp[e].actionAllowed[f] == rolecode){
                                         var rle = rlegrp[e].roles
                                         for(var h=0;h<rle.length;h++){
                                           if(rle[h].roleCode == rolecode){
                                             
                                             var psgrpname = rle[h].psGrp
                                             for(var m=0;m<psgrpname.length;m++){
                                               if(psgrpname[m].psGrpCode == psgrp){
                                                
                                                 if(psgrpname[m].SIFlag == 'A'){
                                                   for( var n=0;n<psgrpname[m].actionAllowed.length;n++){
                                                     if(psgrpname[m].actionAllowed[n] == '*' || psgrpname[m].actionAllowed[n] == pscode){
                                                       found = true;
                                                        PS = psgrpname[m].ps                                                        
                                                     }else{
                                                       throw new BadRequestException('Permission denied to access the Product Service')
                                                     }
                                                   }
                                                 }else if(psgrpname[m].SIFlag == 'E'){
                                                   for( var j=0;j<psgrpname[m].actionDenied.length;j++){
                                                     if(psgrpname[m].actionDenied[j] == '*' || psgrpname[m].actionDenied[j] == pscode){
                                                        throw new BadRequestException('Permission denied to access the Product Service group')
                                                     }else{
                                                       found = true;
                                                        PS = psgrpname[m].ps                                                      
                                                     }
                                                   }
                                                 }
                                               }
                                             }
                                           }
                                         }
                                       }else {
                                         throw new BadRequestException('Permission denied to access the Role')
                                       }
                                     }
                                   }
                                   else if(rlegrp[e].SIFlag == 'E'){
                                     for(var g=0;g<rlegrp[e].actionDenied.length;g++){
                                       if(rlegrp[e].actionDenied[g] == '*' || rlegrp[e].actionDenied[g] == rolecode){
                                          throw new BadRequestException('Permission denied to access the Role group')
                                       }else {
                                         var rle = rlegrp[e].roles
                                         for(var h=0;h<rle.length;h++){
                                           if(rle[h].roleCode == rolecode){
                                            
                                             var psgrpname = rle[h].psGrp
                                             for(var m=0;m<psgrpname.length;m++){
                                               if(psgrpname[m].psGrpCode == psgrp){
                                                
                                                 if(psgrpname[m].SIFlag == 'A'){
                                                   for( var n=0;n<psgrpname[m].actionAllowed.length;n++){
                                                     if(psgrpname[m].actionAllowed[n] == '*' || psgrpname[m].actionAllowed[n] == pscode){
                                                       found = true;
                                                        PS = psgrpname[m].ps                                                        
                                                     }else{
                                                       throw new BadRequestException('Permission denied to access the Product Service')
                                                     }
                                                   }
                                                 }else if(psgrpname[m].SIFlag == 'E'){
                                                   for( var j=0;j<psgrpname[m].actionDenied.length;j++){
                                                     if(psgrpname[m].actionDenied[j] == '*' || psgrpname[m].actionDenied[j] == pscode){
                                                        throw new BadRequestException('Permission denied to access the Product Service group')
                                                     }else{
                                                       found = true;
                                                        PS = psgrpname[m].ps                                                        
                                                     }
                                                   }
                                                 }
                                               }
                                             }
                                           }
                                         }
                                       }
                                     }
                                   }
                                 }

                               }
                             }
                           }                                 
                       }                          
                     }
                   }                    
               }
             }

 if(found == true){  
    console.log('Process started from Guard') 
    return true
 } else{    
 throw new BadRequestException(`${token.orgGrp.orgGrpCode} /${token.roleGrp.roleGrpCode} /${token.psGrp.psGrpCode} group code not found.`)
 } 
}

}