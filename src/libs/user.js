// Importa la función necesaria de next-auth
import { getServerSession } from 'next-auth/server';

// Importa la configuración de autenticación
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Dentro de la función o componente donde quieras obtener la sesión del servidor
export async function getuser() {
    try {
        // Obtén la sesión del servidor utilizando getServerSession y las opciones de autenticación
        const session = await getServerSession(authOptions);

        // Muestra la sesión en la consola
        console.log('Sesión del servidor:', session);
    } catch (error) {
        console.error('Error al obtener la sesión del servidor:', error);
    }
}
