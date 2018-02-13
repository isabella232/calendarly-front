import { Router } from '@angular/router';
import { SharedService } from './../../../providers/shared.service';
import { Component, OnInit} from '@angular/core';
import { isArray } from 'util';

@Component({
  selector: 'header-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {


  searchActive:boolean = false;
  searchValue:string = '';
  searchFocused:boolean = false;

  closeSearch() {
    this.searchActive = false; // Close the search block
    this.searchValue = null; // Empty the search field
    this.searchFocused = false;
  }
  textBody='';

  constructor(private sharedService:SharedService,private router:Router) { }
  
  posts=[];
  topics=[];
  response=[];
  mapSearchResponse(obj)
  {
    Object.keys(obj).forEach(key=>{
      if(isArray(obj[key]))
      {
        obj[key].forEach(o=>{
          o.type=key;
          this.response.push(o);
        })
      }
     
    })

    
  }

  searchText(text)
  {
    console.log(text)
    this.sharedService.searchtext(text).subscribe((res:any)=>{
      console.log(res)
      // this.posts=res.epics;
      res.Posts=res.userstories;
      res.Topics=res.epics;
      delete res.epics;
      delete res.userstories;
      this.mapSearchResponse(res);
      // var mappedRes=this.mapSearchResponse(res);
      // console.log(this.response)
    })
  }

  selectOption(data)
  {
    console.log(data);
    if(data.item.type==='Posts')
    {
      this.router.navigate(['/','post',data.item.id])
    }
  }

  ngOnInit() {
  }
}