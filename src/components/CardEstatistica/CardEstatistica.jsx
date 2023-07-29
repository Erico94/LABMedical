export default function CardEstatistica(props){
    const imagem = props.imagem;
    const quantidade = props.quantidade;
    const nome = props.nome;
    return (
        <>
        <div className="col-3  border border-secondary-subtle rounded-3 py-3 mx-4">
            <div className="row d-flex justify-content-center">
                {imagem}
            </div>
            <div className="row d-flex justify-content-center fw-bold fs-2">
                {quantidade}
            </div>
            <div className="row d-flex justify-content-center fw-bold fs-3">
                {nome}
            </div>
        </div>
        </>
    )
}