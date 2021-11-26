const initialState = {
    dogs: [],
    allDogs: [], //estado que siempre mantiene todas las rzas de perros
    temperaments: [],//estado de temperamentos
    dogsDetails: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS_NAME':
            return {
                ...state,
                dogs: action.payload,
                
            }
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case 'GET_TEMPERAMENTS': 
            return {
                ...state,
                temperaments: action.payload
            }
        case 'POST_DOGS':  //No se declara en actions, se declara en el reducer. en action solo se trae la ruta
            return {
                ...state,
            }

        case 'GET_DETAILS_DOG':
            return {
                ...state,
                dogsDetails: action.payload
            }


        case 'FILTER_DOGS_BY_USER':
            const allDogsAPI = state.allDogs
            const createdDogs = action.payload === 'created' ? allDogsAPI.filter(dog => dog.createInBd) : allDogsAPI.filter( dog => !dog.createInBd)
            return {
                ...state,
                dogs: action.payload === 'all' ? allDogsAPI : createdDogs
            }
        case 'ORDER_BY_NAME':
        const sortArr = action.payload === 'asc'?
        [...state.allDogs].sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        }):
        [...state.allDogs].sort((a, b) => {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
        })    
        return {
            ...state,
            dogs: sortArr
        }
        case 'ORDER_BY_WEIGHT':
        const sortWeightMin = action.payload === 'asc'?
        [...state.allDogs].sort((a, b) => {
            if (a.weight_min < b.weight_min) return -1;
            if (a.weight_min > b.weight_min) return 1;
            return 0;
        }):
        [...state.allDogs].sort((a, b) => {
            if (a.weight_min > b.weight_min) return -1;
            if (a.weight_min < b.weight_min) return 1;
            return 0;
        })    
        return {
            ...state,
            dogs: sortWeightMin
        }



        default:
            return { ...state };
    }
}

