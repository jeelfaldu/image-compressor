import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }
  downloadBase64File(base64Data: string) {
    const linkSource = base64Data;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = new Date().getTime().toString() + '.png';
    downloadLink.click();
  }
}
