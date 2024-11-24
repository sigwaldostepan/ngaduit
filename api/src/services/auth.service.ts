import { Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { LoginBodySchema, RegisterBodySchema } from "../schemas/auth";
import { ErrorResponse } from "../utils/responses";
import * as bcrypt from "bcrypt";

export class AuthService {
  constructor(private UserRepository: UserRepository) {
    this.UserRepository = UserRepository;
  }

  register = async (payload: RegisterBodySchema) => {
    const emailUsed = await this.UserRepository.getByEmail(payload.email);

    if (emailUsed) {
      throw new ErrorResponse("Email udah kepake nich", 409);
    }

    const hashedPassword = await bcrypt.hash(payload.password, 8);

    const user = await this.UserRepository.add({
      email: payload.email,
      name: payload.name,
      password: hashedPassword,
    });

    return user;
  };

  login = async (payload: LoginBodySchema) => {
    const data = await this.UserRepository.getByEmailIncludePassword(
      payload.email
    );

    if (!data) {
      throw new ErrorResponse("Ini email siapa njir, ga terdaftar 😩", 404);
    }

    const correctPassword = await bcrypt.compare(
      payload.password,
      data.password
    );
    if (!correctPassword) {
      throw new ErrorResponse("Passwordnya salah wak", 401);
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      transactions: data.transactions,
      account: data.transactions,
    };
  };
}
