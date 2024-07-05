import CardModel from '../Models/CardModel.js';

// Get all cards for a user
export const getAllCards = async (req, res) => {
  try {
    const { email } = req.params;
    const cards = await CardModel.findAll({ where: { Email: email } });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get card by ID
export const getCardById = async (req, res) => {
  try {
    const { email, id } = req.params;
    const card = await CardModel.findOne({ where: { Email: email, TarjetaId: id } });

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new card
export const createCard = async (req, res) => {
  try {
    const { email } = req.params;
    const { TipoTarjeta, NombreTitular, NumeroTarjeta, UltimosTresNumeros } = req.body;

    const newCard = await CardModel.create({
      Email: email,
      TipoTarjeta,
      NombreTitular,
      NumeroTarjeta,
      UltimosTresNumeros,
    });

    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing card
export const updateCard = async (req, res) => {
  try {
    const { email, id } = req.params;
    const { TipoTarjeta, NombreTitular, NumeroTarjeta, UltimosTresNumeros } = req.body;

    const card = await CardModel.findOne({ where: { Email: email, TarjetaId: id } });

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    card.TipoTarjeta = TipoTarjeta ?? card.TipoTarjeta;
    card.NombreTitular = NombreTitular ?? card.NombreTitular;
    card.NumeroTarjeta = NumeroTarjeta ?? card.NumeroTarjeta;
    card.UltimosTresNumeros = UltimosTresNumeros ?? card.UltimosTresNumeros;

    await card.save();
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a card
export const deleteCard = async (req, res) => {
  try {
    const { email, id } = req.params;
    const card = await CardModel.findOne({ where: { Email: email, TarjetaId: id } });

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    await card.destroy();
    res.status(200).json({ message: 'Card deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};