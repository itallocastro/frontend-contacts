export enum Method {
  Post = 'post',
  Get = 'get',
  Put = 'put',
  Delete = 'delete',
}

export interface Operation {
  url: string;
  method: Method;
}
