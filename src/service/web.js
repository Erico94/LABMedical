


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

export async function verificaCpf(ondVerificar,cpf) {
  const response = await fetch(`${Url_api}/${ondVerificar}`);
  const usuarios = await response.json();
  const usuario = usuarios.find(usuario => usuario.cpf === cpf);
  return usuario;
}

export async function Post( ondePostar,data ) {
    const dados = JSON.stringify(data);
    fetch(`${Url_api}/${ondePostar}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dados
    }).then(function (response) {
        if (response.ok) {
            alert("Solicitação bem sucedida.")
        } else {
            alert('Erro ao criar o post.');
        }
    })
        .catch(function (error) {
            alert('Erro na solicitação:', error.message);
        });
}

export async function filtrarPacientes(termoBuscado) {
    var getAll = [];
    const response = await fetch(`${Url_api}/pacientes`).then((data)=>data.json());
    response.map((item)=>{
        getAll.push(item);
    })
    const filtro = getAll.filter(item=>item.nome.toLocaleLowerCase().includes(termoBuscado.toLocaleLowerCase()));
    return filtro;
}

export async function GetAllExamesOuConsultas (ondeBuscar, id){
    var getAll= [];
    const response = await fetch(`${Url_api}/${ondeBuscar}`).then((data)=>data.json());
    response.map((item)=>{
        getAll.push(item)
    })
    const filtro = getAll.filter(
        (item) => item.idDoPaciente === id
      );
    return filtro;
}