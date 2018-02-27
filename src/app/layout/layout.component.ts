import { SharedService } from '../providers/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls:['./style.scss']
})
export class LayoutComponent implements OnInit {
  maTheme: string = this.sharedService.maTheme;

  constructor(private sharedService: SharedService) {
    sharedService.maThemeSubject.subscribe((value) => {
      this.maTheme = value
    })
  }

  ngOnInit() {
    this.sharedService.notify('Welcome to Calendarly');
    this.sharedService.getProjectTemplate().subscribe(res=>{
      console.log(res)
    })
  }

}
