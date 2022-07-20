import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//interfaces
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private API_KEY = 'S6QgMDdocDTXU6mnUV8pOGDdi4rnZ53w';
  private _historial: string[] = [];

  get historial() {
    //rompemos la referencia
    return [...this._historial];
  }

  public results: Gif[] = [];

  constructor(private http: HttpClient) {
    // if (localStorage.getItem('historial')) {
    //   //con el sigmo ! le decimos a ts que confie en nosotros XD
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }

    //tambien se puede hacer asi
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  }

  searchGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    //eliminar valores repetidos
    if (!this.historial.includes(query)) {
      this._historial.unshift(query);
      //restringir el numero de valores a 10
      this._historial = this._historial.splice(0, 10);

      //guardar en local storage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=${this.API_KEY}&q=${query}&limit=10`
      )
      .subscribe((resp) => (this.results = resp.data));
  }
}

// 84. api key
//me logee con face
// S6QgMDdocDTXU6mnUV8pOGDdi4rnZ53w;
