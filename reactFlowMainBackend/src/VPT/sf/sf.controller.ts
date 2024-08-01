import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ValidationPipe,
  Delete,
  Inject,
} from '@nestjs/common';

import { SFService } from './sf.service';

@Controller('sf')
export class SFController {
  constructor(private readonly sfService: SFService) {}

  @Get()
  async getJson(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.sfService.getJson(
      query.project,
      query.version,
      query.artifact,
      query.tKey,
      query.client,
      query.fabrics,
      query.saveKey,
    );
  }

  @Get('appGroupList')
  async getAppGroupList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.sfService.getAppGroup(query.tKey);
  }

  @Get('applicationList')
  async getApplicationList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.sfService.getApplication(query.tKey, query.client);
  }

  @Get('fabricsList')
  async getFabricsList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return await this.sfService.getFabrics(
      query.tKey,
      query.client,
      query.project,
    );
  }

  @Get('artifactList')
  async getArtifactList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return await this.sfService.getArtifact(
      query.tKey,
      query.client,
      query.fabrics,
      query.project,
      query.saveKey,
    );
  }

  @Get('artifactListWithVersion')
  async getArtifactListWithVersion(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return await this.sfService.getArtifactWithVersion(
      query.tKey,
      query.client,
      query.fabrics,
      query.project,
      query.saveKey,
    );
  }
  @Get('versionList')
  async getVersionList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return await this.sfService.getVersion(
      query.tKey,
      query.client,
      query.fabrics,
      query.project,
      query.artifact,
      query.saveKey,
    );
  }

  @Get('defaultVersion')
  async getdefaultversion(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.sfService.getDefaultVersion();
  }

  @Post()
  async saveJson(
    @Body() req: any,
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.sfService.saveaWorkFlow(
      req,
      query.type,
      query.version,
      query.tKey,
      query.client,
      query.fabrics,
      query.saveKey,
    );
  }

  @Delete('/deleteApplication')
  async deleteApplication(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return this.sfService.deleteApplication(
      query.project,
      query.tKey,
      query.client,
      query.fabrics,
    );
  }
}
