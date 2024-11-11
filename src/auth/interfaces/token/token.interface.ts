import { Request } from 'express';

export interface Token extends Request {
  user: {
    sub: string;
    name: string;
    lastname:string;
    username:string;
    gender:string;
    image:string;
    email: string;
  };
}
