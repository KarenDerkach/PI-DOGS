const initialState = {
    dogs: [],
    allDogs: [], //estado que siempre mantiene todas las rzas de perros
    temperaments: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case 'GET_TEMPERAMENTS': 
            return {
                ...state,
                dogs: action.payload
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
        const sortWeight = action.payload === 'asc'?
        [...state.allDogs].sort((a, b) => {
            if (a.weight < b.weight) return -1;
            if (a.weight > b.weight) return 1;
            return 0;
        }):
        [...state.allDogs].sort((a, b) => {
            if (a.weight > b.weight) return -1;
            if (a.weight < b.weight) return 1;
            return 0;
        })    
        return {
            ...state,
            dogs: sortWeight
        }


        default:
            return { ...state };
    }
}

