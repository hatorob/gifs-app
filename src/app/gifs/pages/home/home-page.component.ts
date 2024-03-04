import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

  constructor( private gifsServices: GifsService ) {

  }

  //! creamos gifs para obtener la data de searchGifs de services
  get gifs(): Gif[] {
    return this.gifsServices.gifList;
  }

}
