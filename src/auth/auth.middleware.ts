import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token =
        req.cookies?.jwt || req.headers.authorization?.split(' ')[1];
      if (token) {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });
        req['userId'] = payload.sub;
        
        console.log(`Authenticated User ID: ${req['userId']}`);
      } else {
        console.warn('No JWT token provided');
      }
    } catch (error) {
      console.error('Auth middleware error:', error.message);
    }
    next();
  }
}
