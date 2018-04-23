import { HeroService } from './hero-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  exports:[
    AppComponent,
    HeroListComponent,
  HeroDetailComponent],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
