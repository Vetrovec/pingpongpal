export interface IAccessKey {
  label: string;
  key: string;
  createdAt: Date;
}

export interface IListAccessKeysResponse {
  accessKeys: IAccessKey[];
}

export interface ICreateAccessKeyRequest {
  label: string;
}

export interface IDeleteAccessKeyRequest {
  key: string;
}

export interface ICreateAccessKeyResponse {
  accessKey: IAccessKey;
}
