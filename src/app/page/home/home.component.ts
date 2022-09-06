import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { ImageService } from 'src/app/provider/image/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stapper: number = 0;
  imgBase64: any = false;
  imageURL: any = false;
  croppedImage: any;
  imageQuality: any = 100;
  ImageTransform = {
    flipH: false,
    flipV: false
  };
  canvasRotation = 0;
  resizeToHeight: any;
  resizeToWidth: any;
  actuleHeight: any;
  actuleWidth: any;
  fileSize:any = 0;
  constructor(private imgService: ImageService) { }

  ngOnInit(): void {
  }

  async upload(ev: any) {
    this.imageURL = URL.createObjectURL(ev[0]);
    if (this.imageURL) {
      this.stapper++;
    }
  }
  async selectImg(ev: any) {
    this.imgBase64 = ev
    if (this.imgBase64) {
      this.stapper++;
    }
  }
  setRange(ev: any) {
    if (ev.target.value > 20) {
      this.imageQuality = ev.target.value;
      this.resizeToHeight = ((this.imageQuality / 100) * this.actuleHeight).toFixed(2);
      this.resizeToWidth = ((this.imageQuality / 100) * this.actuleWidth).toFixed(2);
    } else {
      this.imageQuality = 20;
    }
  }
  fileChangeEvent(event: any): void {
    this.imgBase64 = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.resizeToHeight = event.height;
    this.resizeToWidth = event.width;
    this.getFileSize(event.base64);
    if (!this.actuleHeight || !this.actuleWidth) {
      this.actuleHeight = event.height;
      this.actuleWidth = event.width;
    }
  }
  imageTransform(position: 'flipH' | 'flipV') {
    this.ImageTransform[position] = !this.ImageTransform[position];
  }
  imagecanvasRotation(rotation: number) {
    this.canvasRotation += rotation;
  }
  saveImage() {
    this.imgService.downloadBase64File(this.croppedImage);
  }
  getFileSize(base64String: any) {
    const stringLength = base64String.length - 'data:image/png;base64,'.length;
    const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
    this.fileSize = (sizeInBytes / 1024).toFixed(2);
  }

}
