const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to communicate


app.get('/', (req, res) => {
    res.send('🚀 DNA Analysis Backend is Running!');
});


app.post('/analyze_dna', (req, res) => {
    const { dna } = req.body;

    if (!dna || /[^ATGC]/.test(dna)) {
        return res.status(400).json({ message: "Invalid DNA sequence! Use only A, T, G, and C." });
    }

    // 🔹 Convert DNA to mRNA 
    const rna = dna.replace(/A/g, "U").replace(/T/g, "A").replace(/G/g, "C").replace(/C/g, "G");

    
    const protein = rna.replace(/U/g, "M"); 

    
    const disease = dna.includes("AAA") ? "Potential Genetic Disorder" : "No Disease Detected";

    res.json({ rna, protein, disease });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
