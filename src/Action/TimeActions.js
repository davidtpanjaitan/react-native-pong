
const newScore = (newTime) => (
    {
        type: 'NEW_SCORE',
        payload: newTime
    }
);

const clearHistory = () => (
    {
        type: 'CLEAR_HISTORY',
    }
)

export const actions = {
    newScore,
    clearHistory
};