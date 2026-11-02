import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth-service';
import { inject } from '@angular/core';

const auth = inject(AuthService)

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
