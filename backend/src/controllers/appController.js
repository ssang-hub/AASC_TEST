import { updateToken } from "../helpers/file";

export const installApp = async (req, res) => {
  const tokens = {
    access_token: req.body["auth[access_token]"],
    refresh_token: req.body["auth[refresh_token]"],
  };
  updateToken(tokens);
};
