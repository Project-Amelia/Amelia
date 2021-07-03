import { Message } from 'discord.js';

export default interface MessageService {
  sendEmbed(
    msg: Message,
    title: string,
    gif: string,
    description?: string,
    footer?: string
  ): void;
}
