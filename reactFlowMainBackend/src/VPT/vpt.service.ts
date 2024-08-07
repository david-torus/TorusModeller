import { HttpService } from '@nestjs/axios';
import { PfdService } from './pfd/pfd.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { PfPfdService } from './pf_pfd/pf_pfd.service';
import { RedisService } from 'src/redisService';
import { ZenEngine } from '@gorules/zen-engine';
import { CommonService } from 'src/commonService';
import { CommonVptServices } from './commonVptServices';
interface changeArtifactLockData {
  value: boolean;
}
type fabric = 'pf' | 'uf' | 'sf' | 'df';

type artifactType = 'frk' | 'crk' | 'tpfrk';
@Injectable()
export class VptService {
  constructor(
    private readonly redisService: RedisService,
    private readonly pfdService: PfdService,
    private readonly CommonService: CommonService,
    private readonly commonVptServices: CommonVptServices,
    private readonly pfPfdService: PfPfdService,
  ) {}

  async getDomain(source): Promise<any> {
    try {
      const res = await this.readReddis(source);
      const application = await JSON.parse(res);
      const response = [];
      if (
        application &&
        application.hasOwnProperty(source) &&
        Object.keys(application[source]).length &&
        typeof application === 'object'
      ) {
        const domainList = Object.keys(application[source]);

        if (domainList) {
          for (let domain of domainList) {
            response.push(domain);
          }
        }
        return {
          data: response,
          status: 200,
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async createDomain(source, domain): Promise<any> {
    try {
      const res = await this.readReddis(source);
      const application = await JSON.parse(res);
      if (
        application &&
        application.hasOwnProperty(source) &&
        typeof application === 'object'
      ) {
        if (application[source].hasOwnProperty(domain)) {
          throw new BadRequestException('Domain Already Exist');
        } else {
          application[source][domain] = {};
          await this.writeReddis(source, application);
          let res = [];
          let domainList = Object.keys(application[source]);

          if (domainList) {
            for (let domain of domainList) {
              res.push(domain);
            }
          }

          return {
            data: res,
            status: 200,
          };
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async handleErroLog(
    errObj,
    token,
    key,
    errorMessage,
    statusCode,
  ): Promise<any> {
    try {
      return await this.CommonService.commonErrorLogs(
        errObj,
        token,
        key,
        errorMessage,
        statusCode,
      );
    } catch (error) {
      throw error;
    }
  }

  async getAppGroup(tenant): Promise<any> {
    try {
      const res = await this.readReddis(tenant);
      const application = await JSON.parse(res);
      const response = [];
      if (
        application &&
        application.hasOwnProperty(tenant) &&
        Object.keys(application[tenant]).length &&
        typeof application === 'object'
      ) {
        const appGroupList = Object.keys(application[tenant]);
        if (appGroupList) {
          for (let appGroup of appGroupList) {
            response.push(appGroup);
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

  async createAppGroup(tenant, appGroup): Promise<any> {
    try {
      const res = await this.readReddis(tenant);
      let application = await JSON.parse(res);
      if (
        application &&
        application.hasOwnProperty(tenant) &&
        typeof application === 'object'
      ) {
        if (application[tenant].hasOwnProperty(appGroup)) {
          throw new BadRequestException('AppGroup Already Exist');
        } else {
          application[tenant][appGroup] = {};
          await this.writeReddis(tenant, application);
          let res = [];
          let appGroupList = Object.keys(application[tenant]);
          if (appGroupList) {
            for (let appGroup of appGroupList) {
              res.push(appGroup);
            }
          }
          return {
            data: res,
            status: 200,
          };
        }
      } else {
        application = {
          [tenant]: {
            [appGroup]: {},
          },
        };
        await this.writeReddis(tenant, application);
        let res = [];
        let appGroupList = Object.keys(application[tenant]);
        if (appGroupList) {
          for (let appGroup of appGroupList) {
            res.push(appGroup);
          }
        }
        return {
          data: res,
          status: 200,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async getApplication(tenant, appGroup, saveKey): Promise<any> {
    console.log(saveKey, 'saveKey=====>>>>>>>');

    try {
      let arrKey = JSON.parse(saveKey);
      let key = '';
      if (arrKey.length > 0) {
        key = arrKey.join(':');
      }
      const keys = await this.redisService.getKeys(key);
      let application = new Set([]);
      if (keys && keys.length > 0) {
        for (let i = 0; i < keys.length; i++) {
          const artifacts = keys[i].split(':');
          application.add(artifacts[3]);
        }
      }

      return {
        data: Array.from(application),
        status: 200,
      };
    } catch (error) {
      throw error;
    }
  }

  async getArtifactsGroup(saveKey: string): Promise<any> {
    console.log(saveKey, '<<<<<<Catelogue>>>>>>>');

    try {
      let arrKey = JSON.parse(saveKey);
      let key = '';
      if (arrKey.length > 0) {
        key = arrKey.join(':');
      }
      console.log(key, '<<<--key-->>>');
      const keys = await this.redisService.getKeys(key);
      const artifactsGroup = new Map<string, Set<string>>();
      if (keys && keys.length > 0) {
        for (let i = 0; i < keys.length; i++) {
          const artifacts = keys[i].split(':');
          const catelogue = artifacts[3];
          let apps = artifactsGroup.get(catelogue);
          if (!apps) {
            apps = new Set<string>();
            artifactsGroup.set(catelogue, apps);
          }
          apps.add(artifacts[4]);
        }
      }
      console.log(artifactsGroup, '<<<--artifactsGroup-->>>');

      const result = Array.from(artifactsGroup.values()).reduce(
        (acc, apps) => acc.concat(Array.from(apps)),
        [],
      );

      console.log(result, '<<<--result-->>>');

      return {
        data: result,
        status: 200,
      };
    } catch (error) {
      throw error;
    }
  }

  async getCatelogue(tenant, appGroup, saveKey): Promise<any> {
    console.log(saveKey, '>>>>>>>===saveKey==<<<<<<<');

    try {
      let arrKey = JSON.parse(saveKey);
      let key = '';
      if (arrKey.length > 0) {
        key = arrKey.join(':');
      }
      const keys = await this.redisService.getKeys(key);
      let catelogue = new Set([]);
      console.log(catelogue, '<catelogue>');
      if (keys && keys.length > 0) {
        for (let i = 0; i < keys.length; i++) {
          const artifacts = keys[i].split(':');
          console.log(artifacts, 'artifacts');
          catelogue.add(artifacts[3]);
        }
      }
      return {
        data: Array.from(catelogue),
        status: 200,
      };
    } catch (error) {
      throw error;
    }
  }

  async createApplication(tenant, appGroup, application): Promise<any> {
    try {
      const res = await this.readReddis(tenant);

      const applications = await JSON.parse(res);
      if (
        applications &&
        applications.hasOwnProperty(tenant) &&
        applications[tenant].hasOwnProperty(appGroup) &&
        typeof applications === 'object'
      ) {
        if (applications[tenant][appGroup].hasOwnProperty(application)) {
          return {
            status: 400,
            message: 'Application Already Exist',
          };
        } else {
          applications[tenant][appGroup] = {
            ...applications[tenant][appGroup],

            [application]: {},
          };
          await this.writeReddis(tenant, applications);
          let res = [];

          let applicationlist = Object.keys(applications[tenant][appGroup]);
          for (let application of applicationlist) {
            res.push(application);
          }

          return {
            status: 200,
            message: 'Application Created',
            data: res,
          };
        }
      } else {
        return {
          status: 400,
          message: 'Application Already Exist',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteDomain(source, domain): Promise<any> {
    try {
      const res = await this.readReddis(source);
      const applications = await JSON.parse(res);
      if (
        applications &&
        applications.hasOwnProperty(source) &&
        applications[source].hasOwnProperty(domain) &&
        typeof applications === 'object'
      ) {
        delete applications[source][domain];
        await this.delete(source + ':' + domain);
        await this.writeReddis(source, applications);

        let domainList = Object.keys(applications[source]);
        return {
          status: 200,
          data: domainList,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteDefaultArtifact(source, domain, fabrics, artifact): Promise<any> {
    try {
      const res = await this.readReddis(source);
      const applications = await JSON.parse(res);
      if (
        applications &&
        applications.hasOwnProperty(source) &&
        applications[source].hasOwnProperty(domain) &&
        applications[source][domain].hasOwnProperty(fabrics) &&
        applications[source][domain][fabrics].hasOwnProperty(artifact) &&
        typeof applications === 'object'
      ) {
        delete applications[source][domain][fabrics][artifact];
        await this.delete(
          source + ':' + domain + ':' + fabrics + ':' + artifact,
        );
        await this.writeReddis(source, applications);
        const artifactList = Object.keys(applications[source][domain][fabrics]);
        return {
          status: 200,
          data: artifactList,
        };
      } else {
        return {
          status: 400,
          data: [],
          message: 'Artifact Not Found',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteDefaultVersion(
    source,
    domain,
    fabrics,
    artifact,
    version,
  ): Promise<any> {
    try {
      const res = await this.readReddis(source);
      const applications = await JSON.parse(res);
      if (
        applications &&
        applications.hasOwnProperty(source) &&
        applications[source].hasOwnProperty(domain) &&
        applications[source][domain].hasOwnProperty(fabrics) &&
        applications[source][domain][fabrics].hasOwnProperty(artifact) &&
        typeof applications === 'object'
      ) {
        applications[source][domain][fabrics][artifact] = {
          ...applications[source][domain][fabrics][artifact],
          version: [
            ...applications[source][domain][fabrics][artifact].version.filter(
              (ver) => ver !== version,
            ),
          ],
        };
        await this.delete(
          source +
            ':' +
            domain +
            ':' +
            fabrics +
            ':' +
            artifact +
            ':' +
            version,
        );
        await this.writeReddis(source, applications);
        const versionList =
          applications[source][domain][fabrics][artifact].version;
        return {
          status: 200,
          data: versionList,
        };
      } else {
        return {
          status: 400,
          data: [],
          message: 'Version Not Found',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteAppGroup(tenant, appGroup): Promise<any> {
    try {
      const res = await this.readReddis(tenant);
      const applications = await JSON.parse(res);
      if (
        applications &&
        applications.hasOwnProperty(tenant) &&
        applications[tenant].hasOwnProperty(appGroup) &&
        typeof applications === 'object'
      ) {
        delete applications[tenant][appGroup];
        await this.delete(tenant + ':' + appGroup);
        await this.writeReddis(tenant, applications);
        let appGroupList = Object.keys(applications[tenant]);
        return {
          status: 200,
          data: appGroupList,
          message: 'AppGroup Deleted Successfully',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async customCodeExcute(code): Promise<any> {
    try {
      const body = {
        language: 'javascript',
        version: '18.15.0',
        files: [
          {
            content: code,
          },
        ],
      };
      const data = await fetch('http://192.168.2.165:2000/api/v2/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
      }).then((res) => {
        return res.json();
      });

      let result = data;
      console.log(result);
      return {
        status: 200,
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteApplication(tenant, appGroup, application): Promise<any> {
    try {
      const res = await this.readReddis(tenant);
      const applications = await JSON.parse(res);

      // if (applications) {
      //   await this.delete(tenant + ':' + appGroup + ':' + application);
      //   const applicationList = await this.getApplication(tenant, appGroup);
      //   console.log(applicationList, 'req');
      //   return {
      //     status: 200,
      //     data: applicationList.data,
      //     message: 'Application Deleted Successfully',
      //   };
      // }
    } catch (error) {
      return {
        status: 400,
        data: application,
        message: 'Application Not Found',
      };
    }
  }

  async deleteFlowArtifact(
    tenant,
    appGroup,
    application,
    fabrics,
    artifact,
    saveKey,
  ): Promise<any> {
    try {
      let arrKey = JSON.parse(saveKey);
      let key = '';
      if (arrKey.length > 0) {
        key = arrKey.join(':');
      }
      await this.delete(key);
      arrKey.pop();
      const artifactList = await this.pfPfdService.getArtifactWithVersion(
        '',
        ' ',
        ' ',
        ' ',
        JSON.stringify(arrKey),
      );
      console.log(artifactList, 'artifactList');
      if (artifactList && artifactList.data) {
        return {
          status: 200,
          data: artifactList.data,
          message: 'Artifact Deleted Successfully',
        };
      } else {
        return {
          status: 200,
          data: [],
          message: 'Artifact Deleted Successfully',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async renameArtifacts(oldKey, newKey) {
    try {
      let arrOlKey = JSON.parse(oldKey);
      let arrNewKey = JSON.parse(newKey);
      if (
        arrOlKey &&
        arrNewKey &&
        arrOlKey.length &&
        arrNewKey.length &&
        arrOlKey.length === arrNewKey.length
      ) {
        let olKey = arrOlKey.join(':');
        let neKey = arrNewKey.join(':');
        const allKeys = await this.redisService.getKeys(olKey);
        if (allKeys.length > 0) {
          allKeys.forEach(async (key) => {
            const response = await this.redisService.renameKey(
              key,
              `${neKey}${key.replace(olKey, '')}`,
            );
            return response;
          }),
            arrOlKey.pop();
          return await this.pfPfdService.getArtifactWithVersion(
            '',
            '',
            '',
            '',
            JSON.stringify(arrOlKey),
          );
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteFlowVersion(
    tenant,
    appGroup,
    application,
    fabrics,
    artifact,
    version,
  ) {
    try {
      // const res = await this.readReddis(tenant);
      // const applications = await JSON.parse(res);
      // await this.delete(
      //   tenant +
      //     ':' +
      //     appGroup +
      //     ':' +
      //     application +
      //     ':' +
      //     fabrics +
      //     ':' +
      //     artifact +
      //     ':' +
      //     version,
      // );
      // let versionList = await this.pfPfdService.getVersion(
      //   tenant,
      //   appGroup,
      //   fabrics,
      //   application,
      //   artifact,
      // );
      // if (versionList && versionList.data) {
      //   return {
      //     status: 200,
      //     data: versionList.data,
      //     message: 'Version Deleted Successfully',
      //   };
      // } else
      //   return {
      //     status: 200,
      //     data: [],
      //     message: 'Version Not Found',
      //   };
    } catch (error) {
      throw error;
    }
  }

  async delete(key): Promise<any> {
    try {
      let allKeys = await this.redisService.getKeys(key);

      for (let i = 0; i < allKeys.length; i++) {
        console.log('Deleting Key : ' + allKeys[i]);
        await this.redisService.deleteKey(allKeys[i]);
      }
    } catch (error) {
      throw error;
    }
  }

  async getDefaultVersion(source, domain, fabrics, artifact): Promise<any> {
    try {
      const res = await this.readReddis(source);
      const applications = await JSON.parse(res);
      const version = applications[source][domain][fabrics][artifact].version;
      const latestVersion = version[version.length - 1];
      const versionData = await this.pfdService.getJson(
        latestVersion,
        artifact,
        source,
        domain,
        fabrics,
      );
      return {
        status: 200,
        data: versionData?.data,
      };
    } catch (error) {
      return {
        status: 400,
        data: {},
      };
    }
  }

  async readReddis(source): Promise<any> {
    return await this.redisService.getJsonData(source);
  }

  async writeReddis(key, json): Promise<any> {
    await this.redisService.setJsonData(key, JSON.stringify(json));
  }

  async getTreeFabrics(tenant): Promise<any> {
    try {
      const res = await this.readReddis(tenant);
      const applications = await JSON.parse(res);
      let treeList: any;
      function traverse(applications, i: number) {
        let treeLists = i == 2 ? [] : {};
        if (i < 2) {
          if (Object.keys(applications).length > 0) {
            Object.keys(applications).map((tenant) => {
              treeLists[tenant] = traverse(applications[tenant], i + 1);
            });
          } else {
            treeLists = {};
          }
        } else {
          if (Object.keys(applications).length > 0) {
            treeLists = [...Object.keys(applications)];
          } else {
            treeLists = [];
          }
        }

        return treeLists;
      }

      treeList = traverse(applications, 0);
      return {
        status: 200,
        data: treeList,
        message: 'Success',
      };
    } catch (error) {
      throw error;
    }
  }

  async getPF(input) {
    try {
      var key = input.key;
      var nName = input.nodeName;
      var ncode = input.savedCode;
      const json = await this.redisService.getJsonData(key + 'processFlow');
      var pfjson: any = JSON.parse(json);
      var result = await this.getRedisPH(key, pfjson, nName, ncode);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getRedisPH(json, key, nName, ncode) {
    var arr = [];
    var nodeid;

    for (var k = 0; k < key.length; k++) {
      // Start Node

      if (key[k].nodeName == 'Start') {
        var obj = {};
        obj['nodeid'] = key[k].nodeId;
        obj['nodename'] = key[k].nodeName;
        obj['nodetype'] = key[k].nodeType;
        arr.push(obj);
        nodeid = key[k].routeArray[0].nodeId;
      }

      if (
        nodeid == key[k].nodeId &&
        key[k].nodeType == 'humantasknode' &&
        (key[k].nodeName != 'Start' || key[k].nodeName != 'End')
      ) {
        if (nName == key[k].nodeName) {
          var response = await this.getJson(json, arr, nName);
          return response;
        } else {
          var obj = {};
          obj['nodeid'] = key[k].nodeId;
          obj['nodename'] = key[k].nodeName;
          obj['nodetype'] = key[k].nodeType;
          arr.push(obj);
          //Get manualinput by client rwquest from redis

          nodeid = key[k].routeArray[0].nodeId;
          //To set these params to next node request
        }
      }

      // Decision Node

      if (
        nodeid == key[k].nodeId &&
        key[k].nodeType == 'decisionnode' &&
        (key[k].nodeName != 'Start' || key[k].nodeName != 'End')
      ) {
        if (nName == key[k].nodeName) {
          var response = await this.getJson(json, arr, nName);
          return response;
        } else {
          var obj = {};
          obj['nodeid'] = key[k].nodeId;
          obj['nodename'] = key[k].nodeName;
          obj['nodetype'] = key[k].nodeType;
          arr.push(obj);

          var wfarr = JSON.parse(
            await this.redisService.getJsonDataWithPath(
              json + 'nodeProperty',
              '.' + key[k].nodeId + '.rule',
            ),
          );
          var gparamreq = {};
          var greq = JSON.parse(
            await this.redisService.getJsonDataWithPath(
              json + 'nodeProperty',
              '.' + key[k].nodeId + '.rule..inputs',
            ),
          );
          for (var g = 0; g < greq.length; g++) {
            var decreq = JSON.parse(
              await this.redisService.getJsonDataWithPath(
                json + 'nodeProperty',
                '.' +
                  key[k].nodeId +
                  '.data.pro.request' +
                  '..' +
                  greq[g].field,
              ),
            );
            gparamreq[greq[g].field] = decreq;
          }

          /*Retrieves the rule, form the input data to check
            & sends to the rule engine to evaluate
        */

          var goruleres = await this.goRule(wfarr, gparamreq);
          var wfres = goruleres.result.output;
          for (var w = 0; w < key[k].routeArray.length; w++) {
            // check the rule engine result with process flow result of identification of next node
            if (key[k].routeArray[w].conditionResult == wfres) {
              nodeid = key[k].routeArray[w].nodeId;
              break;
            }
          }
        }
      }

      // Api Node
      if (
        nodeid == key[k].nodeId &&
        key[k].nodeType == 'apinode' &&
        key[k].nodeName != 'Start' &&
        key[k].nodeName != 'End'
      ) {
        if (nName == key[k].nodeName) {
          var response = await this.getJson(json, arr, nName);
          return response;
        } else {
          var obj = {};
          obj['nodeid'] = key[k].nodeId;
          obj['nodename'] = key[k].nodeName;
          obj['nodetype'] = key[k].nodeType;
          arr.push(obj);
          nodeid = key[k].routeArray[0].nodeId;
        }
      }

      // End Node

      if (key[k].nodeName == 'End') {
        var obj = {};
        obj['nodeid'] = key[k].nodeId;
        obj['nodename'] = key[k].nodeName;
        obj['nodetype'] = key[k].nodeType;
        arr.push(obj);
        break;
      }
    }
  }

  async getJson(input, arr, nname) {
    var obj = {};
    for (var s = 0; s < arr.length; s++) {
      if (arr[s].nodename != 'Start' && arr[s].nodename != 'End') {
        const apikey = await this.redisService.getJsonDataWithPath(
          input + 'nodeProperty',
          '.' + arr[s].nodeid,
        );
        const nodekey = JSON.parse(apikey).nodeName;
        const configdata = JSON.parse(apikey).data;
        obj[nodekey] = configdata;
      }
    }
    return JSON.stringify(obj);
  }
  async goRule(content: any, data: any) {
    const engine = new ZenEngine();
    const decision = engine.createDecision(content);
    const result = await decision.evaluate(data);
    engine.dispose();
    return result;
  }

  async getNodeList(
    project,
    verion,
    artifact,
    tKey,
    client,
    fabrics,
    saveKey,
  ): Promise<any> {
    try {
      let res;
      const nodes: Promise<any> = new Promise((resolve, reject) => {
        let arrKey = JSON.parse(saveKey);
        let key = '';
        if (arrKey.length > 0) {
          key = arrKey.join(':') + ':' + 'nodes';
        }
        try {
          const node = this.readReddis(key);
          resolve(node);
        } catch (error) {
          reject(error);
        }
      });

      const result = await Promise.all([nodes])
        .then((values) => {
          console.log('🚀 ~ AppService ~ values:', values);
          return values;
        })
        .catch((error) => {
          throw new BadRequestException(error);
        });

      let resultNodes = JSON.parse(result[0]) || [];
      if (fabrics == 'PF' || fabrics == 'DF') {
        res =
          resultNodes.length > 0 &&
          resultNodes.map((item: any) => {
            console.log(item, 'item');
            return {
              nodeId: item.id,
              nodeName: item.data.label,
              nodeType: item.type,
              data: item,
            };
          });
      }
      if (fabrics == 'UF') {
        res =
          resultNodes &&
          resultNodes
            .filter((node) => node.type == 'group')
            .map((item: any) => {
              return {
                nodeId: item.id,
                nodeName: item.data.label,
                nodeType: item.type,
                control: resultNodes
                  .filter((node) => node?.parentNode == item.id)
                  .map((item: any) => {
                    return {
                      nodeId: item.id,
                      nodeName: item.data.label,
                      nodeType: item.type,
                      data: item,
                    };
                  }),
              };
            });

        res = [
          ...res,
          {
            nodeId: 'canvas',
            nodeName: 'canvas',
            nodeType: 'group',
            control: resultNodes
              .filter(
                (node) =>
                  (!node.parentNode || !node.hasOwnProperty('parentNode')) &&
                  node.type !== 'group',
              )
              .map((item: any) => {
                return {
                  nodeId: item.id,
                  nodeName: item.data.label,
                  nodeType: item.type,
                  data: item,
                };
              }),
          },
        ];
      }

      return {
        data: res,
        status: 200,
      };
    } catch (error) {
      throw error;
    }
  }

  async createArtifactInfo(client, type, saveKey: Array<[string]>) {
    let redisKey = saveKey.join(':');
    this.commonVptServices.manageArtifactInfo(client, type, redisKey);
  }

  async changeArtifactLock(
    saveKey: string,
    data: changeArtifactLockData,
  ): Promise<any> {
    try {
      let arrKey = JSON.parse(saveKey);
      let key = arrKey.join(':');
      let res: any;
      console.log(data, 'data');
      if (data.hasOwnProperty('value'))
        res = await this.commonVptServices.setArtifactLockin(
          key + ':artifactInfo',
          data?.value,
        );

      console.log(res, 'res');
      if (res == 'success') {
        return {
          status: 200,
        };
      } else {
        throw new BadRequestException('fail');
      }
    } catch (error) {
      throw error;
    }
  }

  async getRecentArtifactDetailList(
    loginId: string,
    artifactType: artifactType,
    client?: string,
    fabric?: fabric | fabric[],
    catalog?: string | string[],
    artifactGrp?: string | string[],
  ) {
    try {
      if (loginId && artifactType) {
        const fabrics =
          fabric && Array.isArray(fabric)
            ? fabric
            : fabric && typeof fabric === 'string'
              ? [fabric]
              : ['pf', 'uf', 'sf', 'df'];

        const overAllCatalogArray = await this.getAllCatalogs();
        const overAllArtifactGrpArray = await this.getArtifactGrp();

        const catalogs =
          catalog && Array.isArray(catalog)
            ? catalog
            : catalog && typeof catalog === 'string'
              ? [catalog]
              : overAllCatalogArray; // Default catalog if none provided

        const artifactGrps = artifactGrp
          ? typeof artifactGrp === 'string'
            ? [artifactGrp]
            : artifactGrp
          : overAllArtifactGrpArray;

        const recentArtifacts = [];
        const keys = [];

        // Fetch keys for all combinations of fabrics and catalogs
        for (const fab of fabrics) {
          for (const cat of catalogs) {
            for (const artGrp of artifactGrps) {
              const keyPrefix = `TCL:${artifactType.toUpperCase()}:${fab.toUpperCase()}:${cat}:${artGrp}`;
              const data: string[] = await this.redisService.getKeys(keyPrefix);
              if (data && Array.isArray(data)) {
                data.forEach((key) => {
                  key.endsWith('artifactInfo') && keys.push({ key, fab });
                });
              }
            }
          }
        }

        // Retrieve artifact details
        for (const artifactKeyDetail of keys) {
          const artifactDetail = await this.redisService.getJsonData(
            artifactKeyDetail.key,
          );
          if (artifactDetail) {
            const versionObj = JSON.parse(artifactDetail);
            const artifactName = artifactKeyDetail.key.split(':')[5];
            const version = artifactKeyDetail.key.split(':')[6];
            const catalogDetail = artifactKeyDetail.key.split(':')[3];
            const artifactGrpDetail = artifactKeyDetail.key.split(':')[4];

            const recentlyWorking =
              versionObj.updatedOn || versionObj.createdOn;

            if (
              versionObj.updatedBy === loginId ||
              versionObj.createdBy === loginId
            ) {
              recentArtifacts.push({
                artifactName,
                version,
                recentlyWorking,
                fabric: artifactKeyDetail.fab,
                catalog: catalogDetail,
                artifactGrp: artifactGrpDetail,
                isLocked: versionObj.isLocked,
              });
            }
          }
        }

        return recentArtifacts;
      } else {
        throw new BadRequestException('Invalid input parameters');
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllCatalogs(artifactType?: artifactType | artifactType[]) {
    try {
      const accessKeyArray = artifactType
        ? typeof artifactType === 'string'
          ? [artifactType]
          : artifactType
        : ['crk', 'frk'];

      // Use map to create an array of promises
      const promises = accessKeyArray.map(async (accessKey) => {
        // Fetch keys for each accessKey
        const response = await this.redisService.getKeys(
          `TCL:${accessKey.toUpperCase()}`,
        );
        return Array.from(
          new Set(response.map((key: string) => key.split(':')[3])),
        );
      });

      // Wait for all promises to resolve
      const results = await Promise.all(promises);

      // Flatten the array of arrays into a single array
      const val = Array.from(new Set(results.flat()));

      return val;
    } catch (error) {
      throw error;
    }
  }

  async getArtifactGrp(
    artifactType?: artifactType | artifactType[],
    fabric?: fabric | fabric[],
    catalog?: string | string[],
  ) {
    try {
      const accessKeyArray = artifactType
        ? typeof artifactType === 'string'
          ? [artifactType]
          : artifactType
        : ['crk', 'frk'];

      const contextKeyArray = fabric
        ? typeof fabric === 'string'
          ? [fabric]
          : fabric
        : ['df', 'uf', 'pf', 'sf'];

      const catalogArray = catalog
        ? typeof catalog === 'string'
          ? [catalog]
          : catalog
        : null;

      const promises = accessKeyArray.flatMap((accessKey) =>
        contextKeyArray.flatMap((fab) =>
          catalogArray
            ? catalogArray.map((catalogKey) =>
                this.redisService.getKeys(
                  `TCL:${accessKey.toUpperCase()}:${fab.toUpperCase()}:${catalogKey}`,
                ),
              )
            : [
                this.redisService.getKeys(
                  `TCL:${accessKey.toUpperCase()}:${fab.toUpperCase()}`,
                ),
              ],
        ),
      );

      // Wait for all promises to resolve
      const results = await Promise.all(promises);

      // Flatten the array of results (if necessary)
      const val = results.flat();

      return Array.from(new Set(val.map((key) => key.split(':')[4])));
    } catch (error) {
      throw error;
    }
  }

  async getAllArtifacts(saveKey: Array<string>, stopAt: string = 'none') {
    try {
      let key = JSON.stringify(saveKey);
      let catalog = await this.getApplication('', '', key).then(
        (res) => res.data,
      );
      const handleVersion = async (verion, saveKey) => {
        let response = [];
        for (let i = 0; i < verion.length; i++) {
          response.push({
            verion: verion[i],
            redisKey: [...saveKey, verion[i]].join(':'),
          });
        }
        return response;
      };

      const handleArtifact = async (artifact, saveKey) => {
        let response = [];
        for (let i = 0; i < artifact.length; i++) {
          let verion = await this.pfPfdService
            .getVersion('', '', '', '', artifact[i], JSON.stringify(saveKey))
            .then((res) => res.data);
          let versionList;
          if (stopAt == 'version') {
            versionList = verion;
          } else
            versionList = await handleVersion(verion, [
              ...saveKey,
              artifact[i],
            ]);
          response.push({
            artifact: artifact[i],
            versionList: versionList,
          });
        }

        return response;
      };

      const handleArtifactGroup = async (artifactGroup, saveKey) => {
        let response = [];
        for (let i = 0; i < artifactGroup.length; i++) {
          let artifact = await this.pfPfdService
            .getArtifact(
              '',
              '',
              '',
              '',
              JSON.stringify([...saveKey, artifactGroup[i]]),
            )
            .then((res) => res.data);
          let artifactList;
          if (stopAt == 'artifact') {
            artifactList = artifact;
          } else
            artifactList = await handleArtifact(artifact, [
              ...saveKey,
              artifactGroup[i],
            ]);
          response.push({
            artifactGroup: artifactGroup[i],
            artifactList: artifactList,
          });
        }

        return response;
      };

      const handleCatalog = async (catalog, saveKey) => {
        let response = [];

        for (let i = 0; i < catalog.length; i++) {
          let artifactGrp = await this.getArtifactsGroup(
            JSON.stringify([...saveKey, catalog[i]]),
          ).then((res) => res.data);
          let artifactGrps;
          if (stopAt == 'artifactGroup') {
            artifactGrps = artifactGrp;
          } else {
            artifactGrps = await handleArtifactGroup(artifactGrp, [
              ...saveKey,
              catalog[i],
            ]);
          }
          response.push({
            catalog: catalog[i],
            artifactGroupList: artifactGrps,
          });
        }

        return response;
      };

      let response = [];

      response = await handleCatalog(catalog, saveKey);
      return {
        status: 200,
        data: response,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllCatalogWithArtifactGroup(fabric: string) {
    let Tkeys = ['FRK', 'CRK', 'TFRK'];
    let data = {};
    for (let i = 0; i < Tkeys.length; i++) {
      data = {
        ...data,
        [Tkeys[i]]: await this.getAllArtifacts(
          ['TCL', Tkeys[i], fabric],
          'artifactGroup',
        ).then((res) => res.data),
      };
    }

    return {
      status: 200,
      data: data,
    };
  }
}
