import { BadRequestException, Injectable } from '@nestjs/common';

import { RedisService } from 'src/redisService';
interface artifactInfo {
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
  isLocked: boolean;
}

@Injectable()
export class CommonVptServices {
  constructor(private readonly redisService: RedisService) {}
  async getArtifactLockin(key: string) {
    try {
      let data = await this.redisService.getJsonData(key);
      data = JSON.parse(data);
      if (data && data.hasOwnProperty('isLocked')) {
        return data.isLocked;
      } else {
        return 'No ArtifactInfo Found';
      }
    } catch (error) {
      throw error;
    }
  }
  async setArtifactLockin(key: string, value: boolean) {
    try {
      let data = await this.redisService.getJsonData(key);
      data = JSON.parse(data);
      data = {
        ...data,
        isLocked: value,
      };
      let res;
      await this.redisService
        .setJsonData(key, JSON.stringify(data))
        .then(() => {
          res = 'success';
        })
        .catch(() => {
          res = 'fail';
        });

      return res;
    } catch (error) {
      throw error;
    }
  }

  async manageArtifactInfo(client: string, type: string, redisKey: string) {
    try {
      let artifactInfo: artifactInfo;
      if (type === 'create') {
        artifactInfo = {
          createdBy: client,
          createdOn: new Date().toJSON(),
          updatedBy: '',
          updatedOn: '',
          isLocked: true,
        };
        await this.redisService.setJsonData(
          redisKey,
          JSON.stringify(artifactInfo),
        );
      } else {
        let res = await this.redisService.getJsonData(redisKey);
        artifactInfo = JSON.parse(res);
        artifactInfo = {
          ...artifactInfo,
          updatedBy: client,
          updatedOn: new Date().toJSON(),
          isLocked: true,
        };
        await this.redisService.setJsonData(
          redisKey,
          JSON.stringify(artifactInfo),
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
