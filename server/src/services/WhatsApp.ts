import Twilio from 'twilio';

const client = Twilio(process.env.TWILIO_SID, process.env.TWILIO_KEY);
export async function sendMessage(
  from: string,
  to: string,
  message: string,
): Promise<boolean> {
  try {
    await client.messages.create({
      from,
      to,
      body: message,
    });
    return true;
  } catch (error) {
    return false;
  }
}
