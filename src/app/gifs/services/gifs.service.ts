import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];

  get historial() {
    //rompemos la referencia
    return [...this._historial];
  }

  searchGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    //eliminar valores repetidos
    if (!this.historial.includes(query)) {
      this._historial.unshift(query);
    }
    //restringir el numero de valores a 10
    this._historial = this._historial.splice(0, 10);
  }
}
