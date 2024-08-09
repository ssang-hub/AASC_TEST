import fetch from "node-fetch";

/**
 * @param req
 * @param res
 * @return {Promise<any>}
 */

export const refreshToken = async (req, res) => {
  try {
    const response = await fetch(process.env.REFRESH_TOKEN_URL);
    if (!response.ok) {
      throw new Error(`Failed to refresh access token`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
