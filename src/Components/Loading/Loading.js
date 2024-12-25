import React from "react";

class Loading extends React.Component {
    // UNSAFE_componentWillMount -> Se va a renderizar
    // componentDidMount  -> Se ha renderizado
    // componentWillUnmount -> Va a desaparecer

    render() {
        return (
            <p>Cargando...</p>
        )
    }
}

export { Loading }