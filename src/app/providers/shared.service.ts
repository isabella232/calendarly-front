import { EventsService } from './events.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
declare var $:any;

@Injectable()
export class SharedService {

  constructor(private http:HttpClient,private eventsService:EventsService) { }

  mapToPostToTaiga(post)
  {
    return {
      ...post,
      tags:post.tags.split(','),
      subject:post.title,
      project:9
    }
  }

  // handleError(err)
  // {
  //   if(err.status)
  //   {
  //     this.eventsService.notify(err.error._error_message,'danger');
  //   }
  // }


//   notify(message, type){
//     $.growl({
//       icon: "icon",
//       title: ' Bootstrap Growl ',
//       message: 'Turning standard Bootstrap alerts into awesome notifications',
//       url: ''
//   },{
//           element: 'body',
//           type: type,
//           allow_dismiss: true,
//           placement: {
//                   from: "bottom",
//                   align: "left"
//           },
//           offset: {
//               x: 20,
//               y: 85
//           },
//           spacing: 10,
//           z_index: 1031,
//           delay: 2500,
//           timer: 1000,
//           url_target: '_blank',
//           mouse_over: false,
//           animate: {
//                   enter: "animated fadeIn",
//                   exit: "animated fadeOut"
//           },
//           icon_type: 'class',
//           template: '<div data-growl="container" class="alert" role="alert">' +
//                           '<button type="button" class="close" data-growl="dismiss">' +
//                               '<span aria-hidden="true">&times;</span>' +
//                               '<span class="sr-only">Close</span>' +
//                           '</button>' +
//                           '<span data-growl="icon"></span>' +
//                           '<span data-growl="title"></span>' +
//                           '<span data-growl="message"></span>' +
//                           '<a href="#" data-growl="url"></a>' +
//                       '</div>'
//   });
// };
}
