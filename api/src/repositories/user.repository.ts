import { db } from "../lib/db";

const selectOptions = {
  id: true,
  email: true,
  name: true,
  transactions: true,
  accounts: true,
};

export class UserRepository {
  add = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const user = await db.user.create({
      data: { name, email, password },
      select: { ...selectOptions },
    });

    return user;
  };

  getById = async (id: string) => {
    const user = await db.user.findUnique({
      where: { id },
      select: { ...selectOptions },
    });

    return user;
  };

  getByEmail = async (email: string) => {
    const user = await db.user.findUnique({
      where: { email },
      select: { ...selectOptions },
    });

    return user;
  };

  getByEmailIncludePassword = async (email: string) => {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        ...selectOptions,
        password: true,
      },
    });

    return user;
  };
}
