/* import styled from 'styled-components' */
import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(propriedades) {
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`} />
        @{propriedades.githubUser}
        <a/>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}


export default function Home() {
  const githubUser = 'luizfelper';
  const [comunidades, setComunidades] = React.useState([{
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
  }]);
 /* const comunidades = ['Alurakut']; */
 /* const alteradorDeComunidade = comunidades[1]; */
  const pessoasFavoritas =['juunegreiros',
  'omariosouto',
  'rafaballerini',
  'marcobrunodev',
  'luizfelper',
  'felipefialho'];

  return (
    <>
    <AlurakutMenu />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> Transforma a estilização mais dinâmica. Ex.: (#box {grid-area: profileArea;}) Fica: style={{ gridArea: 'profileArea'}} */} 
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
        <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
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
              image: dadosDoForm.get('image'),
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


        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Galera da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
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

          <ProfileRelationsBoxWrapper> {/* Box Comunidades */}
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li>
                    <a href={`${itemAtual.title}`} key={itemAtual.title}>
                        <img src={`${itemAtual.image}`} />
                        <span>{itemAtual.title}</span>
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
