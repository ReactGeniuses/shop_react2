import WishlistModel from "../Models/WishlistModel.js";

// Obtener todos los productos de la wishlist de un usuario
export const getAllWishlistItems = async (req, res) => {
  try {
    const { email } = req.params;
    const wishlistItems = await WishlistModel.findAll({
      where: { EmailUser: email },
      attributes: ['WishID', 'ProductID'] // Incluir WishID en la respuesta
    });

    res.status(200).json(wishlistItems); // Devolver los ítems con WishID
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Obtener un producto específico de la wishlist por ID
export const getWishlistItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const wishlistItem = await WishlistModel.findOne({ where: { WishID: id } });

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    res.status(200).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Añadir un producto a la wishlist de un usuario
export const addWishlistItem = async (req, res) => {
  try {
    console.log("entre 1");

    const { EmailUser, ProductID} = req.body;
    console.log("entre 2");
    console.log(EmailUser);
    console.log(ProductID);
    const newWishlistItem = await WishlistModel.create({
      EmailUser: EmailUser,
      ProductID: ProductID
    });

    res.status(201).json(newWishlistItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto de la wishlist de un usuario por ID
export const deleteWishlistItem = async (req, res) => {
  try {
    const { id } = req.params;

    const wishlistItem = await WishlistModel.findOne({ where: { WishID: id } });

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    await wishlistItem.destroy();
    res.status(200).json({ message: 'Wishlist item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

