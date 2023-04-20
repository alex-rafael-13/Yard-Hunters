//CONSTANTS
const SET_ALL = "event/SET_ALL"

//Action creators
const setEvents = (events) => {
    return{
        events,
        type: SET_ALL
    }
} 


//thunk actions
export const retrieveEvents = () => async dispatch => {
    const response = await fetch('/api/events', {
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(response.ok){
        const events = await response.json()
        if(events.errors) {
            return
        }

        dispatch(setEvents(events))
    }
}

//REDUCER 
const initialState = {events:[]}
export default function reducer(state=initialState, action){
    let newState = initialState
    switch (action.type){
        case SET_ALL:
            newState = {...state}
            newState['events'] = action.events
            return newState
        default:
            return state
    }
}

