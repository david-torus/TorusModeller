import { BadRequestException, Injectable } from '@nestjs/common';

import { RedisService } from 'src/redisService';

@Injectable()
export class PfPfdService {
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
        arrKey.forEach((element) => {
          if (key == '') {
            key = element;
          } else key = key + ':' + element;
        });
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

  async getApplicationList(tKey, client, fabrics): Promise<any> {
    try {
      const res = await this.readReddis(tKey);
      const applications = await JSON.parse(res);
      console.log(applications, 'appllllll');
      const response = [];
      if (
        applications &&
        applications.hasOwnProperty(tKey) &&
        applications[tKey].hasOwnProperty(client) &&
        applications[tKey][client].hasOwnProperty(fabrics) &&
        applications[tKey][client][fabrics] &&
        typeof applications === 'object' &&
        Object.keys(applications[tKey]?.[client]?.[fabrics]).length
      ) {
        const project = Object.keys(applications[tKey][client][fabrics]);

        if (project) {
          for (let application of project) {
            const artifactName = Object.keys(
              applications[tKey][client][fabrics][application],
            );
            const artifactsDetails = [];
            for (const artifact of artifactName) {
              const version = Object.keys(
                applications[tKey][client][fabrics][application][artifact],
              );

              artifactsDetails.push({
                artifact: artifact,
                version: version,
              });
            }
            response.push({
              application: application,
              artifact: artifactsDetails,
            });
          }
        }
      }
      console.table(response);
      return {
        data: response,
        status: 200,
      };
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
          data: response,
          status: 400,
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
    saveKey,
  ): Promise<any> {
    try {
      let arrKey = JSON.parse(saveKey);
      let keys = '';
      if (arrKey.length > 0) {
        keys = arrKey.join(':');
      }
      let result = {};

      let sd = null;
      let processflowapi = [];
      let processFlowSummary = [];

      const nodes = JSON.parse(JSON.stringify(req.flow.nodes));
      const edges = JSON.parse(JSON.stringify(req.flow.nodeEdges));

      if (nodes.length > 0 && edges.length > 0) {
        let condiforStart = false;
        let condiforEnd = false;
        nodes.map((node) => {
          if (node.type === 'startnode') {
            condiforStart = true;
          }

          if (node.type === 'endnode') {
            condiforEnd = true;
          }
        });

        if (condiforStart && condiforEnd) {
          processFlowSummary = this.findAllRoutesWithFormatAndDecision(
            nodes,
            edges,
          );
          sd = this.newCreatePrcessFlow(edges, nodes);
          processflowapi = this.sortProcessFlow(sd);
        }
      }
      result = {
        nodes: req.flow.nodes,
        nodeEdges: req.flow.nodeEdges,
        processFlow: [...processflowapi],
        processFlowSummary: [...processFlowSummary],
        nodeProperty: nodes.reduce((acc, node) => {
          if (Object.keys(node.data.nodeProperty).length > 0) {
            acc[node.id] = node.data.nodeProperty;
          }
          return acc;
        }, {}),
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
    const res = await this.redisService.getJsonData('PF:defaultJson');
    if (res) {
      const parsedData = JSON.parse(res);
      const keys = Object.keys(parsedData);
      const lastKey = keys[keys.length - 1];
      return parsedData[lastKey]?.nodeConfig;
    } else {
      return null;
    }
  }
  updateArrayWithLabel(array, edge) {
    return array.map((node, index) => {
      let i = index;
      if (index > 0) {
        index = index - 1;
      }
      const labelInfo = edge.find(
        (edg) => edg.source === node.sourceNode && edg.target === node.nodeId,
      );
      if (labelInfo && array[index].nodeId == labelInfo.source) {
        array[index].label = labelInfo.label;
      }
      return node;
    });
  }
  findAllRoutesWithFormatAndDecision(node, edges) {
    let nodes = structuredClone(node);
    let edge = structuredClone(edges);
    let adjacencyList = {};
    const updateLable = (routeArray) => {
      let childRoute = [...routeArray];
      routeArray.forEach((parent) => {
        if (parent?.source) {
          childRoute.map((child) => {
            if (parent.source == child.NodeId) {
              if (parent?.conditionResult) {
                child.conditionResult = parent.conditionResult;
                delete parent.conditionResult;
              }
            }
          });
        }
      });
      childRoute.forEach((e) => {
        delete e.source;
      });
      return childRoute;
    };
    function findAllRoutes(
      startNode,
      endNode,
      visited = new Set(),
      currentRoute = [],
      allRoutes = [],
    ) {
      visited.add(startNode);
      let getNode = nodes.find((node) => node.id == startNode);
      let nodeObj = {
        NodeId: startNode,
        NodeName: getNode.data.label,
        NodeType: getNode.type,
      };
      currentRoute.push(nodeObj);
      if (startNode === endNode) {
        let flowName = `flow${allRoutes.length + 1}`;
        allRoutes.push({ [flowName]: [...currentRoute] });
      } else if (adjacencyList[startNode]) {
        for (const neighbor of adjacencyList[startNode]) {
          if (!visited.has(neighbor)) {
            findAllRoutes(neighbor, endNode, visited, currentRoute, allRoutes);
          }
        }
      }
      visited.delete(startNode);
      currentRoute.pop();
    }

    const findAllRoutesWithFormatAndDecisionResults = (nodes, edges) => {
      const graph = {};
      edges.forEach((edge) => {
        if (!graph[edge.source]) {
          graph[edge.source] = [];
        }
        graph[edge.source].push({
          target: edge.target,
          sourcenodeid: edge.source,
          label: edge.label,
        });
      });
      const allRoutes = [];
      const dfs = (node, currentRoute) => {
        const neighbors = graph[node] || [];
        neighbors.forEach((neighborInfo) => {
          const newRoute = [
            ...currentRoute,
            {
              nodeId: neighborInfo.target,
              sourcenodeid: neighborInfo.sourcenodeid,
              label: neighborInfo.label,
            },
          ];
          dfs(neighborInfo.target, newRoute);
        });
        if (neighbors.length === 0) {
          allRoutes.push(currentRoute);
        }
      };
      nodes.forEach((node) => {
        if (node.type === 'startnode') {
          const startNodeId = node.id;
          dfs(startNodeId, [{ nodeId: startNodeId, label: null }]);
        }
      });
      const formattedRoutes = allRoutes.map((route, index) => {
        let newArray = [];
        let currentConditionResult = null;
        let routeArray = route.map((routeItem) => {
          const sourceNodeId = routeItem.nodeId;
          const sourceNode = nodes.find((node) => node.id === sourceNodeId);
          if (sourceNode) {
            currentConditionResult = routeItem.label;
          }
          let routes = {
            nodeType:
              sourceNode.property.nodeType == 'defaultNode'
                ? sourceNode.type
                : sourceNode.property.nodeType,
            NodeId: sourceNode.id,
            Nodename: sourceNode.data.label,
            source: routeItem.sourcenodeid,
          };
          if (currentConditionResult) {
            routes['conditionResult'] = currentConditionResult;
          }
          return routes;
        });
        let routeOptionArray = updateLable(routeArray);
        let flowName = `flow${index + 1}`;
        return { [flowName]: routeOptionArray };
      });
      return formattedRoutes;
    };

    const summeryFlow = () => {
      const adjacencyList = {};
      edge.forEach((edge) => {
        if (!adjacencyList[edge.source]) {
          adjacencyList[edge.source] = [];
        }
        adjacencyList[edge.source].push(edge.target);
      });
      const routesWithFormatAndDecisionResults =
        findAllRoutesWithFormatAndDecisionResults(nodes, edge);
      return routesWithFormatAndDecisionResults;
    };
    let summeryRoutes = summeryFlow();
    return summeryRoutes;
  }
  newCreatePrcessFlow(edges, node) {
    let nodes = structuredClone(node);
    let edge = structuredClone(edges);

    const initElement = (item, element) => {
      item.role = element.data.role;

      item.nodeType =
        element.property.nodeType == 'defaultNode'
          ? element.type
          : element.property.nodeType;

      item.nodeId = element.id;
      if (typeof element?.T_parentId === 'object') {
        item.T_parentId = [...element?.T_parentId];
      } else {
        item.T_parentId = element?.T_parentId;
      }

      item.nodeName = element.property.name;

      item.nodeDesc = element.property.description;

      return item;
    };

    const addingElements = (item, array) => {
      if (array.filter((x) => x.id === item.id).length === 0) {
        let element = nodes.find((node) => node.id == item.source);

        array.push(initElement(item, element));
      }
    };

    const processFlow = () => {
      const resultObj = {};

      let array = [];

      let removeFields = [
        'source',

        'label',

        'sourceHandle',

        'selected',

        'targetHandle',

        'target',

        'type',

        'markerEnd',

        'id',
      ];

      edge.map((edges) => {
        addingElements(edges, array);
      });

      array.forEach((obj) => {
        let routeArray = [];

        const { source, target } = obj;

        let initRouteObj = {};

        if (!resultObj[source]) {
          resultObj[source] = obj;
        }

        if (obj.label) {
          initRouteObj['conditionResult'] = obj.label;
        }

        initRouteObj['nodeName'] = nodes.find(
          (node) => node.id == target,
        ).data.label;

        initRouteObj['nodeId'] = target;

        routeArray.push(initRouteObj);

        if (resultObj[source]?.routeArray?.length > 0) {
          let check = resultObj[source].routeArray.findIndex(
            (index) => obj.nodeId == source,
          );

          if (check >= 0) {
            resultObj[source].routeArray.push(initRouteObj);
          }
        } else {
          resultObj[source].routeArray = routeArray;
        }

        Object.keys(resultObj[source]).map((key) => {
          let status = removeFields.includes(key);

          if (status) {
            delete resultObj[source][key];
          }
        });
      });

      const updatedArray = Object.values(resultObj);

      let endNodeElement = nodes.find((node) => node.type == 'endnode');

      let item = initElement({}, endNodeElement);

      updatedArray.push(item);

      return updatedArray;
    };

    let processFlowResult = processFlow();

    return processFlowResult;
  }

  async readReddis(tKey): Promise<any> {
    return await this.redisService.getJsonData(tKey);
  }

  async writeReddis(key, json): Promise<any> {
    await this.redisService.setJsonData(key, JSON.stringify(json));
  }

  sortProcessFlow(processFlow) {
    let startNode = processFlow.find((node) => node.nodeType == 'startnode');
    let uniId = [];
    processFlow.map((ele) => {
      if (!uniId.includes(ele.nodeId)) {
        uniId.push(ele.nodeId);
      }
    });
    let alterData = [];
    processFlow.map((ele) => {
      if (ele.T_parentId.length == 0) {
        alterData.push(ele);
      }
      if (ele.T_parentId.length > 0) {
        if (
          ele.T_parentId.every((v) => {
            uniId.includes(v);
          })
        ) {
          alterData.push(ele);
        } else {
          alterData.push({
            ...ele,
            T_parentId: ele.T_parentId.filter((v) => uniId.includes(v)),
          });
        }
      }
    });
    let proFlow = [];
    proFlow.push(startNode);

    let includedId = [startNode.nodeId];

    console.log(proFlow, '-------->');
    for (let j = 0; includedId.length + 1 != alterData.length; ) {
      if (proFlow[j]?.routeArray.length > 0) {
        let route = proFlow[j]?.routeArray;

        for (let rou of route) {
          let data = alterData.find((node) => node.nodeId == rou.nodeId);
          if (
            data.nodeType !== 'endnode' &&
            !includedId.includes(data.nodeId) &&
            data.T_parentId.every((v) => includedId.includes(v))
          ) {
            includedId.push(data.nodeId);
            proFlow.push(data);
            // }
          }
        }
      }

      if (
        processFlow.length == j + 2 &&
        includedId.length + 1 !== processFlow.length
      ) {
        j = 0;
      } else {
        j = j + 1;
      }
    }

    proFlow.push(processFlow.find((node) => node.nodeType == 'endnode'));

    return proFlow;
  }
}
