import { PfdService } from './pfd/pfd.service';
import { Controller, Delete, Patch } from '@nestjs/common';
import {
  Body,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { VptService } from './vpt.service';
import { query } from 'express';

@Controller('vpt')
export class VptController {
  constructor(
    private readonly vptService: VptService,
    pfdService: PfdService,
  ) {}

  @Get('domainList')
  async getDomain(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.getDomain(query.source);
  }

  @Get('customCodeExecute')
  async customCodeExecute(
    @Body() body,
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.customCodeExcute(body.code);
  }

  @Post('domainCreate')
  async createDomain(
    @Body(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.createDomain(query.source, query.domain);
  }

  @Get('appGroupList')
  async getAppGroupList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.getAppGroup(query.tenant);
  }

  @Post('appGroupCreate')
  async createAppGroup(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.createAppGroup(query.tenant, query.appGroup);
  }

  @Get('applicationList')
  async getApplicationList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.getApplication(
      query.tKey,
      query.client,
      query.saveKey,
    );
  }

  @Get('catelogue')
  async getApplicationListwithArtifactsGrp(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.getCatelogue(
      query.tKey,
      query.client,
      query.saveKey,
    );
  }

  @Get('artifactsGroup')
  async getArtifactsGroup(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.getArtifactsGroup(query.saveKey);
  }

  @Post('applicationCreate')
  async createApplication(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.createApplication(
      query.tenant,
      query.appGroup,
      query.applicationName,
    );
  }

  @Get('defaultVersion')
  async getDefaultVersion(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.getDefaultVersion(
      query.source,
      query.domain,
      query.fabrics,
      query.artifact,
    );
  }

  @Delete('deleteDomain')
  async deleteDomain(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.deleteDomain(query.source, query.domain);
  }

  @Delete('deleteAppGroup')
  async deleteAppGroup(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.deleteAppGroup(query.tenant, query.appGroup);
  }

  @Delete('deleteApplication')
  async deleteApplication(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.deleteApplication(
      query.tenant,
      query.appGroup,
      query.applicationName,
    );
  }

  @Delete('deleteDefaultVersion')
  async deleteDefaultVersion(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.deleteDefaultVersion(
      query.source,
      query.domain,
      query.fabrics,
      query.artifact,
      query.version,
    );
  }

  @Delete('deleteDefaultArtifact')
  async deleteDefaultArtifact(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.deleteDefaultArtifact(
      query.source,
      query.domain,
      query.fabrics,
      query.artifact,
    );
  }

  @Delete('deleteFlowArtifact')
  async deleteFlowArtifact(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return await this.vptService.deleteFlowArtifact(
      query?.tenant,
      query?.appGroup,
      query?.applicationName,
      query?.fabrics,
      query?.artifact,
      query.saveKey,
    );
  }

  @Delete('deleteFlowVersion')
  async deleteFlowVersion(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return await this.vptService.deleteFlowVersion(
      query.tenant,
      query.appGroup,
      query.applicationName,
      query.fabrics,
      query.artifact,
      query.version,
    );
  }
  @Get('renameArtifacts')
  async artifactNameEdit(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.renameArtifacts(query.oldKey, query.newKey);
  }

  @Get('treeFabrics')
  async getTreeFabrics(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.getTreeFabrics(query.tenant);
  }

  @Delete('deleteRedisKeys')
  async deleteRedisKeys(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return await this.vptService.delete(query.key);
  }

  @Post('customCodeObjects')
  async getPFobjects(@Body() input): Promise<any> {
    return await this.vptService.getPF(input);
  }

  @Post('errorlog')
  async handleErrorlog(
    @Body() req: any,
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    const { errObj, token, key, errorMessage, statusCode } = req;
    return await this.vptService.handleErroLog(
      errObj,
      token,
      key,
      errorMessage,
      statusCode,
    );
  }

  @Get(`getNodeList`)
  async getNodeList(@Query() query): Promise<any> {
    return await this.vptService.getNodeList(
      query.project,
      query.verion,
      query.artifact,
      query.tKey,
      query.client,
      query.fabrics,
      query.saveKey,
    );
  }

  @Patch('changeArtifactLock')
  async changeArtifactLock(
    @Body() body: any,
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.changeArtifactLock(query.saveKey, body.data);
  }

  @Post('createArtifactInfo')
  async changeArtifactLockPost(
    @Body() body: any,
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.vptService.createArtifactInfo(
      body.client,
      body.type,
      body.key,
    );
  }

  @Post('getArtifactDetail')
  async getArtifactDetailList(@Body() data: any) {
    const { client, loginId, artifactType, fabric, catalog, artifactGrp } =
      data;
    return this.vptService.getRecentArtifactDetailList(
      loginId,
      artifactType,
      client,
      fabric,
      catalog,
      artifactGrp,
    );
  }

  @Post('getAllArtifacts')
  async getAllArtifacts(@Body() data: any) {
    return this.vptService.getAllArtifacts(data.saveKey, data?.stopAt);
  }

  @Get('getAllCatalogWithArtifactGroup')
  async getAllCatalogWithArtifactGroup(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return this.vptService.getAllCatalogWithArtifactGroup(query.fabric);
  }
}
