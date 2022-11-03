import { httpsServer } from "./index";
//登录接口
export const loginApi = (data: object) =>
  httpsServer({ method: "post", url: "user/login", data });
//用户列表
export const QuerySysUsersApi = (params: object) =>
  httpsServer({ url: "Sys/QuerySysUsers", params });
