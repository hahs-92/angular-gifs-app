import { Component, ElementRef, ViewChild } from '@angular/core';
//services
import { GifsService } from '../../services/gifs.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifsServices: GifsService) {}

  search() {
    const query = this.txtSearch.nativeElement.value;
    if (query.trim().length === 0) {
      return;
    }
    // console.log(this.txtSearch.nativeElement.value);
    this.gifsServices.searchGifs(query);
    this.txtSearch.nativeElement.value = '';
  }
}
