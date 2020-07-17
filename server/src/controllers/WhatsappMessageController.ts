import { Request, Response } from 'express';
import twilio from 'twilio';
import { getRepository } from 'typeorm';

import Restaurant from '../models/Restaurant';

twilio(process.env.TWILIO_SID, process.env.TWILIO_KEY);
const { MessagingResponse } = twilio.twiml;

class WhatsappMessageController {
  async recive(req: Request, res: Response) {
    const restaurantRepo = getRepository(Restaurant);
    const twiml = new MessagingResponse();
    try {
      const restaurant = await restaurantRepo.findOne({
        whatsapp_number: req.body.To,
      });
      const message = req.body.Body;
      switch (message) {
        case 'pedido':
          twiml.message(
            `localhost:3000/${restaurant.url}?from=${
              req.body.From.split(':')[1]
            }`,
          );
          break;
        default:
          twiml.message(`Para iniciar um pedido envie "pedido"`);
          break;
      }
      return res.status(200).send(twiml.toString());
    } catch (error) {
      console.log(error);
    }
    return res.json({ ok: true });
  }
}

export default new WhatsappMessageController();
