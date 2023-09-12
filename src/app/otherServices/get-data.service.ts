import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  collectionData,
  DocumentData,
} from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/pages/modal/modal.page';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  public myEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  adminData: any[] = [];
  constructor(
    private firestore: Firestore,
    private modalCntrl: ModalController,) { }

  async getFromFirebase(key: any) {
    const collectionInstance = collection(this.firestore, key);

    return new Promise((resolve, reject) => {
      const subscription = collectionData(collectionInstance, { idField: 'id' })
        .subscribe(
          (val) => {
            console.log('val', val);
            subscription.unsubscribe(); // Clean up the subscription

            resolve(val); // Resolve the promise with the value
          },
          (error) => {
            subscription.unsubscribe(); // Clean up the subscription

            reject(error); // Reject the promise with the error
          }
        );
    });
  }

  // openModel
  async openModel(dataKey: any) {
    return new Promise((resolve, reject) => {
      this.modalCntrl
        .create({
          component: ModalPage,
          componentProps: dataKey,
        })
        .then((modalRes) => {
          modalRes.present();

          modalRes.onDidDismiss().then((res) => {
            console.log('dismissed', res);

            if (res.data != null) {
              resolve(res.data);
            } else {
              reject('data not found');
            }
          }).catch(error => {
            reject(error);
          });
        });
    });
  }
}
