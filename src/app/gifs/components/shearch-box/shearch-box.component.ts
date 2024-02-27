import { Component } from '@angular/core';

@Component({
    selector: 'gifs-shearch-box',
    template: `
      <h5>Buscar:</h5>
      <input type="text"
        class="form-control"
        placeholder="Buscar gifs"
      >
    `,
    styleUrl: './shearch-box.component.css',
})
export class ShearchBoxComponent { }
