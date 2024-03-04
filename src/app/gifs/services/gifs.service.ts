import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

//! la siguiente variable debería ser una varible de entorno y no debería ir aquí, pero por el momento la pondremos aquí
const GIPHY_API_KEY = "5mhfTlvZYtb5KO7Q8unEK6I8NROyurIo";
const URL = "https://api.giphy.com/v1/gifs/search";

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private _tagsHistory: string[] = [];
  public gifList: Gif[] = [];

  constructor( private http: HttpClient ) {
    //! Cargamos del localStorage
    this.loadLocalStorage();
    //! Cargamos los gifs del primer elemento
    if(this._tagsHistory.length > 1) this.searchTag(this._tagsHistory[0]);
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  //! Se pone void por que es un método que no regresa nada
  //public async searchTag( tag: string ):Promise<void> {   --- Si queremos usar fetch
  public searchTag( tag: string ):void {

    if (tag.length == 0) return;
    this.organizeHistory(tag);
    //! quito el unshift ya que la función de organizeHistory ya lo hace
    //this._tagsHistory.unshift( tag );
    console.log("tags insertados: ", this._tagsHistory);

    //! consumimos la api.
    // api.giphy.com/v1/gifs/search?api_key=5mhfTlvZYtb5KO7Q8unEK6I8NROyurIo&q=bulma&limit=10

    //! peteciones con Fetch
    //? Esta es una manera de hacer peticiones HTTP haciendo uso de fetch, pero angular tiene una manera más comodade hacerla, así que veamos como lo hace angular
    /* const response = await fetch(`https://${URL}?api_key=${GIPHY_API_KEY}&q=${tag}&limit=10`)
        .then( response => response.json() )
        .then( data => data );
    const dataTags = response.data;
    console.log("data", dataTags); */

    //! Peticiones con angular
    //* Importamos en el app.module HttpClientModule -> y lo importamos
    //* Podemos agregar parametros con httpParams para la url
    const params = new HttpParams()
                          .set('api_key', GIPHY_API_KEY)
                          .set('q',tag)
                          .set('limit','10');

    //this.http.get(`${URL}?api_key=${GIPHY_API_KEY}&q=${tag}&limit=10`) -> si no uso params
    this.http.get<SearchResponse>(`${URL}`, { params })
        .subscribe( resp => {
          this.gifList = resp.data;
          console.log({ gifs: this.gifList });
        });

  }

  //! Organizar por historial

  public organizeHistory( tag: string ) {
    tag = tag.toLowerCase();

    if( this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag != tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();

  }

  //! Guardar en el local storage
  private saveLocalStorage(): void {
    //! Guardo mi arreglo de tags en el localStorage
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  //! Leer en el localStorage
  private loadLocalStorage(): void {

    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

  }

}
