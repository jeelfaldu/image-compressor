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
    } else {
      this.imageQuality = 20;
    }
  }
  fileChangeEvent(event: any): void {
    this.imgBase64 = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  imageTransform(position: 'flipH' | 'flipV') {
    this.ImageTransform[position] = !this.ImageTransform[position];
  }
  imagecanvasRotation(rotation: number) {
    this.canvasRotation += rotation;
  }
  saveImage(){
    this.imgService.downloadBase64File(this.croppedImage);
  }
}
