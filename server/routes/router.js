const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth-middleware")
const ProduitController = require("../controllers/ProduitController");
const CommandeController = require("../controllers/CommandeController");
const ClientController = require("../controllers/ClientController");

// Routes pour les produits
router.post("/produit", ProduitController.addProduit);
router.get("/produits", ProduitController.getProduits);
router.get("/produit/:id", ProduitController.getProduitById);
router.put("/produit/:id", ProduitController.updateProduit);
router.delete("/produit/:id", ProduitController.deleteProduit);

// Routes pour les commandes
router.post("/commande", CommandeController.addCommande);
router.get("/commandes", CommandeController.getCommandes);
router.get("/commande/:id", CommandeController.getCommandeById);
router.put("/commande/:id", CommandeController.updateCommande);
router.delete("/commande/:id", CommandeController.deleteCommande);

// Routes pour les clients
router.post("/login", ClientController.loginClient);
router.post("/client", ClientController.addClient);
router.get("/clients", authenticateToken, ClientController.getClients);
router.get("/client/:id", authenticateToken, ClientController.getClientById);
router.put("/client/:id", authenticateToken, ClientController.updateClient);
router.delete("/client/:id", authenticateToken, ClientController.deleteClient);

module.exports = router;
