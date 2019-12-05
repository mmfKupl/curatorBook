import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// NG Translate

import { AppComponent } from './app.component';
import { ModelControlModule } from './model-control/model-control.module';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { ModelsPageComponent } from './model-control/models-page/models-page.component';
import { MainPageComponent } from './main-page/main-page.component';

// AoT requires an exported function for factories

@NgModule({
  declarations: [AppComponent, SnackBarComponent, MainPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ModelControlModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
