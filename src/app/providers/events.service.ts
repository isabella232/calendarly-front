import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
declare var $:any;


@Injectable()
export class EventsService {

  toggleChat=new Subject<any>()
  toggleSidebar=new Subject<any>();
  getProjectTemplate=new Subject<any>();
  constructor() { }

    // userUpdated=new Subject<any>();

    exitUser=new Subject<any>();
    showLoader=new Subject<any>();
   notify(message, type){
    $.growl({
        message: message
    },{
        type: type,
        allow_dismiss: false,
        label: 'Cancel',
        className: 'btn-xs btn-inverse',
        placement: {
            from: 'top',
            align: 'right'
        },
        delay: 2500,
        animate: {
                enter: 'animated bounceIn',
                exit: 'animated bounceOut'
        },
        offset: {
            x: 20,
            y: 85
        }
    });
}

}
