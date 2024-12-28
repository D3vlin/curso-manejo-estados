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

    const onConfirm = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true
        })
    }

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false,
        })
    }

    const onWrite = (newValue) => {
        setState({ ...state, value: newValue })
    }

    const onCheck = () => {
        setState({ ...state, loading: true })
    }

    const onDelete = () => {
        setState({ ...state, deleted: true })
    }
    const onReset = () => {
        setState({ ...state, deleted: false, confirmed: false, value: '' })
    }

    React.useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    onConfirm()
                } else {
                    onError()
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
                    onChange={(event) => onWrite(event.target.value)}
                />
                <button onClick={() => onCheck()} >Comprobar</button>
            </div>
        )
    } else if (!state.deleted && state.confirmed) {
        return (
            <React.Fragment>
                <p>Confirmar acción</p>
                <button onClick={() => onDelete()}>
                    Si
                </button>
                <button onClick={() => onReset()}>
                    No
                </button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button onClick={() => onReset()}>
                    Volver atrás
                </button>
            </React.Fragment>
        )
    }
}

export { UseState }