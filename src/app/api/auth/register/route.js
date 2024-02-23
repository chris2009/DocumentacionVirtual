// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import executeQuery from "@/libs/mysql";

// export async function POST(request) {
//   try {
//     const data = await request.json();

//     const userFound = await executeQuery.user.findUnique({
//       where: {
//         email: data.email,
//       },
//     });

//     if (userFound) {
//       return NextResponse.json(
//         {
//           message: "Email already exists",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     const usernameFound = await executeQuery.user.findUnique({
//       where: {
//         username: data.username,
//       },
//     });

//     if (usernameFound) {
//       return NextResponse.json(
//         {
//           message: "username already exists",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(data.password, 10);
//     const newUser = await executeQuery.user.create({
//       data: {
//         username: data.username,
//         email: data.email,
//         password: hashedPassword,
//       },
//     });

//     const { password: _, ...user } = newUser;

//     return NextResponse.json(user);
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: error.message,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import executeQuery from "@/libs/mysql";

export async function POST(request) {
  try {
    const data = await request.json();

    // Buscar usuario por email
    const userFoundByEmail = await executeQuery(
      'SELECT * FROM user WHERE email = ?',
      [data.email]
    );

    if (userFoundByEmail.length > 0) {
      return NextResponse.json(
        {
          message: "Email already exists",
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
      'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
      [data.username, data.email, hashedPassword]
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
