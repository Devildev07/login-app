import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/common-service.service';


@Component({
  selector: 'app-master-playlist',
  templateUrl: './master-playlist.page.html',
  styleUrls: ['./master-playlist.page.scss'],
})
export class MasterPlaylistPage implements OnInit {

  constructor(public CommonService: CommonServiceService) { }

  ngOnInit() {
  }

}
