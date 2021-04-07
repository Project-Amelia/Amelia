import BotCommand from '../commands/BotCommand';
import PingCommand from '../commands/impl/misc/PingCommand';
import OkCommand from '../commands/impl/gifs/OkCommand';
import HugCommand from '../commands/impl/gifs/HugCommand';

export default class CommandLookup {
  commands: Array<BotCommand>;

  constructor() {
    const commands = [new PingCommand(), new OkCommand(), new HugCommand()];

    this.commands = commands;
  }

  public get(commandName: string): BotCommand | undefined {
    let foundCommand = this.commands.find((e) => e.name === commandName);
    if (foundCommand) return foundCommand;
    foundCommand = this.commands.find((e) => e.alias.indexOf(commandName) > -1);
    return foundCommand;
  }
}
