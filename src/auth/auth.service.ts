// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateGoogleUser(token: string): Promise<any> {
    // Verifikasi token Google dan dapatkan informasi pengguna
    // Implementasi verifikasi token akan ditambahkan nanti
    const googleUser = await this.verifyGoogleToken(token);

    let user = await this.usersService.findByEmail(googleUser.email);

    if (!user) {
      // Buat pengguna baru jika belum terdaftar
      user = await this.usersService.create({
        email: googleUser.email,
        name: googleUser.name,
        username: '',
        password: '',
      });
    }

    return user;
  }

  async verifyGoogleToken(token: string): Promise<any> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      return {
        email: payload.email,
        name: payload.name,
        // tambahkan properti lain yang Anda butuhkan
      };
    } catch {
      throw new Error('Invalid Google token');
    }
  }
}
