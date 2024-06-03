const Produit = require("../models/produitSchema");

exports.addProduit = async (req, res) => {
    const { libelle, prix, desc } = req.body;

    if (!libelle || !prix || !desc) {
        return res.status(400).send("Please fill all the data");
    }
    try {
        const addProduit = new Produit({ libelle, prix, desc });
        await addProduit.save();
        return res.status(201).json(addProduit);
    } catch (err) {
        return res.status(500).send(err);
    }
};

exports.getProduits = async (req, res) => {
    try {
        const produits = await Produit.find();
        res.status(200).json(produits);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getProduitById = async (req, res) => {
    try {
        const produit = await Produit.findById(req.params.id);
        if (!produit) {
            return res.status(404).send("Produit not found");
        }
        res.status(200).json(produit);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateProduit = async (req, res) => {
    try {
        const updatedProduit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduit) {
            return res.status(404).send("Produit not found");
        }
        res.status(200).json(updatedProduit);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteProduit = async (req, res) => {
    try {
        const deletedProduit = await Produit.findByIdAndDelete(req.params.id);
        if (!deletedProduit) {
            return res.status(404).send("Produit not found");
        }
        res.status(200).json(deletedProduit);
    } catch (err) {
        res.status(500).send(err);
    }
};
