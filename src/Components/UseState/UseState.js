import React from "react";

const SECURITY_CODE = 'paradigma'

function UseState({ name }) {
    const [state, setState] = React.useState({
        error: false,
        loading: false,
        value: ''
    })

    React.useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                setState({
                    ...state,
                    error: state.value !== SECURITY_CODE,
                    loading: false
                })
            }, 3000)
        }
    }, [state.loading])

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
                onChange={(event) => setState({...state, value: event.target.value})}
            />
            <button onClick={() => setState({...state, loading: true})} >Comprobar</button>
        </div>
    )
}

export { UseState }