import { Component } from '@angular/core';
//services
import { GifsService } from 'src/app/gifs/services/gifs.service';
@Component({
  selector: 'app-sidebar',
  host: { class: 'sidebar' },
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  get historial() {
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) {}

  search(query: string) {
    this.gifsService.searchGifs(query);
  }
}
