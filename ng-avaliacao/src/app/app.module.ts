import { ErrorInterceptor } from './interceptor/error.interceptor';
import { HeaderInterceptor } from './interceptor/header.interceptor';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { effects } from './store/effects';
import { metaReducers, reducers } from './store/app.states';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToastrModule } from 'ngx-toastr';
import { StripUndefinedParams } from './interceptor/strip-undefined-param';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument({}) : [],
    Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-full-width',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule
  ],
  providers: [
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StripUndefinedParams,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
