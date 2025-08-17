const axios = require("axios");

exports.getTransfers = async (req, res) => {

    const { year, month, day } = req.query; // colocar name depois

    console.log("🟢 Parâmetros recebidos:", { year, month, day });

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
                    player: player.player.name,
                    id: player.player.id,
                    img_player: `https://media.api-sports.io/football/players/${player.player.id}.png`
                });
            }
        }

        console.log(`📦 Total de transferências antes dos filtros: ${todasTransferencias.length}`);

        // Filtro por ano
        if (year && year.trim() !== "") {
            todasTransferencias = todasTransferencias.filter(t => t.date && t.date.startsWith(year));
            console.log(`📅 Após filtro por ANO (${year}): ${todasTransferencias.length} transferências`);
        }

        // Filtro por mês
        if (month && month.trim() !== "") {
            todasTransferencias = todasTransferencias.filter(t => {
                if (!t.date) return false;
                const [, m] = t.date.split("-");
                return m === month.padStart(2, '0');
            });
            console.log(`📆 Após filtro por MÊS (${month}): ${todasTransferencias.length} transferências`);
        }

        // Filtro por dia
        if (day && day.trim() !== "") {
            todasTransferencias = todasTransferencias.filter(t => {
                if (!t.date) return false;
                const [, , d] = t.date.split("-");
                return d === day.padStart(2, '0');
            });
            console.log(`📍 Após filtro por DIA (${day}): ${todasTransferencias.length} transferências`);
        }

        console.log("✅ Transferências filtradas (primeiros 3 itens):", todasTransferencias.slice(0, 3));

        res.json(todasTransferencias);

    } catch (error) {
        console.error("❌ Erro ao buscar transferências:", error.message);
        res.status(500).json({ error: "Erro ao buscar transferências" });
    }
};
