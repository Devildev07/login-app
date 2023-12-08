import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonServiceService } from 'src/app/common-service.service';
import { GetDataService } from 'src/app/otherServices/get-data.service';

@Component({
  selector: 'app-playlist-modal',
  templateUrl: './playlist-modal.component.html',
  styleUrls: ['./playlist-modal.component.scss'],
})
export class PlaylistModalComponent implements OnInit {
  getMasterPlaylistData: any[] = [];
  selectedPlaylist: any[] = [];
  @Input() playList: any[] = [];

  constructor(
    private modalController: ModalController,
    public getData: GetDataService,
    public CommonService: CommonServiceService
  ) {}

  ngOnInit() {
    this.getMasterPlaylist();
  }

  //  get playlist data
  async getMasterPlaylist() {
    const getPlaylistData: any = await this.getData.getFromFirebase('playlist');
    const filterData = getPlaylistData.filter((data: any) => {
      return data.type == 'master_playlist';
    });

    filterData.sort((a: any, b: any) =>
      a.playList_name && b.playList_name
        ? a.playList_name.localeCompare(b.playList_name)
        : 0
    );

    // console.log('filterData', filterData);
    this.getMasterPlaylistData = filterData;
    console.log('getMasterPlaylistData', this.getMasterPlaylistData);
  }

  selectMasterPlaylist() {
    const selectedPlaylist = this.getMasterPlaylistData.filter(
      (playlist: any) => playlist.selected
    );
    this.modalController.dismiss(selectedPlaylist);
    console.log('selectedPlaylist', selectedPlaylist);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
