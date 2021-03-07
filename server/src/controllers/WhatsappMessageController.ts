import { Request, Response } from 'express';
import twilio from 'twilio';
import { getRepository } from 'typeorm';

import Restaurant from '../models/Restaurant';
import User from '../models/User';
import { createOrder } from '../services/Order';
import { verifyUser } from '../services/User';

twilio(process.env.TWILIO_SID, process.env.TWILIO_KEY);
const { MessagingResponse } = twilio.twiml;

class WhatsappMessageController {
  async recive(req: Request, res: Response) {
    const twiml = new MessagingResponse();
    const message = req.body.Body;
    if (!(await verifyUser(req.body.From))) {
      if (message.split(' ')[0].toUpperCase() !== '!NOME') {
        twiml.message(`*Para se cadastrar digite:*\n!nome <Seu Nome>`);
        return res.status(200).send(twiml.toString());
      }
      const name = message.replace('!nome ', '').replace('!NOME', '');

      const userRepo = getRepository(User);
      const user = userRepo.create({
        name,
        whatsapp: req.body.From,
      });
      userRepo.save(user);
      twiml.message(`Bem vindo ${name}!`);
      return res.status(200).send(twiml.toString());
    }

    const restaurantRepo = getRepository(Restaurant);

    try {
      const restaurant = await restaurantRepo.findOne({
        whatsapp_number: req.body.To,
      });
      const user_phone = req.body.From;
      switch (message) {
        case '!pedir': {
          const order = await createOrder(user_phone, restaurant.id);

          if (order.status === 201) {
            twiml.message(
              `*Pedido criado com sucesso! Acompanhe em:*\n\nlocalhost:3001/${restaurant.url}?order=${order.order}`,
            );
          } else {
            twiml.message(`Ocorreu um erro ao criar o pedido`);
          }

          break;
        }
        default:
          twiml.message(
            `*Para iniciar um pedido envie:*\n!pedir\n\n*Para visualizar seus pedidos envie:*\n!pedidos`,
          );
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
