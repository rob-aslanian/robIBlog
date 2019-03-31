import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-message-log",
  template: `
    <div class="card-panel alert darken-3" [ngClass]="type" *ngIf="isShow">
      <span class="white-text text-darken-2">{{ message }}</span>
      <button
        class="btn-small white black-text"
        (click)="closeMessage()"
        *ngIf="useClose"
      >
        x
      </button>
    </div>
  `
})
export class MessageLogComponent implements OnChanges {
  @Input() message: string;
  @Input() type: string;
  @Input() useClose: boolean = true;

  private isShow: boolean = true;

  constructor() {}

  closeMessage(): void {
    this.isShow = false;
  }

  ngOnChanges(): void {
    this.isShow = true;

    switch (this.type) {
      case "success":
        this.type = "green";
        break;
      case "error":
        this.type = "red";
        break;
      case "info":
        this.type = "indigo";
        break;
      default:
        this.type = "deep-orange ";
        break;
    }
  }
}
