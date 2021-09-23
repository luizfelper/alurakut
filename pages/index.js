import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
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


export default function Home() {
  const usuarioAleatorio = 'luizfelper'
  const [comunidades, setComunidades] = React.useState([{
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const pessoasFavoritas = ['juunegreiros','omariosouto','rafaballerini','marcobrunodev','luizfelper','felipefialho'];
  const [comentariosTotais, setComentarios] = React.useState([{
    usuario: 'luizfelper',
    comentario: 'Isso é um comentário'
  }]);

  return (
    <>
    <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
        <ProfileSideBar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
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
              image: dadosDoForm.get('image')
            }
            
            const comunidadesAtualizadas = [...comunidades, comunidade]
            setComunidades(comunidadesAtualizadas);
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
              usuario: dadosComentarios.get('user'),
              comentario: dadosComentarios.get('comment')
            }
            
            const comentariosAtualizados = [...comentarios, comentarios]
            setComentarios(comentariosAtualizados);
            console.log(comentariosAtualizados);
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
              <input placeholder="Comentário..."
              name="comment"
              aria-label="Comentário..."
              type="text"
              />
            </div>
            <button>Adicionar comentário</button>
          </form>
        </Box>

        <Box> {/* Box dos Comentários */}
          <h2 className="smallTitle">Comentários ({comentariosTotais.length})</h2>
          <div key="pComentários">
            {comentariosTotais.map((itemAtual) => {
              return (
                <div>
                  <p>Usuario: {itemAtual.usuario}</p>
                  <p>Comentário: {itemAtual.comentario}</p>
                </div>
              )
            })}
          </div>
        </Box>


        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>


        <ProfileRelationsBoxWrapper> {/* Box das comunidades */}
          <h2 className="smallTitle">
                Comunidades ({comunidades.length})
          </h2>
          <ul key="ulComunidades">
                {comunidades.map((itemAtual) => {
                  return (
                    <li>
                      <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                          <img src={itemAtual.image} />
                          <span>{itemAtual.title}</span>
                      </a>
                    </li>
                  )
                })}
          </ul>
        </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas Favoritas ({pessoasFavoritas.length})
            </h2>
            <ul key="ulGaleraComunidade">
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          {/* <ProfileRelationsBoxWrapper /> */}
        </div>
      </MainGrid>
    </>
  )}