var camposCadastro = [
    {
        name: "nome",
        type: "text",
        required: true
    },
    {
        name: "senha",
        type: "password",
        required: true
    },
    {
        name: "confirmar.Senha",
        type: "password",
        required: true
    },
    {
        name: "tipo",
        type: "select",
        descricao: "Escolha o tipo de funcionário",
        required: true,
        options: ["almoxarife", "técnico"]
    },
    {
        name: "cpf",
        type: "text",
        required: true
    },
    {
        name: "telefone",
        type: "text",
        required: false
    },
    {
        name: "email",
        type: "email",
        required: true
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

