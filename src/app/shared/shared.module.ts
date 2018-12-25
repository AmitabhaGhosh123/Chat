import { NgModule, NO_ERRORS_SCHEMA,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details/user-details.component';
import { FirstCharComponent } from './first-char/first-char/first-char.component';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FirstCharComponent,UserDetailsComponent],
  exports: [
    FirstCharComponent,
    UserDetailsComponent,
    CommonModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class SharedModule { }
