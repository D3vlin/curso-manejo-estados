import React from "react"
import { Loading } from "../Loading/Loading"

const SECURITY_CODE = 'paradigma'

class ClassState extends React.Component {
    constructor() {
        super()
        this.state = {
            error: false,
            loading: false,
            value: ''
        }
    }

    // UNSAFE_componentWillMount -> Se va a renderizar
    // componentDidMount  -> Se ha renderizado
    // componentDidUpdate -> Se ha actualizado
    // componentWillUnmount -> Va a desaparecer

    componentDidUpdate() {
        if (this.state.loading) {
            setTimeout(() => {
                this.setState({ 
                    error: this.state.value !== SECURITY_CODE,
                    loading: false
                })
            }, 3000)
        }
    }

    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Escribe el código de seguridad</p>
                {(this.state.error && !this.state.loading) && (
                    <p>Error: Código Incorrecto</p>
                )}
                {this.state.loading && (
                    <Loading />
                )}
                <input
                    placeholder="Código de seguridad"
                    value={this.state.value}
                    onChange={(event) => { this.setState({ value: event.target.value }) }}
                />
                <button onClick={() => this.setState({ loading: true })}>Comprobar</button>
            </div>
        )
    }
}

export { ClassState }