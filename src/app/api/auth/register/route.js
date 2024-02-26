import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import executeQuery from "@/libs/mysql";

export async function POST(request) {
  try {
    const data = await request.json();

    // Buscar usuario por DNI
    const userFoundByDNI = await executeQuery(
      'SELECT * FROM user WHERE DNI = ?',
      [data.DNI]
    );

    if (userFoundByDNI.length > 0) {
      return NextResponse.json(
        {
          message: "DNI already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Buscar usuario por nombre de usuario
    const userFoundByUsername = await executeQuery(
      'SELECT * FROM user WHERE username = ?',
      [data.username]
    );

    if (userFoundByUsername.length > 0) {
      return NextResponse.json(
        {
          message: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crear nuevo usuario
    const newUser = await executeQuery(
      'INSERT INTO user (username, DNI, password) VALUES (?, ?, ?)',
      [data.username, data.DNI, hashedPassword]
    );

    // Otra lógica según sea necesario

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
