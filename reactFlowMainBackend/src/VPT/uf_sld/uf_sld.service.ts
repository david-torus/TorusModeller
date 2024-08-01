import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from '../../redisService';

import { error } from 'console';

@Injectable()
export class UfSldService {
  constructor(private readonly redisService: RedisService) {}
  async getJson(
    project,
    version,
    artifact,
    tKey,
    client,
    fabrics,
    saveKey,
  ): Promise<any> {
    try {
      let arrKey = JSON.parse(saveKey);
      let key = '';
      if (arrKey.length > 0) {
        key = arrKey.join(':');
      }
      let res = {};
      const nodes: Promise<any> = new Promise((resolve, reject) => {
        try {
          const node = this.readReddis(key + ':' + 'nodes');
          resolve(node);
        } catch (error) {
          reject(error);
        }
      });

      const nodeEdges: Promise<any> = new Promise((resolve, reject) => {
        try {
          const nodeEdge = this.readReddis(key + ':' + 'nodeEdges');
          resolve(nodeEdge);
        } catch (error) {
          reject(error);
        }
      });

      const nodeProperty: Promise<any> = new Promise((resolve, reject) => {
        try {
          const property = this.readReddis(key + ':' + 'nodeProperty');
          resolve(property);
        } catch (error) {
          reject(error);
        }
      });

      const result = await Promise.all([nodes, nodeEdges, nodeProperty])
        .then((values) => {
          console.log('🚀 ~ AppService ~ values:', values);
          return values;
        })
        .catch((error) => {
          throw new BadRequestException(error);
        });

      console.log('🚀 ~ AppService ~ res:', result);
      res = {
        nodes: JSON.parse(result[0]),
        nodeEdges: JSON.parse(result[1]),
        nodeProperty: JSON.parse(result[2]),
      };

      let node = res['nodes'].map((node) => {
        if (
          res.hasOwnProperty('nodeProperty') &&
          res['nodeProperty'].hasOwnProperty(node.id)
        ) {
          return {
            ...node,
            data: {
              ...node.data,
              label: res['nodeProperty'][node.id].nodeName,
              nodeProperty: res['nodeProperty'][node.id],
            },
          };
        } else {
          return {
            ...node,
            data: {
              ...node.data,
              nodeProperty: {},
            },
          };
        }
      });

      res = {
        ...res,
        nodes: node,
      };

      console.log('🚀 ~ AppService ~ res:', res);
      return {
        data: res,
        status: 200,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteApplication(
    project: any,
    tKey: any,
    client,
    fabrics,
  ): Promise<any> {
    try {
      const res = await this.readReddis(tKey);
      const application = await JSON.parse(res);
      console.log('application --->', application);
      if (application[tKey][client][fabrics][project]) {
        delete application[tKey][client][fabrics][project];
        await this.writeReddis(tKey, application);

        return { msg: 'Successfully Deleted', status: 200 };
      }
      return { msg: 'Application Not Found', status: 400 };
    } catch (error) {
      throw error;
    }
  }

  async getAppGroup(tKey): Promise<any> {
    try {
      const res = await this.readReddis(tKey);
      const application = await JSON.parse(res);
      const response = [];
      if (
        application &&
        application.hasOwnProperty(tKey) &&
        Object.keys(application[tKey]).length &&
        typeof application === 'object'
      ) {
        const appGroupList = Object.keys(application[tKey]);
        if (appGroupList) {
          for (let client of appGroupList) {
            response.push(client);
          }
        }
      }

      return {
        data: response,
        status: 200,
      };
    } catch (error) {
      throw error;
    }
  }

  async getApplication(tKey, client): Promise<any> {
    try {
      const res = await this.readReddis(tKey);
      const applications = await JSON.parse(res);
      console.log(applications, 'appllllll');
      const response = [];
      if (
        applications &&
        applications.hasOwnProperty(tKey) &&
        applications[tKey].hasOwnProperty(client) &&
        typeof applications === 'object'
      ) {
        const applicationList = Object.keys(applications[tKey][client]);

        if (applicationList) {
          for (let application of applicationList) {
            response.push(application);
          }
        }
      }

      return {
        data: response,
        status: 200,
      };
    } catch (error) {
      throw error;
    }
  }

  async getFabrics(tKey, client, project): Promise<any> {
    try {
      const res = await this.readReddis(tKey);
      const applications = await JSON.parse(res);
      console.log(applications, 'appllllll');
      const response = [];
      if (
        applications &&
        applications.hasOwnProperty(tKey) &&
        applications[tKey].hasOwnProperty(client) &&
        applications[tKey][client].hasOwnProperty(project) &&
        applications[tKey][client][project] &&
        typeof applications === 'object'
      ) {
        const fabricsList = Object.keys(applications[tKey][client][project]);

        if (fabricsList) {
          for (let fabrics of fabricsList) {
            response.push(fabrics);
          }
        }

        return {
          data: response,
          status: 200,
        };
      } else {
        return {
          data: [],
          status: 200,
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async getArtifact(tKey, client, fabrics, project, saveKey): Promise<any> {
    try {
      let arrKey = JSON.parse(saveKey);
      let key = '';
      if (arrKey.length > 0) {
        key = arrKey.join(':');
      }
      const keys = await this.redisService.getKeys(key);

      let aritfact = new Set([]);
      if (keys && keys.length > 0) {
        for (let i = 0; i < keys.length; i++) {
          const artifacts = keys[i].split(':');
          if (artifacts.length == 8 && artifacts[5]) aritfact.add(artifacts[5]);
        }
      }

      return {
        data: Array.from(aritfact),
        status: 200,
      };
    } catch (error) {
      throw error;
    }
  }
  async getArtifactWithVersion(
    tKey,
    client,
    fabrics,
    project,
    saveKey,
  ): Promise<any> {
    try {
      let arrKey = JSON.parse(saveKey);
      let key = '';
      if (arrKey.length > 0) {
        key = arrKey.join(':');
      }
      const keys = await this.redisService.getKeys(key);

      let aritfact = new Set([]);
      if (keys && keys.length > 0) {
        for (let i = 0; i < keys.length; i++) {
          const artifacts = keys[i].split(':');
          if (artifacts.length == 8 && artifacts[5]) aritfact.add(artifacts[5]);
        }
      }
      let response = [];

      for (let artifact of Array.from(aritfact)) {
        response.push({
          artifact: artifact,
          versionList: await this.getVersion(
            tKey,
            client,
            fabrics,
            project,
            artifact,
            saveKey,
          ).then((res) => res.data),
        });
      }

      return {
        data: response,
        status: 200,
      };
    } catch (error) {
      throw error;
    }
  }

  async getVersion(
    tKey,
    client,
    fabrics,
    project,
    artifact,
    saveKey,
  ): Promise<any> {
    try {
      let arrKey = JSON.parse(saveKey);
      let key = '';
      if (arrKey.length > 0) {
        key = arrKey.join(':');
      }

      const keys = await this.redisService.getKeys(`${key}:${artifact}`);

      let version = new Set([]);
      if (keys && keys.length > 0) {
        for (let i = 0; i < keys.length; i++) {
          const versions = keys[i].split(':');
          if (versions.length == 8 && versions[6]) version.add(versions[6]);
        }
      }

      return {
        data: Array.from(version).sort(),
        status: 200,
      };
    } catch (error) {
      throw error;
    }
  }

  async saveaWorkFlow(
    req: any,
    type: string,
    version: any,
    tKey: string,
    client: string,
    fabrics: string,
    saveKey: string,
  ): Promise<any> {
    try {
      let arrKey = JSON.parse(saveKey);
      let keys = '';
      if (arrKey.length > 0) {
        keys = arrKey.join(':');
      }
      console.log(req, 'req.flow');

      let updateResult = {};
      let result = {};
      let nodeSPLid = [];
      let nodeProSPLid = [];

      let flowNodes = structuredClone(req.flow.nodes);
      let flowNodesProperty = structuredClone(req.flow.nodeProperty);
      let flowNodeEdges = req.flow.nodeEdges;
      if (Object.keys(flowNodes).length > 0) {
        flowNodes.forEach((element) => {
          nodeSPLid.push(element.id);
        });

        if (typeof flowNodesProperty === 'object') {
          Object.keys(flowNodesProperty).forEach((element) => {
            nodeProSPLid.push(element);
          });
        }

        nodeProSPLid.forEach((element) => {
          if (!nodeSPLid.includes(element)) {
            delete flowNodesProperty[element];
          }
        });
      }

      result = {
        nodes: flowNodes,
        nodeProperty: flowNodes.reduce((acc, node) => {
          if (Object.keys(node.data.nodeProperty).length > 0) {
            acc[node.id] = node.data.nodeProperty;
          }
          return acc;
        }, {}),
        nodeEdges: flowNodeEdges,
      };

      let newVersion = 'v1';
      if (type === 'create') {
        let versionList = await this.getVersion(
          tKey,
          client,
          fabrics,
          req.project,
          req.artifact,
          saveKey,
        );
        if (
          versionList &&
          versionList.status === 200 &&
          versionList.data &&
          versionList.data.length > 0
        ) {
          newVersion = `v${versionList.data.length + 1}`;
        }
      } else {
        newVersion = version;
      }

      Object.keys(result).forEach(async (key) => {
        await this.writeReddis(
          keys + ':' + req.artifact + ':' + newVersion + ':' + key,
          result[key],
        );
      });
      if (type === 'create') {
        let versions = await this.getVersion(
          tKey,
          client,
          fabrics,
          req.project,
          req.artifact,
          saveKey,
        );
        if (versions && versions.status === 200) {
          return {
            status: 200,
            data: versions.data,
          };
        } else {
          return {
            status: 400,
            data: [],
          };
        }
      } else {
        return { msg: `${version} Updated`, status: 201 };
      }
    } catch (error) {
      return error;
    }
  }

  async getDefaultVersion() {
    const res = await this.redisService.getJsonData('UF:defaultJson');
    if (res) {
      const parsedData = JSON.parse(res);
      const keys = Object.keys(parsedData);
      const lastKey = keys[keys.length - 1];
      return parsedData[lastKey];
    } else {
      return null;
    }
  }

  async readReddis(tKey): Promise<any> {
    return await this.redisService.getJsonData(tKey);
  }

  async writeReddis(key, json): Promise<any> {
    await this.redisService.setJsonData(key, JSON.stringify(json));
  }
}
