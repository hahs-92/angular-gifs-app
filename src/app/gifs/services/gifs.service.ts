import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
//interfaces
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private API_KEY = 'S6QgMDdocDTXU6mnUV8pOGDdi4rnZ53w';
  private BASE_URL = 'https://api.giphy.com/v1/gifs';
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

    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    //eliminar valores repetidos
    if (!this.historial.includes(query)) {
      this._historial.unshift(query);
      //restringir el numero de valores a 10
      this._historial = this._historial.splice(0, 10);

      //guardar historial en local storage
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.BASE_URL}/search`, { params: params })
      .subscribe((resp) => {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(resp.data));
      });
  }
}

// 84. api key
//me logee con face
// S6QgMDdocDTXU6mnUV8pOGDdi4rnZ53w;
