import { PagesContext } from "../../../context/PagesContext";
import { useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";

export default function ListagemProntuarios() {
  const { PageSetCurrentPage } = useContext(PagesContext);
  const navigate = useLocation();
  const pathName = navigate.pathname;

  useEffect (() => {
    PageSetCurrentPage(pathName);
    console.log(pathName);
  },[]);
    return(
        <>
        <h1>ListagemProntuarios</h1>
        </>
    )
}