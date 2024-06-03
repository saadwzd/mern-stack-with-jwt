const Client = require("../models/clientSchema");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
dotenv.config();


exports.addClient = async (req, res) => {
    const { nom, cin, email, password, tel } = req.body;

    if (!nom || !cin || !email || !password || !tel) {
        return res.status(400).send("Please fill all the data");
    }
    try {
        const pre_client = await Client.findOne({ cin: cin });
        if (pre_client) {
            return res.status(409).send("Client already exists");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const addClient = new Client({ nom, cin, email, password: hashedPassword, tel });
            await addClient.save();
            return res.status(201).json(addClient);
        }
    } catch (err) {
        return res.status(500).send(err);
    }
};

exports.loginClient = async (req, res) => {
    const { cin, password } = req.body;
    console.log(cin," ",password);
  
    try {
      // Recherche de l'utilisateur par cin
      const client = await Client.findOne({ cin: cin });
      if (!client) return res.status(400).send('Client not found');
  
      // Vérification du mot de passe
      const validPassword = await bcrypt.compare(password, client.password);
      if (!validPassword) return res.status(400).send('Invalid password');
  
      // Création du token JWT
      const accessToken = jwt.sign({ cin: client.cin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  
      // Envoi du token au client
      res.json({ accessToken });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
};

exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).send("Client not found");
        }
        res.status(200).json(client);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClient) {
            return res.status(404).send("Client not found");
        }
        res.status(200).json(updatedClient);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteClient = async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) {
            return res.status(404).send("Client not found");
        }
        res.status(200).json(deletedClient);
    } catch (err) {
        res.status(500).send(err);
    }
};
