import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getEvents(@Query(new ValidationPipe({ transform: true })) query: any) {
    return this.eventsService.getEvents(
      query.tenant,
      query.appGroup,
      query.app,
      query.fabrics,
      query.artifact,
      query.version,
      query.componentName,
      query.controlName,
      query.saveKey,
    );
  }
  @Get('initiate')
  getIniateEventsData(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return this.eventsService.getIniateEventsData(
      query.tKey,
      query.client,
      query.project,
      query.fabrics,
      query.artifact,
      query.version,
      query.saveKey,
    );
  }

  @Get('version')
  getVersion(@Query(new ValidationPipe({ transform: true })) query: any) {
    return this.eventsService.getVersion(
      query.tenant,
      query.appGroup,
      query.app,
      query.fabrics,
      query.artifact,
      query.version,
      query.componentName,
      query.controlName,
    );
  }

  @Post()
  saveEvents(
    @Body() body,
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return this.eventsService.saveEvents(
      query.tenant,
      query.appGroup,
      query.app,
      query.fabrics,
      query.artifact,
      query.version,
      query.componentName,
      query.controlName,
      query.ccwVersion,
      body,
      query.saveKey,
    );
  }

  @Delete()
  deleteEvents(@Query(new ValidationPipe({ transform: true })) query: any) {
    return this.eventsService.deleteEventVersion(
      query.tenant,
      query.appGroup,
      query.app,
      query.fabrics,
      query.artifact,
      query.version,
      query.componentName,
      query.controlName,
    );
  }
}
