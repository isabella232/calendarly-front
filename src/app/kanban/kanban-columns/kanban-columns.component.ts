import { DragulaService } from 'ng2-dragula';
import { config } from './../../providers/config';
import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../providers/events.service';
declare var swal: any;
@Component({
  selector: 'kanban-columns',
  templateUrl: './kanban-columns.component.html',
  styleUrls: ['./kanban-columns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanColumnsComponent implements OnInit {

  constructor(private router: Router, private eventsService: EventsService,
    private dragulaService: DragulaService, ) { }

  @Input() statuses = [];
  @Output() emitEditPost = new EventEmitter<any>();
  @Output() emitDeletePost = new EventEmitter<any>();
  @Output() emitAddPost = new EventEmitter<any>();
  @Output() onDrag = new EventEmitter<any>();
  fallbackImg = config.images.fallbackImg;

  ngOnInit() {
    this.dragulaService.drop.subscribe(res => {
      var id = Number(res[1].id)
      var order = Number(res[2].children[0].id)
      this.onDrag.emit({ order: order, id: id });
    })
  }

  deletePost(id) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then(result => {
        if (result.value) {
          this.emitDeletePost.emit(id);
        }
      })
  }

  addPost(id) {
    this.eventsService.openPostSubject.next(id);
  }

  editPost(id) {
    this.router.navigate(['/', 'post', id])
  }

  ngOnChanges(change) {
    if (change.statuses) {
      this.statuses = change.statuses.currentValue;
    }
  }
}
