import AccountModel from "../Models/AccountModel.js";

// Show all accounts
export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await AccountModel.findAll();
    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Show one account
export const getAccount = async (req, res) => {
  try {
    const account = await AccountModel.findByPk(req.params.email);
    if (account) {
      res.json(account);
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create an account
export const createAccount = async (req, res) => {
  try {

    await AccountModel.create(req.body);
    res.json({
      message: "Account created successfully!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Update an account
export const updateAccount = async (req, res) => {
  try {
    const account = await AccountModel.findByPk(req.params.email);
    if (account) {
      await AccountModel.update(req.body, {
        where: { Email: req.params.email },
      });
      res.json({ message: "Account updated successfully!" });
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an account
export const deleteAccount = async (req, res) => {
  try {
    const account = await AccountModel.findByPk(req.params.email);
    if (account) {
      await AccountModel.destroy({ where: { Email: req.params.email } });
      res.json({ message: 'Account deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
