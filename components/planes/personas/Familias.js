import React from 'react'
import { useRouter } from 'next/router'

const Familias = () => {

    const router = useRouter()

    const contacto = () => {
        router.replace("/contacto")
    }

    const registro = () => {
        router.replace("/registro-ingreso")
    }


    return (
        <section className="content">

            <div className="puntos"></div>
            <div className="text">
                <h2>
                    <span className="personas">PERSONAS</span>
                    <span className="familias">& FAMILIAS</span>
                </h2>
                <h3>CONFIANZA & AYUDA</h3>
                <p>Con el objetivo de brindarle apoyo para elegir la opción que más se ajusta a sus necesidades le ofrecemos nuestro plan PLUS INDIVIDUAL O FAMILIAR para así protegerlo de gastos dentales inesperados y ayudarlo a mantener su salud oral y la de su familia en óptimas condiciones.</p>
                <div className="botones">
                    <button onClick={contacto} className="contacto">Contacto</button>
                    <button onClick={registro} className="registro">Registro</button>
                </div>
            </div>
            <div className="img"></div>

            <style jsx>{`
                
                .content {
                    padding-top: 150px;
                    height: 500px;
                    display: grid;
                    grid-template-columns: .6fr 4.4fr 5fr;
                }    

                .botones {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    align-items: center;
                }

                .puntos {
                    background-image: url("/img/puntos8x3.png");
                    background-size: 100% auto;
                    background-repeat: no-repeat;
                    background-position: bottom;
                    margin-bottom: 100px;
                }

                .img {
                    background-image: url("/img/familia.png");
                    background-size: auto 100%;
                }

                .text {
                    display: grid;
                    grid-template-rows: 2fr 1fr 1fr 1.5fr;
                    padding: 0 40px 0 80px;
                    background-image: url("/img/punto3.png");
                    background-repeat: no-repeat;
                    background-position: right top;
                    background-size: 35%;
                }

                h2 {
                    position: relative;
                    color: var(--mainColor);
                    display: grid;
                }

                h2:before {
                    position: absolute;
                    content: "";
                    height: 20px;
                    width: 20px;
                    background: var(--puntoAzul);
                    border-radius: 50%;
                    left: -50px;
                    top: 100px;
                }

                h2:after {
                    position: absolute;
                    content: "";
                    height: 20px;
                    width: 20px;
                    background: var(--puntoAzul);
                    border-radius: 50%;
                    right: -10px;
                    top: -20px;
                }

                .personas {
                    font-size: 80px;
                }

                .familias {
                    font-size: 72px;
                    margin-top: -35px;
                }

                h3 {
                    color: var(--mainColor);
                    font-size: 35px;
                    font-weight: 400;
                }

                p {
                    color: var(--mainColorClaro);
                    font-weight: 500;
                }

                button {
                    align-self: center;
                    position: relative;
                    border: none;
                    outline: none;
                    color: white;
                    justify-self: center;
                    width: 120px;
                    height: 35px;
                    transition: background .3s;
                    cursor: pointer;
                    border-radius: 30px;
                }

                .contacto {
                    background: var(--puntoAzul);
                }

                .registro {
                    background: var(--puntoRojo);
                }

                .contacto:hover {
                    background: var(--botonesHover);
                }

                .registro:hover {
                     background: var(--botonesRegistro);
                }

                button:nth-child(1):before {
                    position: absolute;
                    content: "";
                    height: 20px;
                    width: 20px;
                    background: var(--puntoRojo);
                    border-radius: 50%;
                    left: 50%;
                    transform: translate(-50%);
                    top: 50px;
                    z-index: -1;
                }
                
            `}</style>
        </section>
    )
}

export default Familias
