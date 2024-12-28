import React from "react";

const SECURITY_CODE = 'paradigma'

function UseState({ name }) {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState("");

    React.useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setError(value !== SECURITY_CODE)
                setLoading(false)
            }, 3000)
        }
    }, [loading])

    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Escribe el código de seguridad</p>
            {(error && !loading) && (
                <p>Error: Código Incorrecto</p>
            )}
            {loading && (
                <p>Cargando...</p>
            )}
            <input
                placeholder="Código de seguridad"
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
            <button onClick={() => setLoading(true)} >Comprobar</button>
        </div>
    )
}

export { UseState }