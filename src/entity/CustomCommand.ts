import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { CustomCommandImage } from './CustomCommandImage';
import { DiscordUser } from './DiscordUser';

@Entity({ name: 'customcommand' })
export class CustomCommand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  discordUserId: number;

  @ManyToOne(
    () => DiscordUser,
    (discordUser: DiscordUser) => discordUser.customCommands,
    { nullable: false }
  )
  @JoinColumn({ name: 'discordUserId', referencedColumnName: 'id' })
  discordUser: DiscordUser;

  @Column({ nullable: false })
  commandName: string;

  @Column({ nullable: false })
  commandText: string;

  @OneToMany(
    () => CustomCommandImage,
    (customCommand: CustomCommandImage) => customCommand.customCommand
  )
  customCommandImages: CustomCommandImage[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
