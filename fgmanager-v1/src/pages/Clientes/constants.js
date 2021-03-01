var camposCadastro = [
    {
        name: "nome",
        type: "text",
        required: true
    },
    {
        name: "cpf",
        type: "text",
        required: true
    },
    {
        name: "rg",
        type: "text",
        required: true
    },

    {
        name: "telefone",
        type: "text",
        required: true
    },
    {
        name: "email",
        type: "email",
        required: true
    },
    {
        name: "endereco",
        camposDeEndereco: [
            {
                name: "rua",
                type: "text"
            },
            {
                name: "numero",
                type: "text"
            },
            {
                name: "bairro",
                type: "text"
            },
            {
                name: "cidade",
                type: "text"
            },
            {
                name: "cep",
                type: "text"
            },
            {
                name: "ponto.Referencia",
                type: "text"
            },
        ]
    }
]

var columns = [
    {
        label: '№ de CPF',
        field: 'cpf',
        sort: 'asc',
        width: 270
    },
    {
        label: 'Nome',
        field: 'nome',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Endereço eletrônico',
        field: 'email',
        sort: 'asc',
        width: 200
    },
    {
        label: 'Telefone',
        field: 'telefone',
        sort: 'asc',
        width: 100
    }
]

export const constants = {
    camposCadastro,
    columns
}

