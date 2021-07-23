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

function ProfileRelationsBox(propriedades){
  return (
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            {propriedades.title} ({propriedades.items.length})
          </h2>
        </ProfileRelationsBoxWrapper>
  )
}


export default function Home(props) {
  const usuarioAleatorio = props.githubUser; // props essa que está lá no final da página com o "Export Default"
  const [comunidades, setComunidades] = React.useState([]);
 /* const comunidades = ['Alurakut']; */
 /* const alteradorDeComunidade = comunidades[1]; */
  const pessoasFavoritas =['juunegreiros',
  'omariosouto',
  'rafaballerini',
  'marcobrunodev',
  'luizfelper',
  'felipefialho'];


  const [seguidores, setSeguidores] = React.useState([]);
  // 0 - Pegar o array de dados do github
    React.useEffect(function() {
      // GET
      fetch('https://api.github.com/users/omariosouto/followers')
        .then(function (respostaDoServidor) {
          return respostaDoServidor.json();
      })
        .then(function (respostaCompleta) {
          setSeguidores(respostaCompleta);
      })

      //API GraphQL
      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization' : 'e945a0b1d22509980db5af89d719e2',
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
        },
        body: JSON.stringify({ "query": `query {
          allCommunities {
            id,
            title,
            imageUrl,
            creatorSlug,
          }
        }` })
      })
      .then((response) => response.json()) // Pega o rtorno do response.json() e ja retorna o resultado (Idéia do Arrow Function)
      /* .then(function (response) {
        return response.json()
      }) */
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        /* console.log(comunidadesVindasDoDato) */
        setComunidades(comunidadesVindasDoDato)
      })

    }, [])


  return (
    <>
    <AlurakutMenu />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> Transforma a estilização mais dinâmica. Ex.: (#box {grid-area: profileArea;}) Fica: style={{ gridArea: 'profileArea'}} */} 
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
              imageUrl: dadosDoForm.get('image'),
              creatorSlug: githubUser,
            }

            fetch('/api/comunidades', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comunidade),
            })
            .then(async (response) => {
              const dados = await response.json();
              console.log(dados.registroCriado);
              const comunidade = dados.registroCriado;
              const comunidadesAtualizadas = [...comunidades, comunidade];
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


        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>

        <ProfileRelationsBox title="Seguidores" items={seguidores}></ProfileRelationsBox>

        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Galera da comunidade ({pessoasFavoritas.length})
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

          <ProfileRelationsBoxWrapper> {/* Box Comunidades */}
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                        <img src={itemAtual.imageUrl} />
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



export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  if (!cookies.USER_TOKEN) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((resposta) => resposta.json())

  // if(!isAuthenticated) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     }
  //   }
  // }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}