import React from "react";

const SECURITY_CODE = 'paradigma'

function UseState({ name }) {
    const [state, setState] = React.useState({
        error: false,
        loading: false,
        value: '',
        deleted: false,
        confirmed: false
    })

    React.useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                setState({
                    ...state,
                    error: state.value !== SECURITY_CODE,
                    loading: false,
                    confirmed: true
                })
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
                    onChange={(event) => setState({ ...state, value: event.target.value })}
                />
                <button onClick={() => setState({ ...state, loading: true })} >Comprobar</button>
            </div>
        )
    } else if (!state.deleted && state.confirmed) {
        return (
            <React.Fragment>
                <p>Confirmar acción</p>
                <button onClick={() => setState({ ...state, deleted: true })}>
                    Si
                </button>
                <button onClick={() => setState({ ...state, confirmed: false, value: '' })}>
                    No
                </button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <button onClick={() => setState({ ...state, deleted: false, confirmed: false, value: '' })}>
                    Volver atrás
                </button>
            </React.Fragment>
        )
    }
}

export { UseState }