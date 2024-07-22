import { DfErdService } from './df_erd.service';
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

@Controller('df-erd')
export class DfErdController {
  constructor(private readonly dfErdService: DfErdService) {}
  getHello(): string {
    return 'Hello World!';
  }

  @Get()
  async getJson(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.dfErdService.getJson(
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
    return await this.dfErdService.getAppGroup(query.tKey);
  }

  @Get('applicationList')
  async getApplicationList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.dfErdService.getApplication(query.tKey, query.client);
  }

  @Get('fabricsList')
  async getFabricsList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return await this.dfErdService.getFabrics(
      query.tKey,
      query.client,
      query.project,
    );
  }

  @Get('artifactList')
  async getArtifactList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return await this.dfErdService.getArtifact(
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
    return await this.dfErdService.getVersion(
      query.tKey,
      query.client,
      query.fabrics,
      query.project,
      query.artifact,
    );
  }

  @Post()
  async saveJson(
    @Body() req: any,
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.dfErdService.saveaWorkFlow(
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
    return this.dfErdService.deleteApplication(
      query.project,
      query.tKey,
      query.client,
      query.fabrics,
    );
  }

  @Get('defaultVersion')
  async getdefaultversion(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.dfErdService.getDefaultVersion();
  }
}
