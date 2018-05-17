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

const {Command} = require('discord.js-commando'),
  {oneLine} = require('common-tags'),
  {deleteCommandMessages} = require('../../util.js');

module.exports = class webhookexclusionsCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'webhookexclusions',
      memberName: 'webhookexclusions',
      group: 'provider',
      aliases: ['whe', 'hookexclusions'],
      description: 'Configure the keywords to be avoided in your Webhook Notification System (WNS)',
      format: 'user,name,nick,name',
      examples: ['webhookexclusions Fantasy'],
      guildOnly: false,
      args: [
        {
          key: 'exclusions',
          prompt: 'What keyword should be filtered for Webhook Notification System?',
          type: 'string',
          label: 'exclusions for WNS'
        }
      ]
    });
  }

  run (msg, args) {
    this.client.provider.set('global', 'webhookexclusions', args.exclusions.split(','));

    deleteCommandMessages(msg, this.client);

    return msg.reply(oneLine`\`${args.exclusions.replace(/,/gim, ', ')}\` excluded from WNS. 
        Make sure to enable webhooks with the \`${msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix}webhooktoggle\`
        and set your keywords with the \`${msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix}webhookkeywords\` command`);
  }
};