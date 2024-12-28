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

const reducerObject = (state, payload) => ({
    'CONFIRM': {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    'WRITE': {
        ...state,
        value: payload
    },
    'ERROR': {
        ...state,
        error: true,
        loading: false
    },
    'CHECK': {
        ...state,
        loading: true
    },
    'DELETE': {
        ...state,
        deleted: true
    },
    'RESET': {
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
                    dispatch({ type: 'CONFIRM' })
                } else {
                    dispatch({ type: 'ERROR' })
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
                    onChange={(event) => dispatch({ type: 'WRITE', payload: event.target.value })}
                />
                <button onClick={() => dispatch({ type: 'CHECK' })} >Comprobar</button>
            </div>
        )
    } else if (!state.deleted && state.confirmed) {
        return (
            <React.Fragment>
                <p>Confirmar acción</p>
                <button onClick={() => dispatch({ type: 'DELETE' })}>
                    Si
                </button>
                <button onClick={() => dispatch({ type: 'RESET' })}>
                    No
                </button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button onClick={() => dispatch({ type: 'RESET' })}>
                    Volver atrás
                </button>
            </React.Fragment>
        )
    }
}

export { UseReducer }