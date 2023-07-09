

const Url_api = 'http://localhost:3000';

export async function login(email, senha) {
    const response = await fetch(`${Url_api}/usuarios`);
    const usuarios = await response.json();
    const usuario = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);

    return usuario;
}

export async function verificaEmail(email) {
    const response = await fetch(`${Url_api}/usuarios`);
    const usuarios = await response.json();
    const usuario = usuarios.find(usuario => usuario.email === email);
    return usuario;
}

export async function verificaCrmUf(crmUf) {
  const response = await fetch(`${Url_api}/usuarios`);
  const usuarios = await response.json();
  const usuario = usuarios.find(usuario => usuario.crmUf === crmUf);
  return usuario;
}

export async function verificaCpf(cpf) {
  const response = await fetch(`${Url_api}/usuarios`);
  const usuarios = await response.json();
  const usuario = usuarios.find(usuario => usuario.cpf === cpf);
  return usuario;
}

export async function Post( data ) {
    const user = JSON.stringify(data);
    console.log(data);
    fetch(`${Url_api}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: user
    }).then(function (response) {
        if (response.ok) {
            console.log('Post criado com sucesso!');
        } else {
            console.log('Erro ao criar o post.');
        }
    })
        .catch(function (error) {
            console.log('Erro na solicitação:', error.message);
        });
}