import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm';
import { CustomCommand } from './CustomCommand';

@Entity({ name: 'customcommandimage' })
export class CustomCommandImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  customCommandId: number;

  @ManyToOne(
    () => CustomCommand,
    (discordUser: CustomCommand) => discordUser.customCommandImages,
    { nullable: false }
  )
  @JoinColumn({ name: 'customCommandId', referencedColumnName: 'id' })
  customCommand: CustomCommand;

  @Column({ nullable: false })
  imageUrl: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
