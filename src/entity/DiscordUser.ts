import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { CustomCommand } from './CustomCommand';

@Entity({ name: 'discorduser' })
export class DiscordUser extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  birthdate: Date;

  @Column()
  customCommandAllowance: number;

  @OneToMany(
    () => CustomCommand,
    (customCommand: CustomCommand) => customCommand.discordUser
  )
  customCommands: CustomCommand[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
