import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new  UsuariosLista();

export const conectarCliente = ( cliente: Socket, io:socketIO.Server) =>{
    const usuario = new Usuario (cliente.id);
    usuariosConectados.agregar(usuario);


}


export const desconectar = (cliente: Socket, io: socketIO.Server) =>{
    cliente.on('disconnect', ()=>{
        console.log('Cliente Desconectado');

        usuariosConectados.borrarUsuario( cliente.id);
    
        io.emit('usuarios-activos', usuariosConectados.getLista() );
    });
}


export const mensaje = (cliente: Socket, io: socketIO.Server) =>
{
    cliente.on('mensaje', (payload: { de: string, cuerpo: string}) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
}

//Configurar Usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) =>
{
    cliente.on('configurar-usuario', (payload: { nombre: string}, callback: Function) => {

        usuariosConectados.actualizaNombre( cliente.id, payload.nombre);
        console.log('Configurando Usuario', payload);

        io.emit('usuarios-activos', usuariosConectados.getLista() );

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        })
    });
}