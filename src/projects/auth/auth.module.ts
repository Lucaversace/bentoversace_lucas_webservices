import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '../modules/users.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'local' }),
    JwtModule.register({
      secret: 'SecretJWT', // Utilisez une variable d'environnement pour le secret
      signOptions: { expiresIn: '60s' }, // Définissez la durée de vie du token
    }),
  ],
  providers: [AuthService, JwtStrategy,LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
