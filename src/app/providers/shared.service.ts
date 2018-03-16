import * as MainActions from './../layout/store/main.actions';
import { AppState } from './../store/app.reducers';
import { Observer } from 'rxjs/Observer';
import { catchError } from 'rxjs/operators/catchError';
import { Observable } from 'rxjs/Observable';
import { ContainerService } from './container.service';
import { HttpClient } from '@angular/common/http';
import { config } from './config';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { EventsService } from './events.service';
import { Store } from '@ngrx/store';
declare var Snackbar: any;

@Injectable()
export class SharedService {

    // Sidebar visibility
    sidebarVisible: boolean
    sidebarVisibilitySubject: Subject<boolean> = new Subject<boolean>()
    createPostSubject: Subject<boolean> = new Subject<boolean>();
    createTopicSubject: Subject<boolean> = new Subject<boolean>();


    constructor(private http: HttpClient, private container: ContainerService,
        private store: Store<AppState>,
        private eventsService: EventsService) {
        this.sidebarVisible = false
        this.maTheme = 'green'
    }

    toggleSidebarVisibilty() {
        this.sidebarVisible = !this.sidebarVisible
        this.sidebarVisibilitySubject.next(this.sidebarVisible)
    }

    addMember(data) {
        return this.http.post(config.url + '/api/v1/memberships', data)
    }
    maTheme: string
    maThemeSubject: Subject<string> = new Subject<string>()

    setTheme(color) {
        this.maTheme = color
        this.maThemeSubject.next(this.maTheme)
    }

    getProjectTemplate() {
        return this.http.get(config.url + '/api/v1/project-templates').map(res => {
            this.container.projectTemplate = res[0];
            return res[0];
        })
    }

    getKanbanLayout() {
        return this.http.get(config.url + '/api/v1/project-templates').map(res => res[1])
    }

    searchtext(text) {
        return this.http.get(config.url + `/api/v1/search?project=${this.container.projectId}\&text=` + text)
    }

    getPostStatuses() {
        return this.http.get(config.url + `/api/v1/userstory-statuses`).map((res: any[]) => res.filter(s => s.project === this.container.projectId))
    }

    notify(message) {
        Snackbar.show({ text: message, pos: 'bottom-center' });
    }

    handleError(er) {
        return Observable.throw(er || 'Server error')
    }


    getUserDetails(id) {
        return this.http.get(config.url + `/api/v1/users/` + id).map((res: any) => {
            this.store.dispatch(new MainActions.UserUpdated(res));
            this.container.user = res;
            console.log(res);
            return res;
        }).pipe(catchError(this.handleError));
    }


}