import React from 'react';
import { ProfileRelationsBoxWrapper } from '/src/components/ProfileRelations';

export default function Comunidades() {

    const [comunidades, setComunidades] = React.useState([]);
    React.useEffect(function() {
      //Aqui faz um GET pro GitHub
     // API GraphQL - Aqui faz um POST pro DATO com pedido de informações no body
    fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': 'e945a0b1d22509980db5af89d719e2',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "query": `query {
          allCommunities {
            id,
            title,
            imageUrl,
            creatorSlug,
          }
        }`})
      })
        .then((resposta) => resposta.json()) //Pega o retorno do resposta.json e já retorna
        .then(function (respostaCompleta) {
          const comunidadesVindaDoDato = respostaCompleta.data.allCommunities;
          setComunidades(comunidadesVindaDoDato);
        })
  
    },[])

    return (
        <ProfileRelationsBoxWrapper> {/* Box das comunidades */}
        <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
        <ul key="ulComunidades">
          {comunidades.slice(0, 6).map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
                <a href={`/comunidades/${itemAtual.id}`}>
                  <img src={itemAtual.imageUrl} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
            )
          })}
        </ul>
        <p>
          <a className="boxLink" href={`/comunidades`}>
            Ver todos
          </a>
        </p>
      </ProfileRelationsBoxWrapper>
    )
}
