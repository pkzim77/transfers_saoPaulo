import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'

const TransferSearch = () => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [transfers, setTransfers] = useState([]);
    const [loadingTransfers, setLoadingTransfers] = useState(false);
    const [indexMaping, setIndexMaping] = useState({})

    const fetchTransfers = async () => {
        setLoadingTransfers(true);
        try {
            const response = await axios.get('http://localhost:3001/transfers', {
                params: {
                    year,
                    month,
                    day
                }

            });
            setTransfers(response.data);
        } catch (error) {
            console.error('Erro ao buscar transferências:', error);
        } finally {
            setLoadingTransfers(false);
        }
    };

    const groupIdTransfers = transfers.reduce((acumulador, objActual) => {
        if (!acumulador[objActual.id]) {
            acumulador[objActual.id] = []
        }
        acumulador[objActual.id].push(objActual)
        return acumulador
    }, {})

    return (
        <div className="container">

            <div className="container-search">
                <h1>Fique por dentro das movimentações do <span>Tricolor!</span></h1>


                <div className="container-search-form">
                    <div className="flex flex-centralizado">
                        <div className="container-visual-form">
                            <h3 className="margin0">Como usar</h3>
                            <p className="margin0">Você pode realizar uma busca sem preencher nenhum campo, mas também tem a opção de refinar os resultados.
                                Pode buscar apenas por ano, mês ou dia, ou combinar esses filtros para encontrar exatamente o que procura.</p>
                        </div>
                        <div className="container-input-form">
                            <div>
                                <label htmlFor=""><strong>Digite o ano</strong></label>
                                <input
                                    type="number"
                                    placeholder="Ano (ex: 2023)"
                                    value={year}
                                    onChange={e => setYear(e.target.value)} />
                            </div>

                            <div>
                                <label htmlFor=""><strong>Digite o mês</strong></label>
                                <input
                                    type="number"
                                    placeholder="Mês (ex: 07)"
                                    value={month}
                                    onChange={e => setMonth(e.target.value)} />
                            </div>

                            <div>
                                <label htmlFor=""><strong>Digite o dia</strong></label>
                                <input
                                    type="number"
                                    placeholder="Dia (ex: 25)"
                                    value={day}
                                    onChange={e => setDay(e.target.value)} />
                            </div>

                            <input className="botao" translate="no" type="button" value="buscar" onClick={fetchTransfers} />
                        </div>
                    </div>


                </div>

            </div>

            <div className="result">
                {loadingTransfers ? (<p>carregando...</p>) :
                    Object.entries(groupIdTransfers).map(([id, transfersIdGroup], indice) => {
                        let indexActual = indexMaping[id] || 0
                        let objSelect = transfersIdGroup[indexActual]
                        return (
                            <div key={indice}>
                                <select name="" id="" onChange={(e) => {
                                    let novoValor = e.target.value
                                    setIndexMaping({ [id]: novoValor })
                                }}>
                                    <option value="" defaultValue></option>
                                    {transfersIdGroup.map((objActual, index) => {
                                        return (<option key={index} value={index}>transferência {index + 1} data: {objActual.date}</option>)
                                    })}

                                </select>
                                {objSelect && (
                                    <div>
                                        <img src={objSelect.img_player} alt="" />
                                        <div>
                                            <p><strong>Nome: </strong>{objSelect.player}</p>
                                            <p><strong>De: </strong>{objSelect.teams.in.name}</p>
                                            <p><strong>Para: </strong>{objSelect.teams.out.name}</p>
                                            <p><strong>Data: </strong>{objSelect.date}</p>
                                            <p><strong>Tipo/valor: </strong>{objSelect.type}</p>
                                        </div>


                                    </div>

                                )}
                            </div>

                        )
                    }

                    )}
            </div>
        </div>
    )
};


export default TransferSearch;
