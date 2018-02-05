import { config } from './../../providers/config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile1',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
  images=config.images;
  constructor() { }
  data=[];
  ngOnInit() {
    this.data = [
      {
        name: 'Clint Hugh',
        letter: 'C',
        avatar: './assets/demo/img/profile-pics/1.jpg'
      },
      {
        name: 'Roydon Jem',
        letter: 'R',
        avatar: ''
      },
      {
        name: 'Wynne John',
        letter: 'W',
        avatar: ''
      },
      {
        name: 'Nicholas Roydon',
        letter: 'N',
        avatar: './assets/demo/img/profile-pics/2.jpg'
      },
      {
        name: 'Wat Shaw',
        letter: 'W',
        avatar: './assets/demo/img/profile-pics/3.jpg'
      },
      {
        name: 'Devereux Brad',
        letter: 'D',
        avatar: ''
      },
      {
        name: 'Fulk Delmar',
        letter: 'F',
        avatar: ''
      },
      {
        name: 'Silver Mathew',
        letter: 'S',
        avatar: ''
      },
      {
        name: 'Geffrey Cortney',
        letter: 'G',
        avatar: ''
      },
      {
        name: 'Lonny Dustin',
        letter: 'L',
        avatar: ''
      },
      {
        name: 'Jaycob Ronny',
        letter: 'J',
        avatar: './assets/demo/img/profile-pics/4.jpg'
      },
      {
        name: 'Alvin Norman',
        letter: 'A',
        avatar: './assets/demo/img/profile-pics/5.jpg'
      },
      {
        name: 'Malcom Dutch',
        letter: 'M',
        avatar: ''
      },
      {
        name: 'Cole Ferdinand',
        letter: 'C',
        avatar: ''
      },
      {
        name: 'Pierce Colin',
        letter: 'P',
        avatar: ''
      },
      {
        name: 'Archibald Frederick',
        letter: 'A',
        avatar: ''
      },
      {
        name: 'Sydney Troy',
        letter: 'S',
        avatar: ''
      },
      {
        name: 'Benji Braxton',
        letter: 'B',
        avatar: './assets/demo/img/profile-pics/6.jpg'
      },
      {
        name: 'Chesley Donny',
        letter: 'C',
        avatar: ''
      },
      {
        name: 'Nate Vere',
        letter: 'N',
        avatar: ''
      },
      {
        name: 'Sammie Roy',
        letter: 'S',
        avatar: ''
      },
      {
        name: 'Sebastian Erik',
        letter: 'S',
        avatar: ''
      },{
        name: 'Maria Mack',
        letter: 'M',
        avatar: ''
      },
      {
        name: 'Sylvanus Delano',
        letter: 'S',
        avatar: './assets/demo/img/profile-pics/7.jpg'
      }

    ]
  }

}
