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

export default function Home() {
  const usuarioAleatorio = 'luizfelper'
  const [comunidades, setComunidades] = React.useState(['Eu odeio acordar cedo']);
  const pessoasFavoritas = ['juunegreiros','omariosouto','rafaballerini','marcobrunodev','luizfelper','felipefialho'];
  const [comentarios, setComentarios] = React.useState(['Este é um comentário']);

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
            
            const comunidadesAtualizadas = [...comunidades, 'Eu odeio acordar']
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
            
            const comentariosAtualizados = [...comentarios, 'Comentário']
            setComentarios(comentariosAtualizados);
            console.log(comentariosAtualizados)
          }}>
            <div />
            <div>
              <input placeholder="Comentário..."
              name="image"
              aria-label="Comentário..."
              type="text"
              />
            </div>
            <button>Adicionar comentário</button>
          </form>
        </Box>

        <Box> {/* Box dos Comentários */}
          <h2 className="smallTitle">Comentários ({comentarios.length})</h2>
          <div key="pComentários">
            {comentarios.map((itemAtual) => {
              return (
                <p>Comentário: {itemAtual}</p>
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
                      <a href={`/users/${itemAtual}`} key={itemAtual}>
                          <img src={`http://placehold.it/150x150`} />
                          <span>{itemAtual}</span>
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