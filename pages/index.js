import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import BoxComentarios from '../src/components/BoxComentarios'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`} >
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function AlurakutMenuProfileSidebar({ githubUser }) {
  return (
    <div className="alurakutMenuProfileSidebar">
      <div>
        <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
        <hr />
        <p>
          <a className="boxLink" href={`/user/${githubUser}`}>
            @{githubUser}
          </a>
        </p>
        <hr />

        <AlurakutProfileSidebarMenuDefault />
      </div>
    </div>
  )
}

function ProfileRelationsBox(propriedades) { // Nesse caso com as propriedades é obrigatório setar o que vocêr quer mostrar no caso itemAtual.AlgumaCoisa
  return (
    <ProfileRelationsBoxWrapper> {/* Box dos Seguidores */}
      <h2 className="smallTitle">{propriedades.title} ({propriedades.items.length})
      </h2>
      <ul key="ulComunidades">
        {propriedades.items.slice(0, 6).map((itemAtual) => {
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

export default function Home() {
  const usuarioAleatorio = 'luizfelper'
  const [comunidades, setComunidades] = React.useState([]);
  const pessoasFavoritas = ['enioluciano', 'omariosouto', 'rafaballerini', 'marcobrunodev', 'luizfelper', 'doutoramon'];
  const [comentariosTotais, setComentarios] = React.useState([]);

  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function () {
    //Aqui faz um GET pro GitHub
    fetch('https://api.github.com/users/luizfelper/followers')
      .then(function (respostaDoGitHub) { //Recebe resposta Do GitHub mas em Chunks.
        return respostaDoGitHub.json(); //Transforma a resposta em Json.
      })
      .then(function (respotaCompletaDoGit) { //Com a resposta completa imprime no console.
        setSeguidores(respotaCompletaDoGit);
      })

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
        allComments {
          id,
          nome,
          comentario
        }
      }`})
    })
      .then((resposta) => resposta.json()) //Pega o retorno do resposta.json e já retorna
      .then(function (respostaCompleta) {
        const comunidadesVindaDoDato = respostaCompleta.data.allCommunities;
        const comentariosVindoDoDato = respostaCompleta.data.allComments;
        setComunidades(comunidadesVindaDoDato);
        setComentarios(comentariosVindoDoDato);
      })

  }, [])

  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a), {usuarioAleatorio}!
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriarComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: usuarioAleatorio,
              }

              fetch('/api/comunidades', { //Dando um Fecth na api local onde a API local vai solicitar o DATOCSM
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
                .then(async function (response) {
                  const dados = await response.json();
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade]
                  setComunidades(comunidadesAtualizadas);
                })
            }}>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>

          <Box>
            <h2 className="subTitle">Enviar Comentário</h2>
            <form onSubmit={function handleCriarComunidade(e) {
              e.preventDefault();
              const dadosComentarios = new FormData(e.target);

              const comentarios = {
                nome: dadosComentarios.get('user'),
                comentario: dadosComentarios.get('comment'),
                creatorSlug: usuarioAleatorio,
              }

              fetch('/api/comentarios', { //Dando um Fecth na api local onde a API local vai solicitar o DATOCSM
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comentarios)
              })
                .then(async function (response) {
                  const dados = await response.json();
                  const comentarios = dados.registroCriado;
                  const comentariosAtualizados = [...comentariosTotais, comentarios]
                  setComentarios(comentariosAtualizados);
                })
            }}>
              <div />
              <div>
                <input placeholder="Usuario do Github"
                  name="user"
                  aria-label="Usuario do Github"
                  type="text"
                />
              </div>
              <div />
              <div>
                <input id="inputComentario"
                  placeholder="Comentário..."
                  name="comment"
                  aria-label="Comentário..."
                  type="text"
                  maxLength="50"
                />
              </div>
              <button>Adicionar comentário</button>
            </form>
          </Box>

          <BoxComentarios> {/* Box dos Comentários */}
            <h2 className="smallTitle">Comentários ({comentariosTotais.length})</h2>
            <ul key="pComentários">
              {comentariosTotais.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <div className="avatar">
                      <a href={`https://github.com/${itemAtual.nome}`} key={itemAtual.nome}>
                        <img src={`https://github.com/${itemAtual.nome}.png`} />
                      </a>
                    </div>
                    <div className="dados--comentarios">
                      <a href={`https://github.com/${itemAtual.nome}`} key={itemAtual.nome}><p>@{itemAtual.nome}</p></a>
                      <span>{itemAtual.comentario}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </BoxComentarios>
        </div>


        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBox title="Seguidores" items={seguidores} />

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

          <ProfileRelationsBoxWrapper> {/* Box das Pessoas Favoritas */}
            <h2 className="smallTitle">Pessoas Favoritas ({pessoasFavoritas.length})</h2>
            <ul key="ulGaleraComunidade">
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}