import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';

import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [AuthComponent],
  providers: [UserService, AuthGuard]
})
export class AuthModule {}
