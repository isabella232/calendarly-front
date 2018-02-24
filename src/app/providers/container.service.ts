import { Injectable } from '@angular/core';

@Injectable()
export class ContainerService {

  constructor() { }
  isAuthenticated=false;
  user:any={};
  appId='c3887fac-fd46-11e7-b129-0a1830b7532a';
  auth_code;
  appState='random-state'
  storageStrategy='sessionStorage'
  authHeader='Bearer';
  customAttributes:any={}
  projectId=9;
  cypheredToken;
  projectTemplate;
  statuses=[];
  posts=[];
  kanbanBoard;
}
