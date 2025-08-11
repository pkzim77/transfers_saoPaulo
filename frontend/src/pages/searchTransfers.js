import React, { useState } from 'react';
import axios from 'axios';

const TransferSearch = () => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTransfers = async () => {
        setLoading(true);
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
            setLoading(false);
        }
    };
    //parte que aparece pro usuario
    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Buscar Transferências</h1>

            <div className="flex flex-col gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Ano (ex: 2023)"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Mês (ex: 07)"
                    value={month}
                    onChange={e => setMonth(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Dia (ex: 25)"
                    value={day}
                    onChange={e => setDay(e.target.value)}
                    className="border p-2 rounded"
                />
                <button
                    onClick={fetchTransfers}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Buscar
                </button>
            </div>

            {loading ? (
                <p>Carregando transferências...</p>
            ) : (
                <ul className="space-y-2">
                    {transfers.map((t, index) => (
                        <li key={index} className="border p-2 rounded shadow">
                            <strong>{t.jogador}</strong><br />
                            De: {t.teams?.out?.name || '---'}<br />
                            Para: {t.teams?.in?.name || '---'}<br />
                            Data: {t.date || 'Sem data'}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


export default TransferSearch;
