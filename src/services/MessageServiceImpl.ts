import MessageService from './MessageService';
import { Message, MessageEmbed } from 'discord.js';
import { config } from '../config/amelia.config.json';

export default class MessageServiceImpl implements MessageService {
  public sendEmbed(
    msg: Message,
    title: string,
    gif: string,
    description = '',
    footer = ''
  ): void {
    const embed: MessageEmbed = new MessageEmbed()
      .setColor(config.colors.primary)
      .setTitle(title)
      .setImage(gif)
      .setDescription(description)
      .setFooter(footer);

    msg.channel.send(embed);
  }
}
