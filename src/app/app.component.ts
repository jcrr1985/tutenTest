import { Component, OnInit, AfterViewInit, Renderer2 , ViewChild, ElementRef  } from '@angular/core';
import { FetchDataService } from './services/fetch-data.service';
import anime from 'animejs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit, AfterViewInit  {

  dataArray: any;

 @ViewChild('slct') slct: ElementRef;


  constructor(private fetchDataService: FetchDataService, private el: ElementRef,
    private renderer: Renderer2
    ) {
   }

  ngOnInit() {
    this.dataArray = this.fetchDataService.getDataArray();
    this.renderer.setStyle(this.slct.nativeElement, 'width', 'fit-content'); // Es mejor modificar atributos CSS desde la hoja de estilo, Esto es sólo para fines demostrativos del manejo del DOM en el contexto del modelo :)

  }

  ngAfterViewInit() {
    anime({
      targets: 'mat-card',
      scale: [
        {value: .1, easing: 'easeOutSine', duration: 500},
        {value: 1, easing: 'easeInOutQuad', duration: 1200}
      ],
    rotateZ: anime.stagger([0, 90], {grid: [14, 5], from: 'center', axis: 'x'}),
      delay: anime.stagger(200, { grid: [14, 5], from: 'center' }),
      direction: 'alternate'
    });
}

  change(x) {
    if (x.value === 'over') {
      for (let index = 0; index < this.dataArray.length; index++) {
           this.dataArray[index].bookingPrice > 20000 ? this.dataArray[index].visible = true : this.dataArray[index].visible = false;
      }


    } else if (x.value === 'under') {
  for (let index = 0; index < this.dataArray.length; index++) {
           this.dataArray[index].bookingPrice < 20000 ? this.dataArray[index].visible = true : this.dataArray[index].visible = false;
      }
    } else {
 for (let index = 0; index < this.dataArray.length; index++) {
            this.dataArray[index].visible = true;
      }
    }
  }
}

