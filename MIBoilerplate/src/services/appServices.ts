import { AppConfig } from '@src/constants';

import { API_METHODS } from './appServices.type';
import { ServicesEndPoints } from './appServicesEndPoints';
import { getNewsListResponseAdapter } from './commercial/adapters/response/getNewsListResponseAdapter';
import { GetUserCommercialResponseAdapter } from './commercial/adapters/response/getUserCommercialResponseAdapter';
import { PostLoginCommercialResponseAdapter } from './commercial/adapters/response/postLoginCommercialResponseAdapter';
import { NewsResponseDTO } from './commercial/dtos/NewsResponseDTO';
import {
  LoginResponseDTO,
  UserResponseDTO,
} from './commercial/dtos/UserResponseDTO';
import { ListUserReq, NewsReqParams, NewsResult, UserResult } from './models';
import { LoginParams, LoginResult } from './models/login';
import serviceAdapter from './serviceAdapter';

export class AppServices {
  constructor() {}

  loginUser = async (loginParams: LoginParams): Promise<LoginResult> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<LoginResponseDTO, LoginParams>(
        API_METHODS.POST,
        ServicesEndPoints.LOGIN,
        loginParams
      )
        .then(res => {
          resolve(new PostLoginCommercialResponseAdapter().service(res));
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  listUsers = async (listUserReq: ListUserReq): Promise<UserResult[]> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<UserResponseDTO, ListUserReq>(
        API_METHODS.GET,
        `${ServicesEndPoints.USERS}?page=${listUserReq.page}&per_page=${listUserReq.per_page}`
      )
        .then(res => {
          resolve(new GetUserCommercialResponseAdapter().service(res));
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  getNews = async (newsReqParams: NewsReqParams): Promise<NewsResult[]> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<NewsResponseDTO<NewsResult[]>, NewsReqParams>(
        API_METHODS.GET,
        `${ServicesEndPoints.TOP_HEADLINES}?country=${newsReqParams.country}&pageSize=${newsReqParams.pageSize}&apiKey=${AppConfig.API_KEY}`,
        newsReqParams
      )
        .then(res => resolve(new getNewsListResponseAdapter().service(res)))
        .catch(error => {
          reject(error);
        });
    });
  };
}

export const appServices = new AppServices();
