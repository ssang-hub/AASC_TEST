import { api } from "../helpers/api";

/**
 * @param req
 * @param res
 * @return {Promise<any>}
 */

export const getAllEmployee = async (req, res) => {
  try {
    const data = await api("user.get.json");
    res.status(200).json(data.result);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
