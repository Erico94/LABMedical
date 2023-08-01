
export async function buscaCep (cep) {
    return await fetch (`https://viacep.com.br/ws/${cep}/json/`).then((data)=>data.json()).catch(()=>'erro');
}