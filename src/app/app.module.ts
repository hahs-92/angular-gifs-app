import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

//modulos
import { SharedModule } from './shared/shared.module';
import { GifsModule } from './gifs/gifs.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    //agregamos modulo compartido
    SharedModule,
    GifsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
