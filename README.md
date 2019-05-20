<<<<<<< HEAD
# Tuten

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
=======
# tutenTest
Prueba Tuten

Aplicación creada en Angular 6.

1) Conexión mediante la API provista, y obtención de del Object Array que contiene la información usada a ser mostrada en la aplicación web.

El layout fue creado utilizando Angular Flex-Layout.

A efectos de mostrar 2 formas de mostrar la información (Aunque sea redundante), se hizo disponible, al momento de renderizarse la página, sin necesidad de que el usuario deba interactuar para ver dicha información, utilizando el componente <mat-card> de Angular materials, y tambien se creo un menú, utilizando el componente <mat-menu>, donde se despliega un dropdown con la información obtenida en la primera opción del dicho dropdown.
  
  A fines de mantener las clases de typescript lo más limpias posibles, la lógica de negocios fue separada:
  
  a) se creo un archivo .ts, en la carpeta "shared", donde se declara una variable que contiene el array obtenido desde la API: export const data=Array  [ .... ];
  
  b) Se creo un servicio desde la CLI de Angular con el comando: ng generate service services/fetch-data
  
  Este servicio se encarga de la inyección de dependencias, importando la el array mencionado arriba: import { dataArray } from '../shared/personal'; 
  
  Luego se creo un método que retorna dicho Array.
  
    getDataArray() {
      return dataArray;
    }

  
  Al ser inyectable este servicio, se importa desde el app.component.ts:

    import { FetchDataService } from './services/fetch-data.service';
  
  
  Luego se declara en el constructor de la clase:
  
    constructor(private fetchDataService: FetchDataService ){}

  
  En el ngOnInit se trae la información con la data :
  
    this.dataArray = this.fetchDataService.getDataArray();
  
  Aunque la mejor manera es modificar estilos desde el .scss asociado, sólo para efectos de demostrar la manipulación del DOM desde typescript, en ngOnInit, haciendo uso de renderer2 se manda a ejecutar el siguiente código:

     this.renderer.setStyle(this.slct.nativeElement, 'width', 'fit-content'); 
 
donde "this.slct" apunta al elemento <mat-menu> del app.component.html, el cual es pasado como referencia mediante "#slct":
  
    <select class="pricePicker" #slct name="" (change)="change(slct)">

Luego para manipularlo desde el modelo, se hace uso del componente viewChild y el decorador @viewChild:

     @ViewChild('slct') slct: ElementRef;
 
 Para esto, en el constructor se declaran, Rendeder2 y ElementRef:

     constructor(private fetchDataService: FetchDataService, private el: ElementRef,
      private renderer: Renderer2
      ) {
     }

   La animación que realizan las <mat-card> con la información que se quiere mostrar, se realiza haciendo uso de la librería "anime.js"
  
  la cual se instala como dependencia del proyecto:npm install animejs --save. y luego es importada:
  
    import anime from 'animejs';
 
  
  Luego en el hook ngAfterViewInit, se coloca el código de dicha libería que crea las animaciones:
  
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

La parte más importante y crucial en el proyecto es la siguiente:

La iteración del array obtenido desde la API, se realiza en un metodo disparado al momento que el usuario elige una opción del menú select. Las opciones son: 

Todos los precios,
Precio mayor de 2000,
Precio menor de 2000.

Estas opciones están en contenidas en un elemento <select> con sus correspondientes <option>.
  
  Dicho select posee un metodo (change), el cual dependiendo de la opción seleccionada, ejecuta un metodo llamado "change" que recibe como parametro el valor del select mediante la referencia #select mecionada previamente:
  
  
    <select class="pricePicker" #slct name="" (change)="change(slct)">
        <option value="z">Seleccionar Precio</option>
        <option value="allprices"> todos los precios</option>
        <option value="over">Precio mayor de 2000</option>
        <option value="under">Precio menor de 2000</option>
    </select>

  
  Luego cuando se selecciona una opción, se verifica el value del select y en funcion de eso se coloca a true o a false una propiedad añadida al array, llamada "visible", la cual nos permite mostrar o esconder los elementos filtrados.
  
 La propiedad utilizada para filtrar es "bookingPrice", y la lógica es la siguiente:
 
      change(x) {
        if (x.value === 'over') {
          for (let index = 0; index < this.dataArray.length; index++) {
               this.dataArray[index].bookingPrice > 20000 ? this.dataArray[index].visible = true : this.dataArray[index].visible =                      false;
          }


        } else if (x.value === 'under') {
        for (let index = 0; index < this.dataArray.length; index++) {
                 this.dataArray[index].bookingPrice < 20000 ? this.dataArray[index].visible = true : this.dataArray[index].visible =                      false;
            }
          } else {
        for (let index = 0; index < this.dataArray.length; index++) {
                  this.dataArray[index].visible = true;
          }
        }
      }
    }

La manera en que se muestran u ocultan las <mat-cards> haciendo uso del fragmento de código mencionado arriba es mediante la directiva estructural *ngIf, la cual es declarada en los elementos <mat-card>
  
 Estos elementos son creados mediante la directiva *ngFor, la cual recorre el arreglo, generando tantas cards, como objetos principales tiene el arreglo. Luego se hace uso de la interpolación {{}} para acceder a las propiedades internas en cada iteración, mostrando así la información de cada objeto en cada card:
 
    <ng-container *ngFor="let person of
              dataArray">
              <mat-card class="bigCards" #maty *ngIf="person.visible == true">
                  <mat-card-title-group>

                      <mat-card-subtitle>
                          <span class="boldy">BookingId:</span>
                          <span>
                              {{person.bookingId}}
                          </span>
                          <span class="boldy"> Cliente:</span>
                          <span>
                              {{person.locationId.tutenUser.firstName +" "+
                              person.locationId.tutenUser.lastName}}
                          </span>
                          <span class="boldy">Fecha de Creación</span>
                          <span>{{person.bookingTime | date}}</span>
                          <span class="boldy">Dirección</span>
                          <span>{{person.locationId.streetAddress}}</span>
                          <span class="boldy">Precio</span>
                          <span>{{person.bookingPrice}}</span>
                      </mat-card-subtitle>
                  </mat-card-title-group>
              </mat-card>
          </ng-container>
      </div>
>>>>>>> 473d749aee44e126a23f3a33b8a28f065b331a3d
