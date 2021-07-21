import {SiteClient} from 'datocms-client';

export default async function recebedorDeRequest(request, response) {

    if(request.method === 'POST') {
        const TOKEN = '19bff7332c6d411b806af4140833a7';
        const client = SiteClient(TOKEN);
    
        // É importante validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "990186", // ID do Model de Comunities criado pelo Dato
            ...request.body,
/*          title: "Comunidade de teste",
            imageUrl: "https://github.com/omariosouto.png",
            creatorSlug: "oMario Souto",*/
        })
    
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
            return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!',
    })
}