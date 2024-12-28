import React from "react";

const SECURITY_CODE = 'paradigma'

const initialState = {
    error: false,
    loading: false,
    value: '',
    deleted: false,
    confirmed: false
}

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state
    }
}

const actionTypes = {
    confirm: 'CONFIRM',
    write: 'WRITE',
    error: 'ERROR',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET'
}

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false
    },
    [actionTypes.check]: {
        ...state,
        loading: true
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true
    },
    [actionTypes.reset]: {
        ...state,
        deleted: false,
        confirmed: false,
        value: ''
    }
})

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    React.useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    dispatch({ type: actionTypes.confirm })
                } else {
                    dispatch({ type: actionTypes.error })
                }
            }, 3000)
        }
    }, [state.loading])

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Escribe el código de seguridad</p>
                {(state.error && !state.loading) && (
                    <p>Error: Código Incorrecto</p>
                )}
                {state.loading && (
                    <p>Cargando...</p>
                )}
                <input
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={(event) => dispatch({ type: actionTypes.write, payload: event.target.value })}
                />
                <button onClick={() => dispatch({ type: actionTypes.check })} >Comprobar</button>
            </div>
        )
    } else if (!state.deleted && state.confirmed) {
        return (
            <React.Fragment>
                <p>Confirmar acción</p>
                <button onClick={() => dispatch({ type: actionTypes.delete })}>
                    Si
                </button>
                <button onClick={() => dispatch({ type: actionTypes.reset })}>
                    No
                </button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button onClick={() => dispatch({ type: actionTypes.reset })}>
                    Volver atrás
                </button>
            </React.Fragment>
        )
    }
}

export { UseReducer }