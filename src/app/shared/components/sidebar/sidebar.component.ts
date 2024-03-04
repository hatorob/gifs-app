import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor( private gifsServices: GifsService ) {

  }

  public get gifsTags(): string[] {
    return [...this.gifsServices.tagsHistory];
  }

  //!Si doy click en el boton de los tags, vuelvo a realizar la petición
  public searchTag = ( tag: string ) => {
    //console.log("doy click desde el sidebar", tag);
    this.gifsServices.searchTag(tag);
  }


}
