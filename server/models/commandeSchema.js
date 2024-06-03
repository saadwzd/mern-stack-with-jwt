const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Clients', required: true },
    produit: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produits', required: true }],
    date_liv: { type: Date, required: true }
});

const commandes = mongoose.model("commandes", commandeSchema);
module.exports = commandes;
