import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from "axios";

const FindUserAdmin = (props) => {

    const onSubmitID = async  e => {   
        e.preventDefault()
        const url = '/api/getUser'
        const result = await axios.post(url, props.id)
        if (result.data.message !== null) {
            props.changeData(result.data.message)
            props.ChangeType('persona')
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'El usuario no está registrado',
                showConfirmButton: false,
                timer: 1500
            })
        }
    } 

    const onSubmitRUC = async e => {
        e.preventDefault()
        const url = '/api/getBusiness'
        const result = await axios.post(url, props.RUC)
        if (result.data.message !== null) {
            props.changeData(result.data.message)
            props.ChangeType('empresa')
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'La empresa no está registrada',
                showConfirmButton: false,
                timer: 1500
            })
        }
    } 

    return (
        <section>

            <form>
                <input type="text" name="identification" placeholder="CEDULA DE IDENTIDAD" onChange={(e) => {props.changeId(e)}}/>
                <button className="buscar" type="submit" onClick={onSubmitID}>Buscar</button>
            </form>
            <form>
                <input type="number" name="RUC" placeholder="RUC EMPRESARIAL" onChange={(e) => {props.changeRUC(e)}}/>
                <button className="buscar" type="submit" onClick={onSubmitRUC}>Buscar</button>
            </form>

            <div className="linea"></div>

            {
                props.type === 'persona' 
                    ?
                    <div className="user">
                        <div className="table">
                            <div className="cabecera">
                                <h5>USUARIO</h5>
                                <h5>ID</h5>
                                <h5>OPCIÓN</h5>
                            </div>
                            <div className="content">
                                <p>{props.data.name}</p>
                                <p>{props.data.identification}</p>
                                <button className="selection" onClick={() => {
                                    props.ChangeUser(1)
                                    props.changeActivate()
                                }}>Selecctionar</button>
                            </div>
                        </div>
                    </div>

                    : props.type === 'empresa'
                        ?
                        <div className="user">
                            <div className="table">
                                <div className="cabecera">
                                    <h5>EMPRESA</h5>
                                    <h5>RUC</h5>
                                    <h5>OPCIÓN</h5>
                                </div>
                                <div className="content">
                                    <p>{props.data.name}</p>
                                    <p>{props.data.RUC}</p>
                                    <button className="selection" onClick={() => {
                                        props.ChangeUser(2)
                                        props.changeActivate()
                                    }}>Selecctionar</button>
                                </div>
                            </div>
                        </div>
                        : ''
            }

            <style jsx>{`
                
                section {
                    align-self: center;
                    margin: 0 50px;
                    display: grid;
                    grid-template-rows: 1fr 2px 1fr;
                    grid-template-columns: 1fr 1fr;
                }

                form {
                    justify-self: center;
                    margin: 20px 0;
                }

                input::placeholder {
                    padding: 10px 0;
                    color: var(--mainColorClaro);
                    font-weight: 600;
                }

                input, button {
                    outline: none;
                    padding: 10px 10px;
                    border: 1px solid #33333344;
                }

                input {
                    color: var(--mainColor);
                    border-right: none; 
                    border-radius: 5px 0 0 5px;
                }

                .buscar {
                    border-left: none; 
                    cursor: pointer;
                    background-color: var(--mainColor);
                    color: white;
                    border-radius: 0 5px 5px 0;
                }

                .linea {
                    background: var(--puntoRojo);
                    grid-column: 1/3;
                }

                .user {
                    grid-column: 1/3;
                    padding-top: 20px;
                    width: 90%;
                    justify-self: center;
                }

                .table {
                    display: grid;
                    grid-template-rows: 1fr 1fr;
                }

                .cabecera, .content {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                }

                .cabecera {
                    text-align: center;
                }

                h5 {
                    color: var(--mainColor);
                }

                .content {
                    color: var(--mainColorClaro);
                }

                .selection {
                    border: none;
                    background-color: var(--mainColorClaro);
                    color: white;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color .5s;
                }

                .selection:hover {
                    background-color: var(--mainColor);
                }

                @media screen and (max-width: 700px) {

                    section {
                        grid-template-rows: 1fr 1fr 2px 1fr;
                        margin: 0;
                    }

                    .linea {
                        margin: 0 50px;
                    }

                    form {
                        grid-column: 1/3;
                    }

                }

                @media screen and (max-width: 460px) {

                }
                
            `}</style>
        </section>
    )
}

export default FindUserAdmin
