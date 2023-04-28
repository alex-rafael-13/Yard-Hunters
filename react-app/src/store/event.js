/*****                      CONSTANTS                           */
const SET_ALL = "events/SET_ALL"
const SET_ONE = "events/SET_ONE"
const RESET_SINGLE = "events/RESET"
const SET_CURRENT = "events/CURRENT"


/*****                      ACTION CREATORS                        */
const setEvents = (events) => {
    return{
        events,
        type: SET_ALL
    }
} 

const setEvent = (event) => {
    return{
        event,
        type: SET_ONE
    }
}

const setUserEvents = (events) => {
    return{
        events,
        type: SET_CURRENT
    }
}

export const resetSingle = () => {
    return{
        type: RESET_SINGLE
    }
}


/*****                       THUNK ACTIONS                       */
//GET all events
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

//GET event by id
export const retrieveEventById = (id) => async dispatch => {
    const response = await fetch(`/api/events/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(response.ok){
        const event = await response.json()
        if(event.errors) {
            return
        }

        dispatch(setEvent(event))
    }
}

//GET events of current user
export const retrieveUserEvents = () => async dispatch => {
    const response = await fetch(`/api/events/current`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    if(response.ok){
        const events = await response.json()
        if(events.errors) {
            return
        }

        dispatch(setUserEvents(events))
    }
}

export const createEvent = event => async dispatch => {
    const response = await fetch('/api/events/new',{
        method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(event)
    })

    const newEvent = await response.json()
    return newEvent
} 

export const updateEvent = (id, event) => async dispatch => {
    const response = await fetch(`/api/events/${id}/manage`,{
        method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(event)
    })
    console.log(response)
    const newEvent = await response.json()
    console.log(newEvent)
    return newEvent
} 

//Delete Event
export const deleteEvent = (id) => async dispatch => {
    const response = await fetch(`/api/events/${id}/manage`, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    });

    const data = await response.json()

    return data
}


/*****                      REDUCER                             */
const initialState = {events:[], event:{}, userEvents: []}
export default function reducer(state=initialState, action){
    let newState = initialState
    switch (action.type){
        case SET_ALL:
            newState = {...state}
            newState['events'] = action.events
            return newState
        case SET_ONE:
            newState = {...state}
            newState['event'] = action.event
            return newState
        case SET_CURRENT:
            newState = {...state}
            newState['userEvents'] = action.events
            return newState
        case RESET_SINGLE:
            newState = {...state}
            newState['event'] = initialState.event
            return newState
        default:
            return state
    }
}

