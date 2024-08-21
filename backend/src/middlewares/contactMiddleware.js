import { object, string, array } from 'yup';
export async function contactInputMiddleware(req, res, next) {
  try {
    const contactData = req.body.data;
    const schema = object({
      NAME: string().required(),
      LAST_NAME: string().required(),
      PHONE: array(),
      WEB: array(),
      EMAIL: array(),
      bankInfo: array(),
      address: array(),
      requisite: object(),
    });
    await schema.validate(contactData);
    await next();
  } catch (e) {
    res.status(400).json({
      success: false,
      errors: e.errors,
      errorName: e.name,
    });
  }
}
