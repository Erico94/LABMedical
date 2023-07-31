import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { login } from "../../service/web";
import { AuthContext } from "../../context/AuthContext";
import wepik from "../../../Imagens/wepik.png";

export default function FormularioLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { Authlogin } = useContext(AuthContext);
  const [errorLogin, setErrorLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setErrorLogin(false);
  }, [email, senha]);


  const esqueciSenha = () => {
    alert("Esta funcionalidade ainda está em desenvolvimento.");
  };

  const handleClick = () => {
    navigate("/cadastro-de-usuario");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(async() => {
      const usuario = await login(email, senha);
    if (!usuario) {
      setLoading(false)
      setErrorLogin(true);
      return;
    }
    Authlogin(usuario);
    navigate("/");
    }, 2000);

    
  };

  return (
    <>
      <div className="container w-100">
        <div className="row">
          <div className="col-6 ps-1 border-5 border-primary border-end">
            <img src={wepik} className=" rounded-1 w-80" />
          </div>

          <div className="col-6 text-center">
            <div className="row ps-5 mt-4">
              <p className="ps-5 fs-6">
                Ainda não possui conta?
                <button
                  className="fs-6 btn btn-primary ms-3 transition"
                  onClick={handleClick}
                >
                  Criar conta
                </button>
              </p>
            </div>

            <h2 className="text-start ps-4">Login</h2>
            <div className="container d-flex flex-column ms-3 justify-content-evenly border border-3 border-dark-subtle h-50 rounded-3">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-2 text-end">
                    <label htmlFor="email" className="text-start">
                      Email:
                    </label>
                  </div>
                  <div className="col-10">
                    <input
                      className="w-75 form-control"
                      autoFocus
                      required
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      name="email"
                      id="email"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-2 text-end">
                    <label htmlFor="senha">Senha:</label>
                  </div>
                  <div className="col-10">
                    <input
                    className="w-75 form-control"
                      required
                      type="password"
                      value={senha}
                      onChange={handleSenhaChange}
                      name="senha"
                      id="senha"
                    />
                  </div>
                </div>
                {errorLogin && <span>Email ou senha inválidos</span>}
                <div className="row w-100 px-5 mb-1 mt-5">
                  {loading ? <button class="btn btn-primary" type="button" disabled="">
      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span role="status">Loading...</span>
    </button> : <button type="submit" className="btn btn-primary transition">Entrar</button>}
                </div>
                <div className="row">
                <a
                className="cursor-pointer"
                  onClick={esqueciSenha}
                  style={{ color: "blue", fontSize: "12px" }}
                >
                  Esqueci minha senha
                </a>
              </div>
              </form>

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
