import { Router } from '@angular/router';
import { SharedService } from '../providers/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls:['./style.scss']
})
export class LayoutComponent implements OnInit {
  maTheme: string = this.sharedService.maTheme;
  hideBtn;

  constructor(private sharedService: SharedService,private router:Router) {
    sharedService.maThemeSubject.subscribe((value) => {
      this.maTheme = value
    })
  }

  ngOnInit() {
  }
  goback()
  {
    this.router.navigate(['../'])
  }

}
