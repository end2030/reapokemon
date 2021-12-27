import styled from "@emotion/styled"
import React, { Component } from "react"
import { Link } from "react-router-dom"
class PokemonDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            order: '',
            name: '',
            weight: '',
            base_experience: '',
            sprites: []
        }


    }
    componentDidMount = () => {
        let id = window.location.pathname.split('/')
        fetch(`https://pokeapi.co/api/v2/pokemon/${id[id.length - 1]}`)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    id: res.id,
                    order: res.order,
                    name: res.name,
                    weight: res.weight,
                    base_experience: res.base_experience,
                    sprites: res.sprites
                })
            });
    }
    render() {

        const { id } = this.state
        const { order } = this.state
        const { name } = this.state
        const { weight } = this.state
        const { base_experience } = this.state
        const { sprites } = this.state
        const Li = styled.li`
        padding: 5px;
        background-color: #e1e4e2;
        margin-top:3px;
        font-size: 24px;
        border-radius: 7px;
        color: black;
        list-style: none;
        font-weight: bold;
        &:hover {
            color: red;
        }
        `
        const Ul = styled.ul
            `background-color:#20ce7d;
        padding: 0px
        `

        return (
            <>
                <div style={{
                    textAlign: 'center'
                }}>
                    <h1>Detail</h1>
                    <Link to="/" ><button>Back List</button></Link>
                    <button>catch the Pokemon</button>
                </div>
                <ul>
                    <li>Id : {id}</li>
                    <li>Name : {name}</li>
                    <li>Order : {order}</li>
                    <li>Weight : {weight}</li>
                    <li>Base Experience : {base_experience}</li>
                    <li> <h4>Sprites</h4>
                        <Ul>
                            <Li>
                                <label>Back Default</label>
                                <img src={sprites.back_default} width="150px" alt="back_default" />
                            </Li>
                            <Li>
                                <label>Back Shiny</label>
                                <img src={sprites.back_shiny} width="150px" alt="back_shiny" />
                            </Li>
                            <Li>
                                <label>Front Default</label>
                                <img src={sprites.front_default} width="150px" alt="front_default" />
                            </Li>
                            <Li>
                                <label>Front Shiny</label>
                                <img src={sprites.front_shiny} width="150px" alt="front_shiny" />
                            </Li>
                        </Ul>
                    </li>
                </ul>
            </>
        )
    }
}
export default PokemonDetail;