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

import { UfSldService } from './uf_sld.service';

@Controller('uf-sld')
export class UfSldController {
  constructor(private readonly ufSldService: UfSldService) {}

  @Get()
  async getJson(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.ufSldService.getJson(
      query.project,
      query.version,
      query.artifact,
      query.tKey,
      query.client,
      query.fabrics,
    );
  }

  @Get('appGroupList')
  async getAppGroupList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.ufSldService.getAppGroup(query.tKey);
  }

  @Get('applicationList')
  async getApplicationList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.ufSldService.getApplication(query.tKey, query.client);
  }

  @Get('fabricsList')
  async getFabricsList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return await this.ufSldService.getFabrics(
      query.tKey,
      query.client,
      query.project,
    );
  }

  @Get('artifactList')
  async getArtifactList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return await this.ufSldService.getArtifact(
      query.tKey,
      query.client,
      query.fabrics,
      query.project,
    );
  }
  @Get('versionList')
  async getVersionList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return await this.ufSldService.getVersion(
      query.tKey,
      query.client,
      query.fabrics,
      query.project,
      query.artifact,
    );
  }

  @Get('defaultVersion')
  async getdefaultversion(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.ufSldService.getDefaultVersion();
  }

  @Post()
  async saveJson(
    @Body() req: any,
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {

    return await this.ufSldService.saveaWorkFlow(
      req,
      query.type,
      query.version,
      query.tKey,
      query.client,
      query.fabrics,
    );
  }

  @Delete('/deleteApplication')
  async deleteApplication(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return this.ufSldService.deleteApplication(
      query.project,
      query.tKey,
      query.client,
      query.fabrics,
    );
  }
}
