import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  //! Se pone void por que es un método que no regresa nada
  public searchTag( tag: string ):void {
    this._tagsHistory.unshift( tag );
    console.log("tags insertados: ", this._tagsHistory);
  }

}
