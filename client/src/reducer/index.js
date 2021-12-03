const initialState = {
    dogs: [],
    allDogs: [], //estado que siempre mantiene todas las rzas de perros
    temperaments: [],
    dogsDetails: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        
        case 'GET_DOGS': 
        //ordeno los perros segun su nombre porq sino trae primero los creados y despues los de la API ordenados
            const dogsOrder = action.payload.sort((a, b) => {
                if (a.name < b.name) { //si se retorna un numero negativo, ordena de menor a mayor
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0; //si retorna 0, no se ordena
            })
            return {
                ...state,
                dogs: dogsOrder,
                allDogs: action.payload
            }
            case 'GET_DOGS_NAME':
            return {
                ...state,
                dogs: action.payload,
                
            }
        case 'GET_TEMPERAMENTS': 
            const temperamentByName = action.payload.map(el => el.name)
            //console.log(temperamentByName)
           // console.log(action.payload)
            return {
                ...state,
                temperaments: temperamentByName
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


        case 'FILTER_DOGS_BY_CREATED':
            const allDogsAPI = state.allDogs
            const createdDogs = action.payload === 'created' ? allDogsAPI.filter(dog => dog.createInBd) : allDogsAPI.filter( dog => !dog.createInBd)
            return {
                ...state,
                dogs: action.payload === 'all' ? allDogsAPI : createdDogs
            }
        case 'FILTER_DOGS_BY_TEMPERAMENT':
                const allDoguies = state.allDogs
                //console.log(action.payload)
                //console.log(allDoguies)
                const tempDogs = action.payload === 'sinFiltro'? allDoguies : allDoguies.filter(dog => dog.temperament?.includes(action.payload) || dog.temperaments?.includes(action.payload)) 
                return {
                    ...state,
                    dogs:  tempDogs
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
        const allDogsFilter = state.allDogs.filter(dog => dog.weight_min !== null)
        const sortWeightMin = action.payload === 'asc'?

        allDogsFilter.sort((a, b) => {
            if (a.weight_min < b.weight_min) return -1;
            if (a.weight_min > b.weight_min) return 1;
            return 0;
        }):
        allDogsFilter.sort((a, b) => {
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

