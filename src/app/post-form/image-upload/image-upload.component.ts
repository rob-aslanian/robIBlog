import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"]
})
export class ImageUploadComponent implements OnInit {
  @Input() imageSrc: string = null;

  @Output() imageData: EventEmitter<string> = new EventEmitter<string>();

  imageName: string = "No image selected";
  showDelete: boolean = false;
  imgUrl: string = null;

  constructor() {}

  ngOnInit() {}

  uploadImage(input: any) {
    const file: File = input.files[0];

    if (file) {
      this.readUrl(file);
      this.readBinary(file);
    }
  }

  readBinary(file: File) {
    const reader: FileReader = new FileReader();

    reader.addEventListener("load", (e: any) => {
      let imageData = btoa(e.target.result);
      this.imageData.emit(imageData);
    });

    reader.readAsBinaryString(file);
  }

  readUrl(file: File) {
    const reader: FileReader = new FileReader();

    reader.addEventListener("load", (e: any) => {
      this.imgUrl = e.target.result;
      this.imageName = file.name;
      this.showDelete = true;
    });
    reader.readAsDataURL(file);
  }
}
