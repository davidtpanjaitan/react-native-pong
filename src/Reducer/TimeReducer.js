
const initState = {
    bestTime: 0,
    timeHistory: []
}

let nextKey = 0;
export const TimeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'NEW_SCORE':
            const newstate = {};
            newstate.bestTime = action.payload > state.bestTime ? action.payload : state.bestTime;
            newstate.timeHistory = [{
                key: (Date.now()).toString(),
                time: action.payload,
                datetime: Date.now()
            }, ...state.timeHistory];
            return newstate;
        case 'CLEAR_HISTORY':
            return {
                bestTime: 0,
                timeHistory: []
            };
        default:
            return state;
    }
}