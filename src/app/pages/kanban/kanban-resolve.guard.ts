import { ContainerService } from './../../providers/container.service';
import { SharedService } from './../../providers/shared.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { catchError } from 'rxjs/operators';
@Injectable()
export class KanbanResolveGuard implements Resolve<any> {
  constructor(private sharedService:SharedService,private container:ContainerService){}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('hello111')
    var observables=[];

    observables[0]=this.sharedService.getPostStatuses().map((res:any[])=>res.filter(item=>item.project===this.container.projectId))

    return forkJoin(observables).map((results:any[])=>{
        var statuses=results[0];
        this.container.statuses=statuses;
            var posts=this.container.posts.slice();
            statuses.forEach(o=>{
                o.data=[];
                posts.forEach(p=>{
                    if(p.status===o.id)
                    {
                        o.data.push(p);
                    }
                })
            })
            return {data:statuses};
    })

  }
}
