import styled from "@emotion/styled"
import React from "react"
import { Link } from "react-router-dom"
import { Component } from "react/cjs/react.production.min"
import logo from "../logo.svg"

class PokemonList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataPokemon: [],
            dataList: []
        }
    }

    componentDidMount = () => {
        const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
          pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            status
            message
            results {
              url
              name
              image
            }
          }
        }`;

        const gqlVariables = {
            limit: 15,
            offset: 0,
        };
        fetch('https://graphql-pokeapi.graphcdn.app/', {
            credentials: 'omit',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: gqlQuery,
                variables: gqlVariables,
            }),
            method: 'POST',
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    dataPokemon: res.data.pokemons,
                    dataList: res.data.pokemons.results
                })
            });
    }
    render() {
        const Li = styled.li`
        padding: 5px;
        background-color: #100e0e;
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
        const H2 = styled.h2`
       text-align: -webkit-center
       `
        const Img = styled.img`
       width:70px;
       `
        const id = (ids) => {
            let arr = ids.split('/')
            return arr[arr.length - 2]
        }
        const handleList = (next) => {
            fetch(next)
                .then((res) => res.json())
                .then((res) => {
                    this.setState({
                        dataPokemon: res,
                        dataList: res.results
                    })
                })

        }
        const titleCase = (str)=>{
            return str
                .split(' ')
                .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        }
        return (
            <div id="list">
                <H2>POKEMON LIST</H2>
                <div style={{
                    textAlign:'center'
                }}>
                    <div id="count">Count : {this.state.dataPokemon.count}</div>
                    <div id="next" style={{
                        display: 'inline-flex',
                        textDecoration: 'none',
                        color: '#fff'
                    }} >
                        <button onClick={() => handleList(this.state.dataPokemon.next)}> Next List</button>
                    </div>
                </div>
                <Ul>
                    {
                        this.state.dataList.map((res) => {
                            return (
                                <Li key={id(res.url)}  >
                                    <Link to={{
                                        pathname: `/detail/${id(res.url)}`
                                    }} >
                                        <Img src={res.image != null ? res.image: logo } width="50px" />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                padding:' 17px 15px',
                                                display: 'inline-flex',
                                                textDecoration: 'none',
                                                color: '#fff'
                                            }}
                                        >
                                            {titleCase(res.name)}
                                        </div>
                                    </Link>
                                </Li>
                            )
                        })
                    }
                </Ul>
            </div>
        )
    }
}
export default PokemonList;