import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {
  @Input() titles: Array<string>;
  @Output() searchResult: EventEmitter<string[] | string> = new EventEmitter<
    string[] | string
  >();

  _sugestedItems: Array<string> = [];
  showSugest: boolean = false;
  searchText: string = null;
  itemIndex: number = -1;

  constructor(private elem: ElementRef) {}

  ngOnInit() {}

  test(elem: HTMLInputElement, e: KeyboardEvent) {
    this._sugestedItems = [];
    this.searchResult.emit(this._sugestedItems);
    let value = elem.value.toLowerCase();
    if (!value.match(/^\W+/gi) && value) {
      this.titles.forEach((title, idx) => {
        if (title.toLowerCase().includes(value)) {
          this._sugestedItems.push(title);
        }
      });

      this.searchResult.emit(this._sugestedItems);
    }

    return this.chooseItem(e);
  }
  chooseItem(e: KeyboardEvent) {
    let items: HTMLElement = this.elem.nativeElement.querySelector(
        ".autocomplete-items"
      ),
      keyCode = e.keyCode;

    if (items) {
      let childCount = items.children.length - 1;
      if (keyCode === 38) {
        this.itemIndex <= 0 ? (this.itemIndex = childCount) : this.itemIndex--;
      }
      if (keyCode === 40) {
        this.itemIndex >= childCount ? (this.itemIndex = 0) : this.itemIndex++;
      }
    }

    if (this.itemIndex > -1 && keyCode === 13) {
      return this.activeItem(this.itemIndex);
    }
  }

  activeItem(idx: number) {
    this.searchText = this._sugestedItems[idx];
    this.itemIndex = -1;
    this.searchResult.emit(this._sugestedItems[idx]);
    return (this._sugestedItems = []);
  }
}
