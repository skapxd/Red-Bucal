import React from 'react'

const Porcentajes = (props) => {
    return (
        <div className="content" onClick={() => {
            props.changeActive()
            props.changeList()
            }}>

            <hgroup>
                <h5>{props.numero}%</h5>
                <h6>Lorem ipsum</h6>
            </hgroup>

            <style jsx>{`

                :global(:root) {
                    --sizeP: 1;
                }

                .content {
                    display: grid;
                    align-items: center;
                    justify-items: center;
                    height: 100%;
                    width: 100%;
                    background-color: ${props.backgroundColor};
                    transition: background-color .5s;
                }    

                .content:hover {
                    background-color: ${props.hover};
                    cursor: pointer;
                }

                hgroup {
                    transform: rotate(${props.grados});
                    color: ${props.color};
                }

                h5 {
                    font-size: calc(${props.sizeNum} * var(--sizeP));
                }

                h6 {
                    text-align: right;
                    margin: calc(${props.arriba} * var(--sizeP)) calc(${props.derecha} * var(--sizeP)) 0 0;
                    font-size: calc(${props.sizeText} * var(--sizeP));
                    font-weight: 400;
                }

                @media screen and (max-width: 1230px) {
                    :global(:root) {
                        --sizeP: .9;
                    }
                }

                @media screen and (max-width: 1125px) {
                    :global(:root) {
                        --sizeP: .8;
                    }
                }

                @media screen and (max-width: 990px) {
                    :global(:root) {
                        --sizeP: .7;
                    }
                }

                @media screen and (max-width: 870px) {
                    :global(:root) {
                        --sizeP: .6;
                    }
                }

                @media screen and (max-width: 606px) {
                    :global(:root) {
                        --sizeP: .5;
                    }
                }

                @media screen and (max-width: 500px) {

                    :global(:root) {
                        --sizeP: .6;
                    }

                    .content {
                        padding: 30px 0;
                    }

                }
                
            `}</style>

        </div>
    )
}

export default Porcentajes