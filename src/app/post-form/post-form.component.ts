import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Message } from "../models/messages";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"]
})
export class PostFormComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() result: EventEmitter<Message> = new EventEmitter<Message>();

  @Input() title: string;
  @Input() values: Message;

  base64textString: string = null;
  postForm: FormGroup;
  invalid: boolean = false;
  validationMessage: string = null;
  imageSrc: string = null;

  private _messages: object = {
    required: "%_% is required",
    maxlength: "%_% max length is 100"
  };

  constructor(f: FormBuilder) {
    this.postForm = f.group({
      title: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ],
      body: ["", Validators.required]
    });
  }

  validateForm(controls: any): boolean {
    let keys = Object.keys(controls);

    keys.forEach(key => {
      this.invalid = this.postForm.invalid;
      if (this.postForm.invalid && controls[key].errors !== null) {
        let errors = Object.keys(controls[key].errors);
        errors.forEach(error => {
          this.validationMessage = this._messages[error].replace("%_%", key);
        });
      }
    });

    return this.postForm.valid;
  }

  submitForm(controls: any): boolean {
    if (this.validateForm(controls)) {
      let message: Message = {
        body: controls["body"].value,
        title: controls["title"].value,
        createdAt: new Date().toUTCString(),
        imageData: this.base64textString
      };

      this.result.emit(message);
      this.loading.emit(true);

      return true;
    }

    return false;
  }
  parseValues(values: Message) {
    let fields = Object.keys(this.postForm.controls);

    fields.forEach(field => {
      if (values[field]) {
        this.postForm.controls[field].setValue(values[field]);
      }
    });
  }

  ngOnInit() {
    if (this.values) {
      if (this.values.imageName !== null) {
        this.imageSrc = this.values.imageName;
      }
      return this.parseValues(this.values);
    }
  }
}
