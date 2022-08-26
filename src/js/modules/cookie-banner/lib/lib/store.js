export const createStore = () => {
    //shared centralised validator state
    let state = {};
    
    //state getter
    const getState = () => state;

    /**
     * Create next state by invoking reducer on current state
     *
     * Execute side effects of state update, as passed in the update
     *
     * @param reducer [Function] 
     * @param nextState [Object] New slice of state to combine with current state to create next state
     * @param effects [Array] Array of side effect functions to invoke after state update (DOM, operations, cmds...)
     */
    const update = (reducer, nextState, effects) => {
        state =  reducer(state, nextState);
        // console.log(state);
        if (!effects) return;
        effects.forEach(effect => effect(state));
    };

    return { update, getState };
};