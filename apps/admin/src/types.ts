export interface IUser {
  id: number;
  username: string;
  password: string;
  fullname: string;
  remotes: {
    remoteId: number;
    userId: number;
  }[];
}

export interface IUserRemote {
  id: number;
  scope: string;
  moduleName: string;
  remoteUrl: string;
  label: string;
  frontUrl: string;
  isActive: boolean;
}
