const axios = require("axios");

exports.getTransfers = async (req, res) => {

    const { year, month, day } = req.query; 
    try {
        const response = await axios.get("https://v3.football.api-sports.io/transfers?team=126", {
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': '799fe037c9a9fe1b0924feeb9f5ecb3a'
            }
        });

        let todasTransferencias = [];
        for (const player of response.data.response) {
            for (const transfers of player.transfers) {
                todasTransferencias.push({
                    ...transfers,
                    id: player.player.id,
                    player: player.player.name,
                    img_player: `https://media.api-sports.io/football/players/${player.player.id}.png`
                });
            }
        }


        // Filtro por ano
        if (year && year.trim() !== "") {
            todasTransferencias = todasTransferencias.filter(t => t.date && t.date.startsWith(year));
            
        }

        // Filtro por mês
        if (month && month.trim() !== "") {
            todasTransferencias = todasTransferencias.filter(t => {
                if (!t.date) return false;
                const [, m] = t.date.split("-");
                return m === month.padStart(2, '0');
            });
            
        }

        // Filtro por dia
        if (day && day.trim() !== "") {
            todasTransferencias = todasTransferencias.filter(t => {
                if (!t.date) return false;
                const [, , d] = t.date.split("-");
                return d === day.padStart(2, '0');
            });
            
        }

      

        res.json(todasTransferencias);
        console.log(todasTransferencias)

    } catch (error) {
        console.error("❌ Erro ao buscar transferências:", error.message);
        res.status(500).json({ error: "Erro ao buscar transferências" });
    }
};
