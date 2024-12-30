export interface IUser {
  id: number;
  username: string;
  password: string;
  fullname: string;
  remotes: IUserRemote[];
}

export interface IUserRemote {
  id: number;
  scope: string;
  moduleName: string;
  routePath: string;
  remoteUrl: string;
  frontUrl: string;
  label: string;
  isActive: boolean;
}
