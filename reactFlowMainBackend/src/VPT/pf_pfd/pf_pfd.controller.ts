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
import { PfPfdService } from './pf_pfd.service';

@Controller('pf-pfd')
export class PfPfdController {
  constructor(private readonly pfPfdService: PfPfdService) {}

  getHello(): string {
    return 'Hello World!';
  }

  @Get()
  async getJson(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.pfPfdService.getJson(
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
    return await this.pfPfdService.getAppGroup(query.tKey);
  }

  @Get('applicationList')
  async getApplicationList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.pfPfdService.getApplication(query.tKey, query.client);
  }

  @Get('fabricsList')
  async getFabricsList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return await this.pfPfdService.getFabrics(
      query.tKey,
      query.client,
      query.project,
    );
  }

  @Get('artifactList')
  async getArtifactList(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return await this.pfPfdService.getArtifact(
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
    return await this.pfPfdService.getArtifactWithVersion(
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
    return await this.pfPfdService.getVersion(
      query.tKey,
      query.client,
      query.fabrics,
      query.project,
      query.artifact,
      query.saveKey,
    );
  }
  @Post()
  async saveJson(
    @Body() req: any,
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.pfPfdService.saveaWorkFlow(
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
    return this.pfPfdService.deleteApplication(
      query.project,
      query.tKey,
      query.client,
      query.fabrics,
    );
  }
}
