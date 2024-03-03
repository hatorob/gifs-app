import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

//! #txtTagInput -> es una referencia local, de esta manera no necesito importar
//! ngForms para un simple input

@Component({
    selector: 'gifs-shearch-box',
    template: `
      <h5>Buscar:</h5>
      <input type="text"
        class="form-control"
        placeholder="Buscar gifs"
        (keyup.enter)="searchTag()"
        #txtTagInput
      >
    `,
    styleUrl: './shearch-box.component.css',
})
export class ShearchBoxComponent {

  //! creando el decorador ViewChild
  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  constructor( private gifsServices: GifsService ) {

  }

  //!forma uno sin el decorador ViewChild
  /* searchTag( newTag: string ) {
    console.log("newTag", newTag);
  } */

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    console.log("newTag", newTag);
    //! Aquí uso mi servicio e inserto mi tag
    this.gifsServices.searchTag( newTag );
    //! limpio la variable
    this.tagInput.nativeElement.value = "";
  }

}
