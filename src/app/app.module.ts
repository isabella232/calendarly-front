import { ContinuePipe } from './pipes/continue.pipe';
import { CalendarEffects } from './calendar/store/calendar.effects';
import { AppReducers } from './store/app.reducers';
import { SharedService } from './providers/shared.service';
import { AuthInterceptor } from './providers/interceptors/auth-interceptor.service';
import { PostModule } from './post/post.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import {ContainerService} from './providers/container.service';
import {EventsService} from './providers/events.service';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    PostModule,
    NgHttpLoaderModule,
    StoreModule.forRoot(AppReducers),
    EffectsModule.forRoot([CalendarEffects])
  ],
  declarations: [
    AppComponent,
    ContinuePipe
  ],
  providers: [
    SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ContainerService,
    EventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
