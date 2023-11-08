import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/common-service.service';


@Component({
  selector: 'app-child-playlist',
  templateUrl: './child-playlist.page.html',
  styleUrls: ['./child-playlist.page.scss'],
})
export class ChildPlaylistPage implements OnInit {

  constructor(public CommonService: CommonServiceService) { }

  ngOnInit() {
  }

}
