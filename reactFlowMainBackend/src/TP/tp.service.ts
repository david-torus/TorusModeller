import { HttpStatus, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redisService';
import {
  BadRequestException,
  CustomException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from './customException';
import { JwtService } from '@nestjs/jwt';
import { auth_secret, group, tenantProfileTemplate } from './constants';
import { comparePasswords, hashPassword } from './auth/hashing.utility';

@Injectable()
export class TpService {
  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) {}

  async throwCustomException(error: any) {
    if (error instanceof CustomException) {
      throw error; // Re-throw the specific custom exception
    }
    throw new CustomException(
      'An unexpected error occurred',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async getAllClientTenantList(type?: string) {
    try {
      switch (type) {
        case 'c':
          const keysOfClient = await this.redisService.getKeys('C');
          //C for fetching clients
          if (Array.isArray(keysOfClient) && keysOfClient.length) {
            let clients = new Set([]);
            for (let i = 0; i < keysOfClient.length; i++) {
              const client = keysOfClient[i].split(':');
              clients.add(client[1]);
            }
            return Array.from(clients);
          } else {
            throw new NotFoundException('No clients exists');
          }
        default:
          const keysOfTenant = await this.redisService.getKeys('T');
          //T for fetching tenants
          if (Array.isArray(keysOfTenant) && keysOfTenant.length) {
            let tenants = new Set([]);
            for (let i = 0; i < keysOfTenant.length; i++) {
              const tenant = keysOfTenant[i].split(':');
              tenants.add(tenant[1]);
            }
            return Array.from(tenants);
          } else {
            throw new NotFoundException('No tenant exists');
          }
      }
    } catch (error) {
      await this.throwCustomException(error);
    }
  }

  async signIntoTorus(
    client: string,
    role: string,
    username: string,
    password: string,
    type: string = 't',
  ) {
    try {
      if (client && role && username && password) {
        const userResponse = await this.redisService.getJsonData(
          `${type.toUpperCase()}:${client}:users`,
        );
        const envAuthResponse = await this.redisService.getJsonData(
          `${type.toUpperCase()}:${client}:envAuth`,
        );
        if (userResponse && envAuthResponse) {
          const users = JSON.parse(userResponse);
          const env = JSON.parse(envAuthResponse);

          const loggedInUser = users.find((user: any) => {
            if (
              (user.loginId === username || user.email == username) &&
              comparePasswords(password, user.password)
            ) {
              return user;
            } else {
              return null;
            }
          });
          if (loggedInUser) {
            const roleObj = env.roles.find(
              (roleData: any) => roleData.roleName == role,
            );
            if (roleObj && roleObj.users.includes(loggedInUser.loginId)) {
              delete loggedInUser.password;
              const token = await this.jwtService.signAsync(
                { ...loggedInUser, role: role, client: client },
                {
                  secret: auth_secret,
                  expiresIn: '1h',
                },
              );
              return { token: token, authorized: true };
            } else {
              delete loggedInUser.password;
              const token = await this.jwtService.signAsync(
                { ...loggedInUser, client: client },
                {
                  secret: auth_secret,
                  expiresIn: '1h',
                },
              );
              return {
                token: token,
                authorized: true,
                message: 'user lack access of the selected role',
              };
            }
          } else {
            throw new NotFoundException('Please check credentials');
          }
        } else {
          throw new NotFoundException(
            'There is not enough Data to validate in selected Client',
          );
        }
      } else {
        throw new BadRequestException('Check all credentials given correctly');
      }
    } catch (error) {
      await this.throwCustomException(error);
    }
  }

  async registerToTorus(
    client: string,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    mobile: string,
    password: string,
    type: string = 't',
  ) {
    try {
      if (client && username && firstname && lastname && email && password) {
        const responseFromRedis = await this.redisService.getJsonData(
          `${type.toUpperCase()}:${client}:users`,
        );
        if (responseFromRedis) {
          const userList = JSON.parse(responseFromRedis);
          //  check username or email exist already in the userList and if is
          // user name exist throw new Exception and if not register user
          for (let i = 0; i < userList.length; i++) {
            if (userList[i].loginId == username) {
              throw new ForbiddenException('please provide unique username');
            } else if (userList[i].email == email) {
              throw new ForbiddenException(
                'Email is already registered , provide another email or login with your account',
              );
            }
          }
          const newUser = {
            loginId: username,
            firstName: firstname,
            lastName: lastname,
            email,
            mobile,
            password: hashPassword(password),
            '2FAFlag': 'N',
          };
          userList.push(newUser);
          const res = await this.redisService.setJsonData(
            `${type.toUpperCase()}:${client}:users`,
            JSON.stringify(userList),
          );
          if (res) return 'User Registered Successfully';
        } else {
          const newUser = {
            loginId: username,
            firstName: firstname,
            lastName: lastname,
            email,
            mobile,
            password: hashPassword(password),
            '2FAFlag': 'N',
          };
          const res = await this.redisService.setJsonData(
            `${type.toUpperCase()}:${client}:users`,
            JSON.stringify([newUser]),
          );
          if (res) return 'User Registered Successfully';
        }
      } else {
        throw new BadRequestException(
          'Please provide all necessary credentials',
        );
      }
    } catch (error) {
      await this.throwCustomException(error);
    }
  }

  async getUserDetails(token) {
    try {
      if (token) {
        return await this.jwtService.decode(token);
      } else {
        throw new UnauthorizedException('token not provided');
      }
    } catch (error) {
      await this.throwCustomException(error);
    }
  }

  async getTenantProfile(tenant: string) {
    try {
      const responseFromRedis = await this.redisService.getJsonData(
        `${tenant}:profile`,
      );
      const envTemplate = tenantProfileTemplate.ENV;
      envTemplate.code = tenant;
      const updatedTemplate = { ...tenantProfileTemplate, ENV: envTemplate };
      if (responseFromRedis) {
        //send stored Tenant profile data from redis without AppGroups data
        const tenantProfileInfo = JSON.parse(responseFromRedis);
        const { ENV } = tenantProfileInfo;
        delete ENV.APPS;
        return { ...tenantProfileInfo, ENV: ENV };
      } else {
        return { ...updatedTemplate, Code: tenant };
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async postTenantProfile(tenant: string, tenantProfileInfo: any) {
    try {
      const UpdatedEnv = tenantProfileInfo.ENV;
      const responseFromRedis = await this.redisService.getJsonData(
        `${tenant}:profile`,
      );
      if (responseFromRedis) {
        const existingTenantProfile = JSON.parse(responseFromRedis);
        const { ENV } = existingTenantProfile;
        UpdatedEnv.APPS = ENV.APPS;
        return await this.redisService.setJsonData(
          `${tenant}:profile`,
          JSON.stringify({
            ...tenantProfileInfo,
            ENV: UpdatedEnv,
          }),
        );
      } else {
        return await this.redisService.setJsonData(
          `${tenant}:profile`,
          JSON.stringify(tenantProfileInfo),
        );
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAppGroupList(tenant: string) {
    try {
      const responseFromRedis = await this.redisService.getJsonData(
        `${tenant}:profile`,
      );
      if (responseFromRedis) {
        const tenantProfileInfo = JSON.parse(responseFromRedis);
        const AppGroupList = tenantProfileInfo.AG.map((ele) => ele.code);
        return AppGroupList;
      } else {
        throw new Error('Tenant Details not available or tenant not exist');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAppList(tenant: string, appGroup: string) {
    try {
      const responseFromRedis = await this.redisService.getJsonData(
        `${tenant}:profile`,
      );
      if (responseFromRedis && tenant && appGroup) {
        const tenantProfileInfo = JSON.parse(responseFromRedis);
        const existingAgIndex = tenantProfileInfo.AG.findIndex(
          (ele) => ele.code == appGroup,
        );
        if (existingAgIndex != -1) {
          const AppList = tenantProfileInfo['AG'][existingAgIndex]['APPS'].map(
            (ele) => ele.code,
          );
          return AppList;
        } else {
          throw new Error(
            'AppGroup not available in the tenant, please check AppGroup and App details',
          );
        }
      } else {
        throw new Error('Tenant Details not available or tenant not exist');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteAppGroup(appGroup: string, tenant: string) {
    try {
      const responseFromRedis = await this.redisService.getJsonData(
        `${tenant}:profile`,
      );
      if (responseFromRedis) {
        const tenantProfileInfo = JSON.parse(responseFromRedis);
        const existingAppGroupIndex = tenantProfileInfo.AG.findIndex(
          (ele) => ele.code == appGroup,
        );
        if (existingAppGroupIndex != -1) {
          tenantProfileInfo['AG'].splice(existingAppGroupIndex, 1);
          return await this.redisService.setJsonData(
            `${tenant}:profile`,
            JSON.stringify(tenantProfileInfo),
          );
        } else {
          throw new Error('Given AppGroup not exist in tenant profile');
        }
      } else {
        throw new Error('There is not enough details to delete AppGroup');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAppEnvironment(tenantAndEnv: string, app: string) {
    try {
      const envObjTemplate = {
        code: app,
        version: '',
        status: '',
        appPath: '',
        generatedUrl: '',
        accessUrl: '',
      };
      const responseFromRedis = await this.redisService.getJsonData(
        `${tenantAndEnv}:profile`,
      );
      if (responseFromRedis) {
        var tenantProfileInfo = JSON.parse(responseFromRedis);
        const { ENV } = tenantProfileInfo;
        if (ENV.APPS) {
          const index = ENV.APPS.findIndex((item) => item.code == app);
          if (index != -1) {
            const AlterData = ENV.APPS[index];
            return AlterData;
          } else {
            return envObjTemplate;
          }
        } else {
          return envObjTemplate;
        }
      } else {
        throw new Error('There is not enough details to get App Environment');
      }
    } catch (error) {
      // Catch any other errors and throw a custom exception
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async postAppEnvironment(tenant: string, envAppObj: any) {
    try {
      const responseFromRedis = await this.redisService.getJsonData(
        `${tenant}:profile`,
      );
      if (responseFromRedis) {
        var tenantProfileInfo = JSON.parse(responseFromRedis);
        const { ENV } = tenantProfileInfo;
        if (ENV.APPS) {
          const existingAppIndex = ENV.APPS.findIndex(
            (item) => item.code == envAppObj.code,
          );
          if (existingAppIndex != -1) {
            ENV.APPS.splice(existingAppIndex, 1, envAppObj);
          } else {
            ENV.APPS.push(envAppObj);
          }
        } else {
          ENV.APPS = [{ ...envAppObj }];
        }
        return await this.redisService.setJsonData(
          `${tenant}:profile`,
          JSON.stringify({ ...tenantProfileInfo, ENV: ENV }),
        );
      } else {
        throw new Error('There is not enough details to post App Environment');
      }
    } catch (error) {
      // Catch any other errors and throw a custom exception
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async postAppRequirement(
    tenant: string,
    appGroup: string,
    app: string,
    reqObj: any,
    date?: any,
  ): Promise<any> {
    try {
      const responseFromRedis = await this.redisService.getJsonData(
        `${tenant}:${appGroup}:${app}:requirements`,
      );

      if (responseFromRedis) {
        const requirementJson = JSON.parse(responseFromRedis);
        if (date !== undefined) {
          const index = requirementJson.findIndex(
            (item) => item.createddateTime == date,
          );

          return await this.redisService.setJsonData(
            `${tenant}:${appGroup}:${app}:requirements`,
            JSON.stringify(reqObj),
            `[${index}]`,
          );
        } else {
          requirementJson.push(reqObj);
          return await this.redisService.setJsonData(
            `${tenant}:${appGroup}:${app}:requirements`,
            JSON.stringify(requirementJson),
          );
        }
      } else {
        return await this.redisService.setJsonData(
          `${tenant}:${appGroup}:${app}:requirements`,
          JSON.stringify([{ ...reqObj }]),
        );
      }
    } catch (error) {
      // Catch any other errors and throw a custom exception
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAppRequirement(tenant: string, appGroup: string, app: string) {
    try {
      const responseFromRedis = await this.redisService.getJsonData(
        `${tenant}:${appGroup}:${app}:requirements`,
      );
      const appReqTemplate = [];

      if (responseFromRedis) {
        const requirementJson: any[] = JSON.parse(responseFromRedis);
        const res = requirementJson.filter((item) => item.recordType !== 'D');
        return res;
      } else {
        return appReqTemplate;
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAssemblerVersion(key: string) {
    try {
      if (key) {
        const allkeys = await this.redisService.getKeys(key);
        if (Array.isArray(allkeys) && allkeys.length) {
          const data: string[] = allkeys.map((item: string) => {
            return item.split(key)[1].split(':')[1];
          });
          return [...new Set(data)];
        } else {
          return allkeys;
        }
      } else {
        throw new Error('Please provide valid key to fetch version');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAssemblerData(key: string) {
    try {
      if (key) {
        const data = await this.redisService.getJsonData(key);
        if (data) {
          return JSON.parse(data);
        } else {
          throw new Error('There is no data available for the given key');
        }
      } else {
        throw new Error('Please provide valid key to fetch data');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async saveAssemblerData(key: string, data: any) {
    try {
      if (key && data) {
        const versions = await this.getAssemblerVersion(key);
        if (Array.isArray(versions) && versions.length) {
          //get versions array and check which version is maximum version and add one with that
          const newVersion =
            Math.max(...versions.map((item) => parseInt(item.slice(1)))) + 1;
          return await this.redisService.setJsonData(
            `${key}:v${newVersion}`,
            JSON.stringify(data),
          );
        } else {
          return await this.redisService.setJsonData(
            `${key}:v1`,
            JSON.stringify(data),
          );
        }
      } else {
        throw new Error('Either key or data not provided');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateAssemblerData(key: string, data: any) {
    try {
      if (key && data) {
        return await this.redisService.setJsonData(key, JSON.stringify(data));
      } else {
        throw new Error('Either key or data not provided correctly');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getORPGroupData(tenant: string, group: group) {
    try {
      const responseFromRedis = await this.redisService.getJsonData(
        `${tenant}:profile`,
      );
      if (responseFromRedis) {
        const tenantProfileInfo = JSON.parse(responseFromRedis);

        switch (group) {
          case 'role':
            return tenantProfileInfo.roleGrp;
          case 'org':
            return tenantProfileInfo.orgGrp;
          case 'ps':
            return tenantProfileInfo.psGrp;
          case 'all':
            return {
              roleGrp: tenantProfileInfo.roleGrp,
              orgGrp: tenantProfileInfo.orgGrp,
              psGrp: tenantProfileInfo.psGrp,
            };
          default:
            throw new Error(
              'Provided group detail is unrecognised , please check correct group detail ',
            );
        }
      } else {
        throw new Error(
          'No Details available for the tenant please setup Tenant group data',
        );
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateTokenWithORP(token: string, ORPData: any) {
    try {
      const payload = await this.jwtService.decode(token, { json: true });
      const updatedPayload = { ...payload, ...ORPData };
      return this.jwtService.signAsync(updatedPayload, {
        secret: 'cnkdnkddkdmkd',
      });
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getSFArtifacts(key: string) {
    try {
      if (key) {
        const allkeys = await this.redisService.getKeys(`${key}:SF`);
        if (Array.isArray(allkeys) && allkeys.length) {
          const data: string[] = allkeys.map((item: string) => {
            return item.split(key)[1].split(':')[2];
          });
          return [...new Set(data)];
        } else {
          return [];
        }
      } else {
        throw new Error('key not provided');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getSFVersion(key: string, artifacts: string) {
    try {
      if (key && artifacts) {
        const allkeys = await this.redisService.getKeys(
          `${key}:SF:${artifacts}`,
        );
        if (Array.isArray(allkeys) && allkeys.length) {
          const data: string[] = allkeys.map((item: string) => {
            return item.split(key)[1].split(':')[3];
          });
          return [...new Set(data)];
        } else {
          return [];
        }
      } else {
        throw new Error('Either key or artifacts not provided');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getSFData(key: string, artifacts: string, version: string) {
    try {
      if (key && artifacts && version) {
        const data = await this.redisService.getJsonData(
          `${key}:SF:${artifacts}:${version}:summary`,
        );
        if (data) {
          return JSON.parse(data);
        } else {
          throw new Error('Data not found');
        }
      } else {
        throw new Error('Either key or artifacts or version not provided');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async postSFData(key: string, artifacts: string, version: string, data: any) {
    try {
      if (key && artifacts && version && data) {
        return await this.redisService.setJsonData(
          `${key}:SF:${artifacts}:${version}:summary`,
          JSON.stringify(data),
        );
      } else {
        throw new Error('Either key or artifacts or version not provided');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async checkUser(token: string) {
    try {
      const payload = await this.jwtService.decode(token, { json: true });
      if (payload) {
        return payload.realm_access.roles.includes('portal-admin')
          ? true
          : false;
      } else {
        throw new Error('Token not valid');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getorggrp() {
    try {
      const responseFromRedis = await this.redisService.getJsonData('t_sf');
      if (responseFromRedis) {
        const sf = JSON.parse(responseFromRedis);
        return sf.orgGrp.map((ele) => ({
          grpName: ele.orgGrpName,
          grpCode: ele.orgGrpCode,
        }));
      } else {
        throw new Error('Data not found');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getorgFromTSF(code: string) {
    try {
      const responseFromRedis = await this.redisService.getJsonData('t_sf');
      if (responseFromRedis && code) {
        const tsf = JSON.parse(responseFromRedis);
        if (tsf.orgGrp && Array.isArray(tsf.orgGrp)) {
          const requiredOrgGrp = tsf.orgGrp.find(
            (ele: any) => ele.orgGrpCode == code,
          );
          if (requiredOrgGrp) {
            return requiredOrgGrp.org.map((ele: any) => ({
              code: ele.orgCode,
              name: ele.orgName,
            }));
          } else {
            throw new Error(
              'There is no OrgGroup available in the provided OrgGrp code',
            );
          }
        } else {
          throw new Error('Data not available');
        }
      } else {
        throw new Error('Check the payload containing OrgGrpcode');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getRGFromTSF(orgGrpcode: string, orgCode: string) {
    try {
      const responseFromRedis = await this.redisService.getJsonData('t_sf');
      if (responseFromRedis) {
        const tsf = JSON.parse(responseFromRedis);
        const requiredOrgGrp = tsf.orgGrp.find(
          (ele) => ele.orgGrpCode == orgGrpcode,
        );
        const requiredOrg = requiredOrgGrp.org.find(
          (ele) => ele.orgCode == orgCode,
        );
        return requiredOrg.roleGrp.map((ele) => ({
          grpName: ele.roleGrpName,
          grpCode: ele.roleGrpCode,
        }));
      } else {
        throw new Error('Data not found');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getRoleFromTSF(
    orgGrpcode: string,
    orgCode: string,
    roleGrpCode: string,
  ) {
    try {
      const responseFromRedis = await this.redisService.getJsonData('t_sf');
      if (responseFromRedis) {
        const tsf = JSON.parse(responseFromRedis);
        const requiredOrgGrp = tsf.orgGrp.find(
          (ele) => ele.orgGrpCode == orgGrpcode,
        );
        const requiredOrg = requiredOrgGrp.org.find(
          (ele) => ele.orgCode == orgCode,
        );
        const requiredRG = requiredOrg.roleGrp.find(
          (ele) => ele.roleGrpCode == roleGrpCode,
        );
        return requiredRG.roles.map((ele) => ({
          code: ele.roleCode,
          name: ele.roleName,
        }));
      } else {
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getPSGFromTSF(
    orgGrpcode: string,
    orgCode: string,
    roleGrpCode: string,
    roleCode: string,
  ) {
    try {
      const responseFromRedis = await this.redisService.getJsonData('t_sf');
      if (responseFromRedis) {
        const tsf = JSON.parse(responseFromRedis);
        const requiredOrgGrp = tsf.orgGrp.find(
          (ele) => ele.orgGrpCode == orgGrpcode,
        );
        const requiredOrg = requiredOrgGrp.org.find(
          (ele) => ele.orgCode == orgCode,
        );
        const requiredRG = requiredOrg.roleGrp.find(
          (ele) => ele.roleGrpCode == roleGrpCode,
        );
        const requirdRole = requiredRG.roles.find(
          (ele) => ele.roleCode == roleCode,
        );
        return requirdRole.psGrp.map((ele) => ({
          grpCode: ele.psGrpCode,
          grpName: ele.psGrpName,
        }));
      } else {
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getPSFromTSF(
    orgGrpcode: string,
    orgCode: string,
    roleGrpCode: string,
    roleCode: string,
    psGrpCode: string,
  ) {
    try {
      const responseFromRedis = await this.redisService.getJsonData('t_sf');
      if (responseFromRedis) {
        const tsf = JSON.parse(responseFromRedis);
        const requiredOrgGrp = tsf.orgGrp.find(
          (ele) => ele.orgGrpCode == orgGrpcode,
        );
        const requiredOrg = requiredOrgGrp.org.find(
          (ele) => ele.orgCode == orgCode,
        );
        const requiredRG = requiredOrg.roleGrp.find(
          (ele) => ele.roleGrpCode == roleGrpCode,
        );
        const requirdRole = requiredRG.roles.find(
          (ele) => ele.roleCode == roleCode,
        );

        const requiredPSG = requirdRole.psGrp.find(
          (ele) => ele.psGrpCode == psGrpCode,
        );
        return requiredPSG.ps.map((ele) => ({
          code: ele.psCode,
          name: ele.psName,
        }));
      } else {
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getTenantAgApp(
    orgGrpcode: string,
    orgCode: string,
    roleGrpCode: string,
    roleCode: string,
    psGrpCode: string,
    psCode: string,
  ) {
    try {
      const responseFromRedis = await this.redisService.getJsonData('t_sf');
      if (responseFromRedis) {
        const tsf = JSON.parse(responseFromRedis);

        const requiredOrgGrp = tsf.orgGrp.find(
          (ele) => ele.orgGrpCode == orgGrpcode,
        );
        const requiredOrg = requiredOrgGrp.org.find(
          (ele) => ele.orgCode == orgCode,
        );
        const requiredRG = requiredOrg.roleGrp.find(
          (ele) => ele.roleGrpCode == roleGrpCode,
        );
        const requirdRole = requiredRG.roles.find(
          (ele) => ele.roleCode == roleCode,
        );

        const requiredPSG = requirdRole.psGrp.find(
          (ele) => ele.psGrpCode == psGrpCode,
        );
        const requiredPS = requiredPSG.ps.find((ele) => ele.psCode == psCode);
        return requiredPS.tenants;
      } else {
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async processPortal(portal: any) {
    try {
      if (portal && typeof portal == 'object' && Array.isArray(portal)) {
        const processedData = portal.map((item: any) => {
          if (item.SIFlag == 'A') {
            return {
              resourceType: item.resourceType,
              SIFlag: item.SIFlag,
              actionAllowed: item.actionAllowed,
            };
          } else if (item.SIFlag == 'E') {
            return {
              resourceType: item.resourceType,
              SIFlag: item.SIFlag,
              actionDenied: item.actionDenied,
            };
          }
        });
        return processedData;
      } else {
        throw new Error('Provided portal data is not valid');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getPortal(token: string) {
    try {
      const payload = await this.jwtService.decode(token, { json: true });
      if (payload) {
        const { orgGrp, roleGrp, psGrp } = payload;

        const responseFromRedis = await this.redisService.getJsonData('t_sf');

        if (responseFromRedis) {
          const tsf = JSON.parse(responseFromRedis);

          const requiredOrgGrp = tsf.orgGrp.find(
            (ele) => ele.orgGrpCode == orgGrp.orgGrpCode,
          );

          const requiredOrg = requiredOrgGrp.org.find(
            (ele) => ele.orgCode == orgGrp.orgCode,
          );

          const requiredRoleGrp = requiredOrg.roleGrp.find(
            (ele) => ele.roleGrpCode == roleGrp.roleGrpCode,
          );

          const requiredrole = requiredRoleGrp.roles.find(
            (ele) => ele.roleCode == roleGrp.roleCode,
          );

          const requiredPSGrp = requiredrole.psGrp.find(
            (ele) => ele.psGrpCode == psGrp.psGrpCode,
          );

          const requiredPS = requiredPSGrp.ps.find(
            (ele) => ele.psCode == psGrp.psCode,
          );

          return await this.processPortal(requiredPS.portal);
        } else {
          throw new Error('Data not found');
        }
      } else {
        throw new Error('Token not valid');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getValueFromRedis(key: string) {
    try {
      if (key) {
        return await this.redisService.getJsonData(key);
      } else {
        throw new Error('key information not available');
      }
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async postValueinRedis(key: string, value: string) {
    try {
      return await this.redisService.setJsonData(key, JSON.stringify(value));
    } catch (error) {
      throw new CustomException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllKeys(keyPrefix: string) {
    try {
      const keys: any = await this.redisService.getKeys(keyPrefix);
      if (keys && keys.length) {
        return { data: keys };
      } else {
        return { error: 'No data available for the key' };
      }
    } catch (error) {
      await this.throwCustomException(error);
    }
  }
  async getUserList(client) {
    try {
      if (client) {
        const data = await this.redisService.getJsonData(`T:${client}:users`);
        if (data) {
          const userlist: any[] = JSON.parse(data);
          return userlist.map((ele: any) => {
            delete ele.password;
            return ele;
          });
        } else {
          throw new NotFoundException('No data available for the key');
        }
      } else {
        throw new ForbiddenException('client information not available');
      }
    } catch (error) {
      await this.throwCustomException(error);
    }
  }
}
