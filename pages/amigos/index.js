import React from 'react';
import { ProfileRelationsBoxWrapper } from '/src/components/ProfileRelations';


function ProfileRelationsBox(propriedades) { // Nesse caso com as propriedades é obrigatório setar o que vocêr quer mostrar no caso itemAtual.AlgumaCoisa
    return (
      <ProfileRelationsBoxWrapper> {/* Box dos Seguidores */}
        <h2 className="smallTitle">{propriedades.title} ({propriedades.items.length})
        </h2>
        <ul key="ulComunidades">
          {propriedades.items.map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
                <a href={itemAtual.html_url}>
                  <img src={itemAtual.avatar_url} />
                  <span>{itemAtual.login}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <p>
          <a className="boxLink" href={`/amigos`}>
            Ver todos
          </a>
        </p>
      </ProfileRelationsBoxWrapper>
    )
  }


export default function Amigos() {

    const [seguidores, setSeguidores] = React.useState([]);
    React.useEffect(function() {
      //Aqui faz um GET pro GitHub
      fetch('https://api.github.com/users/luizfelper/followers')
      .then(function (respostaDoGitHub) { //Recebe resposta Do GitHub mas em Chunks.
        return respostaDoGitHub.json(); //Transforma a resposta em Json.
      })
      .then(function (respotaCompletaDoGit) { //Com a resposta completa imprime no console.
        setSeguidores(respotaCompletaDoGit);
      })
    },[])

    return (
        <div>
            <ProfileRelationsBox title="Seguidores" items={seguidores}/>
        </div>
    )
}
