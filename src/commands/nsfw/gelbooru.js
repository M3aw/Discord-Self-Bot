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

const booru = require('booru'),
  {Command} = require('discord.js-commando'),
  {deleteCommandMessages} = require('../../util.js');

module.exports = class gelbooruCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'gelbooru',
      memberName: 'gelbooru',
      group: 'nsfw',
      aliases: ['gel', 'booru'],
      description: 'Find NSFW Content on gelbooru',
      format: 'NSFWToLookUp',
      examples: ['gelbooru Pyrrha Nikos'],
      guildOnly: false,
      nsfw: true,
      args: [
        {
          key: 'nsfwtags',
          prompt: 'What do you want to find NSFW for?',
          type: 'string'
        }
      ]
    });
  }

  async run (msg, args) {
    try {
      const booruData = await booru.search('gelbooru', args.nsfwtags.split(' '), {
        limit: 1,
        random: true
      }).then(booru.commonfy);

      if (booruData) {
        deleteCommandMessages(msg, this.client);

        return msg.say(`Score: ${booruData[0].common.score}\nImage: ${booruData[0].common.file_url}`);
      }

      return msg.reply('⚠️ No juicy images found.');
    } catch (BooruError) {
      return msg.reply('⚠️ No juicy images found.');
    }
  }
};