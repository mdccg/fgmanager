import api from '../../services/api';

var camposCadastro = [
    {
        name: 'nome',
        type: 'text',
        required: true
    },
    {
        name: 'marca',
        type: 'text',
        required: true
    },
    {
        name: "modelo",
        type: "autocomplete",
        descricao: "Escolha um modelo",
        required: true,
        options: [],
        addToList: true,
        request: (modelo) => {
            return api.post('/estoque/modelo/novo', {"nome": modelo})
        },
        loading: true
    },
    {
        name: 'codigo',
        type: 'text',
        required: true
    },
    {
        name: 'smartCard',
        type: 'text',
        required: true
    }
]

var columns = [
    {
        label: 'Código',
        field: 'codigo',
        sort: 'asc',
        width: 100
    },
    {
        label: 'Nome',
        field: 'nome',
        sort: 'asc',
        width: 270
    },
    {
        label: 'Marca',
        field: 'marca',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Modelo',
        field: 'modelo',
        sort: 'asc',
        width: 200
    }
]

export const constants = {
    camposCadastro,
    columns
}

