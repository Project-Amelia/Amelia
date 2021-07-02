import Discord from 'discord.js';
import BotCommand from '../../BotCommand';
import { gifs } from '../../../assets/json/hug.gifs.json';
import MessageService from '../../../services/MessageService';
import MessageServiceImpl from '../../../services/MessageServiceImpl';
import DiscordUserService from '../../../services/DiscordUserService';
import DiscordUserServiceImpl from '../../../services/DiscordUserServiceImpl';
import { MSDBService } from '../../../services/MSDBService';
import { DiscordUser } from '../../../entity/DiscordUser';
import { UserStats } from '../../../entity/UserStats';

export default class HugCommand implements BotCommand {
  name: string;
  alias: string[];
  description: string;
  usage: string;
  enabled: boolean;
  messageService: MessageService;
  discordUserService: DiscordUserService;

  constructor() {
    this.name = 'hug';
    this.alias = [];
    this.description = 'Send some lovely hugs to someone <3.';
    this.usage = `${process.env.PREFIX}hug`;
    this.enabled = true;
    this.messageService = new MessageServiceImpl();
    this.discordUserService = new DiscordUserServiceImpl();
  }

  // eslint-disable-next-line
  async execute(msg: Discord.Message, args: string[]): Promise<boolean> {
    if (!this.enabled) return false;

    // Create title message
    let title = `${msg.author.username} knuffelt`;
    const taggedUser = msg.mentions?.members?.first();
    if (taggedUser) {
      title = `${title} ${taggedUser.user.username}`;
    } else {
      title = `${title} Amelia`;
    }

    this.messageService.sendEmbed(
      msg,
      title,
      gifs[Math.floor(Math.random() * gifs.length)]
    );

    // Add HugCount
    try {
      const conn = MSDBService.getConnection();
      const dbDiscordUser = conn.getRepository(DiscordUser);
      const dbUserStats = conn.getRepository(UserStats);

      const authorStats = await dbDiscordUser.findOne(msg.author.id, {
        relations: ['userStats']
      });

      if (!authorStats?.id || !authorStats?.userStats?.id) {
        await this.discordUserService.create(msg.author.id);
      }

      let hugCount = authorStats?.userStats?.hugCount || 0;
      hugCount++;
      await dbUserStats.update(msg.author.id, { hugCount });
      return true;
    } catch (ex) {
      console.log(
        `Exception adding hugcount to DiscordUser with message: ${ex.message}`
      );
      return false;
    }
  }
}
