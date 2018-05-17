/*
 *   This file is part of discord-self-bot
 *   Copyright (C) 2017-2018 Favna
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, version 3 of the License
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const Discord = require('discord.js'),
  {Command} = require('discord.js-commando'),
  {deleteCommandMessages} = require('../../util.js');

module.exports = class avatarCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'avatar',
      memberName: 'avatar',
      group: 'info',
      aliases: ['ava'],
      description: 'Gets the avatar from a user',
      format: 'MemberID|MemberName(partial or full) [ImageSize]',
      examples: ['avatar Favna 2048'],
      guildOnly: true,

      args: [
        {
          key: 'member',
          prompt: 'What user would you like to get the avatar from?',
          type: 'member'
        },
        {
          key: 'size',
          prompt: 'What size do you want the avatar to be? (Valid sizes: 128, 256, 512, 1024, 2048)',
          type: 'integer',
          default: 128,
          validate: (size) => {
            const validSizes = ['128', '256', '512', '1024', '2048'];

            if (validSizes.includes(size)) {
              return true;
            }

            return `Has to be one of ${validSizes.join(', ')}`;
          }
        }
      ]
    });
  }

  fetchExt (str) {
    return str.substring(str.length - 14, str.length - 8);
  }

  run (msg, args) {
    const ava = args.member.user.displayAvatarURL({size: args.size}),
      embed = new Discord.MessageEmbed(),
      ext = this.fetchExt(ava);

    embed
      .setColor(args.member.displayHexColor ? args.member.displayHexColor : msg.member.displayHexColor)
      .setImage(ext.includes('gif') ? `${ava}&f=.gif` : ava)
      .setTitle(args.member.displayName)
      .setURL(ava)
      .setDescription(`[Direct Link](${ava})`);

    deleteCommandMessages(msg, this.client);

    return msg.embed(embed);
  }
};