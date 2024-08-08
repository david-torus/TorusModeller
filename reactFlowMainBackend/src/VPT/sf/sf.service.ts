import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from '../../redisService';

import { error } from 'console';
import { CommonVptServices } from '../commonVptServices';

@Injectable()
export class SFService {
  constructor(
    private readonly redisService: RedisService,
    private readonly commonVptServices: CommonVptServices,
  ) {}
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
      let isLocked = await this.commonVptServices.getArtifactLockin(
        key + ':artifactInfo',
      );
      if (isLocked !== false) {
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
          isLocked: !isLocked,
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

        this.commonVptServices.setArtifactLockin(
          key + ':artifactInfo',
          !isLocked,
        );

        console.log('🚀 ~ AppService ~ res:', res);
        return {
          data: res,
          status: 200,
        };
      } else {
        return { data: 'Artifact is locked', status: 409 };
      }
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

  async getRedisAll(tenants) {
    let newObj = {};
    for (let index = 0; index < tenants.length; index++) {
      const element = tenants[index];
      const res = await this.readReddis(element);
      console.log('🚀 ~ AppService ~ getRedisAll ~ res:', res);
      let tenantJson: any = await JSON.parse(res);
      console.log(tenantJson, 'tenantJsontenantJsontenantJson');
      if (tenantJson && Object.keys(tenantJson).length > 0) {
        newObj = { ...newObj, ...tenantJson };
        console.log(tenantJson, 'hjhjhjhgh');
      }
    }

    return newObj;
  }

  async createRedisFiles(obj, currentPath = '', interator) {
    let path = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newPath = `${currentPath}:${key}`;
        path.push(newPath);

        if (typeof obj[key] == 'object' && obj[key] !== null) {
          if (interator <= 6) {
            path = path.concat(
              await this.createRedisFiles(obj[key], newPath, interator + 1),
            );
          } else {
            let arr = newPath.split(':');
            arr.shift();
            const kes = arr.join(':');
            console.log(kes, 'key');
            // await redis.call('JSON.SET', kes, '$', JSON.stringify(obj[key]));
          }
        }
      }
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
      let result = {};

      let flowNodes = structuredClone(req.flow.nodes);

      let flowNodeEdges = req.flow.nodeEdges;
      // if (Object.keys(flowNodes).length > 0) {
      //   flowNodes.forEach((element) => {
      //     nodeSPLid.push(element.id);
      //   });

      //   if (typeof flowNodesProperty === 'object') {
      //     Object.keys(flowNodesProperty).forEach((element) => {
      //       nodeProSPLid.push(element);
      //     });
      //   }

      //   nodeProSPLid.forEach((element) => {
      //     if (!nodeSPLid.includes(element)) {
      //       delete flowNodesProperty[element];
      //     }
      //   });
      // }

      const summary = this.transformJSON(flowNodes);

      result = {
        nodes: flowNodes,
        nodeProperty: flowNodes.reduce((acc, node) => {
          if (Object.keys(node.data.nodeProperty).length > 0) {
            acc[node.id] = node.data.nodeProperty;
          }
          return acc;
        }, {}),
        nodeEdges: flowNodeEdges,
        summary: summary,
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

      await this.commonVptServices.manageArtifactInfo(
        client,
        type,
        keys + ':' + req.artifact + ':' + newVersion + ':' + 'artifactInfo',
      );
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

  transformJSON(values) {
    const outputJSON = {
      orgGrp: [],
    };

    values
      .filter((node) => node.type === 'orgGrp')
      .map((orgGrp) => {
        outputJSON.orgGrp.push(createOrgGrp(orgGrp));
      });

    function createOrgGrp(orgGrp) {
      return {
        id: orgGrp.data?.id,
        orgGrpName: orgGrp.data?.label,
        orgGrpCode: orgGrp.data?.code,
        SIFlag: orgGrp.data.SIFlag,
        actionAllowed: orgGrp.data.actionAllowed,
        actionDenied: orgGrp.data.actionDenied,
        org: orgGrp.data?.children
          ? orgGrp.data.children.map((childId) => {
              const child = values.find((node) => node.id === childId);
              return createOrg(child);
            })
          : [],
      };
    }

    function createOrg(org) {
      return {
        id: org.data?.id,
        orgCode: org.data?.code,
        orgName: org.data?.label,
        roleGrp: org.data?.children
          ? org.data.children.map((childId) => {
              const child = values.find((node) => node.id === childId);
              return createRoleGrp(child);
            })
          : [],
      };
    }

    function createRoleGrp(roleGrp) {
      return {
        id: roleGrp.data?.id,
        roleGrpCode: roleGrp.data?.code,
        roleGrpName: roleGrp.data?.label,
        SIFlag: roleGrp.data.SIFlag,
        actionAllowed: roleGrp.data.actionAllowed,
        actionDenied: roleGrp.data.actionDenied,
        nodeType: 'roleGrp',
        roles: roleGrp.data?.children
          ? roleGrp.data.children.map((childId) => {
              const child = values.find((node) => node.id === childId);
              return createRole(child);
            })
          : [],
      };
    }

    function createRole(role) {
      return {
        id: role.data?.id,
        roleCode: role.data?.code,
        roleName: role.data?.label,
        psGrp: role.data?.children
          ? role.data.children.map((childId) => {
              const child = values.find((node) => node.id === childId);
              return createPsGrp(child);
            })
          : [],
      };
    }

    function createPsGrp(psGrp) {
      return {
        id: psGrp.data?.id,
        psGrpCode: psGrp.data?.code,
        psGrpName: psGrp.data?.label,
        SIFlag: psGrp.data?.SIFlag,
        actionAllowed: psGrp.data?.actionAllowed,
        actionDenied: psGrp.data?.actionDenied,
        ps: psGrp.data?.children
          ? psGrp.data.children.map((childId) => {
              const child = values.find((node) => node.id === childId);
              return createPs(child);
            })
          : [],
      };
    }

    function createPs(ps) {
      return {
        id: ps.data?.id,
        psCode: ps.data?.code,
        psName: ps.data?.label,
        pf: ps.data?.nodeProperty?.pf || [],
        df: ps.data?.nodeProperty?.df || [],
        uf: ps.data?.nodeProperty?.uf || [],
      };
    }

    return outputJSON;
  }
}
