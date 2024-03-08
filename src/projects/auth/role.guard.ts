// roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // Si aucune exigence de rôle n'est définie, autoriser l'accès par défaut
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assurez-vous que 'user' est attaché à la requête (par JwtAuthGuard ou LocalAuthGuard)

    return requiredRoles.some((role) => user.roles?.includes(role)); // Vérifiez si l'utilisateur a un des rôles requis
  }
}
