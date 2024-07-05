import DireccionModel from "../Models/DireccionModel.js"; 

// Get all addresses for a user
export const getAllAddresses = async (req, res) => {
  try {
    const { email } = req.params;
    const addresses = await DireccionModel.findAll({ where: { Email: email } });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get address by ID
export const getAddressById = async (req, res) => {
  try {
    const { email, id } = req.params;

    const address = await DireccionModel.findOne({ where: { Email: email, DireccionId: id } });

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Create a new address
export const createAddress = async (req, res) => {
  try {
    const { email } = req.params; // Use email from req.params
    const { NombreDireccion, Pais, Provincia, DireccionDescripcion } = req.body;

    const newAddress = await DireccionModel.create({
      Email: email, // Ensure email is assigned to Email
      NombreDireccion,
      Pais,
      Provincia,
      DireccionDescripcion,
    });

    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update an existing address
export const updateAddress = async (req, res) => {
  try {
    const { email, id } = req.params;
    const { NombreDireccion, Pais, Provincia, DireccionDescripcion } = req.body;

    const address = await DireccionModel.findOne({ where: { Email: email, DireccionId: id } });

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    address.NombreDireccion = NombreDireccion ?? address.NombreDireccion;
    address.Pais = Pais ?? address.Pais;
    address.Provincia = Provincia ?? address.Provincia;
    address.DireccionDescripcion = DireccionDescripcion ?? address.DireccionDescripcion;

    await address.save();
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const { email, id } = req.params;
    console.log(email);
    console.log(id);
    const address = await DireccionModel.findOne({ where: { Email: email, DireccionId: id } });

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    await address.destroy();
    res.status(200).json({ message: 'Address deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
