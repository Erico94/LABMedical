
const Url_api = 'http://localhost:3000';

export async function login (email,senha){
    const response = await fetch (`${Url_api}/usuarios`);
    const usuarios = await response.json();
    const usuario = usuarios.find(usuario=>usuario.email===email && usuario.senha===senha);
    
    return usuario;
}

export async function verificaSeHaCadastro (email){
    const response = await fetch (`${Url_api}/usuarios`);
    const usuarios = await response.json();
    const usuario = usuarios.find(usuario=>usuario.email===email);
    
    return usuario;
}