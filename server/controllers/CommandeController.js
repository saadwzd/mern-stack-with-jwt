const Commande = require("../models/commandeSchema");

exports.addCommande = async (req, res) => {
    const { client, produit, date_liv } = req.body;

    if (!client || !produit || !date_liv) {
        return res.status(400).send("Please fill all the data");
    }
    try {
        const addCommande = new Commande({ client, produit, date_liv });
        await addCommande.save();
        return res.status(201).json(addCommande);
    } catch (err) {
        return res.status(500).send(err);
    }
};

exports.getCommandes = async (req, res) => {
    try {
        const commandes = await Commande.find().populate('client').populate('produit');
        res.status(200).json(commandes);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getCommandeById = async (req, res) => {
    try {
        const commande = await Commande.findById(req.params.id).populate('client').populate('produit');
        if (!commande) {
            return res.status(404).send("Commande not found");
        }
        res.status(200).json(commande);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateCommande = async (req, res) => {
    try {
        const updatedCommande = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCommande) {
            return res.status(404).send("Commande not found");
        }
        res.status(200).json(updatedCommande);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteCommande = async (req, res) => {
    try {
        const deletedCommande = await Commande.findByIdAndDelete(req.params.id);
        if (!deletedCommande) {
            return res.status(404).send("Commande not found");
        }
        res.status(200).json(deletedCommande);
    } catch (err) {
        res.status(500).send(err);
    }
};
