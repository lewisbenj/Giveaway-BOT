const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const ms = require('ms');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('All of the giveaway utilities you need')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers)
        .addSubcommand(subcommand =>
            subcommand
                .setName('start')
                .setDescription('Starts the giveaway')
                .addStringOption(option => option.setName('reward').setDescription('The reward of the giveaway').setRequired(true))
                .addStringOption(option => option.setName('duration').setDescription('The duration of the giveaway').setRequired(true))
                .addIntegerOption(option => option.setName('winners').setDescription('The number of winners.').setRequired(true).setMinValue(1))
                .addUserOption(option => option.setName('host').setDescription('The user who is hosting the giveaway'))
                .addAttachmentOption(option => option.setName('thumbnail').setDescription('Add a thumbnail to the giveaway embed.')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('reroll')
                .setDescription('Picks a new giveaway winner')
                .addStringOption(option => option.setName('message-id').setDescription('The message ID of the giveaway you want to reroll.').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('pause')
                .setDescription('Pauses an ongoing giveaway')
                .addStringOption(option => option.setName('message-id').setDescription('The message ID of the giveaway you want to pause.').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('resume')
                .setDescription('Resumes a paused giveaway')
                .addStringOption(option => option.setName('message-id').setDescription('The message ID of the giveaway you would like to resume.').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('end')
                .setDescription('Ends a giveaway.')
                .addStringOption(option => option.setName('message-id').setDescription('The message ID of the giveaway you would like to resume.').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('cancel')
                .setDescription('Stops a giveaway.')
                .addStringOption(option => option.setName('message-id').setDescription('The message ID of the giveaway that you want to cancel.').setRequired(true))),
    async slashRun(client, interaction) {

        if(interaction.options.getSubcommand() === "start"){

            const reward = interaction.options.getString('reward')
            const duration = interaction.options.getString('duration')
            const winners = interaction.options.getInteger('winners')
            const host = interaction.options.getUser('host')
            const thumbnail = interaction.options.getAttachment('thumbnail')

            if(isNaN(ms(duration))) {return interaction.reply({ content: 'Could not parse the duration!', ephemeral: true });}

            await client.giveawaysManager.start(interaction.channel, {
                duration: ms(duration),
                prize: reward,
                winnerCount: winners,
                hostedBy: host ? host : interaction.user,
                thumbnail: thumbnail ? thumbnail.url : null,
                messages: {
                    giveaway: "🎉 **GIVEAWAY** 🎉",
                    giveawayEnded: "🎉 **GIVEAWAY OVER** 🎉",
                    drawing: "Giveaway ends {timestamp}",
                    inviteToParticipate: "Bấm vào 🎉 để pick Giveaways nhé các bạn",
                    winMessage: "🎉 Xin chúc mừng, {winners}! Bạn đã trúng **{this.prize}**!",
                }
            })

            interaction.reply({content: 'Bắt đầu tổ chức Giveaways...'})
        }

        if(interaction.options.getSubcommand() === 'reroll'){
            const messageID = interaction.options.getString('message-id')

            await client.giveawaysManager
                .reroll(messageID,{
                         messages: {
                            congrat: '🎉 New winner(s): {winners}! Xin chúc mừng, Bạn đã trúng **{this.prize}**!'
                         }
                })
                .then(() => {
                    return interaction.reply({content: 'Picking a new winner...', ephemeral: true});
                })
                .catch((err) => {
                    return interaction.reply({content: `I\'ve ran into an error!\n\`\`${err}\`\``, ephemeral: true});
                });

            interaction.reply({content:"Rerolling giveaway...", ephemeral: true})
        }

        if(interaction.options.getSubcommand() === 'pause'){
            const messageID = interaction.options.getString('message-id')

            const giveaway = client.giveawaysManager.giveaways.find((giveaway) => giveaway.messageId === messageID && giveaway.guildId === interaction.guild.id);
            if (giveaway.pauseOptions.isPaused) return interaction.reply({content: 'This giveaway is already paused!', ephemeral: true})

            if(!giveaway) return interaction.reply({content: 'Couldn\'t parse the input message id!', ephemeral: true})

            client.giveawaysManager
                .pause(messageID)
                .then(() => {
                    return interaction.reply({content: 'Đã dừng Giveaways thành công.', ephemeral: true});
                })
                .catch((err) => {
                    return interaction.reply({content: `I\'ve ran into an error!\n\`\`${err}\`\``, ephemeral: true});
                });


        }

        if(interaction.options.getSubcommand() === 'resume'){
            const messageID = interaction.options.getString('message-id')

            const giveaway = client.giveawaysManager.giveaways.find((giveaway) => giveaway.messageId === messageID && giveaway.guildId === interaction.guild.id);
            if (!giveaway.pauseOptions.isPaused) return interaction.reply({content: 'This giveaway is already running.', ephemeral: true})

            if(!giveaway) return interaction.reply({content: 'Couldn\'t parse the input message id!', ephemeral: true})

            client.giveawaysManager
                .unpause(messageID)
                .then(() => {
                    return interaction.reply({content: 'Đã tiếp tục tổ chức Giveaways thành công.', ephemeral: true});
                })
                .catch((err) => {
                    return interaction.reply({content: `An unusual error has occurred!\n\`\`${err}\`\``, ephemeral: true});
                });

        }

        if(interaction.options.getSubcommand() === 'end'){
            const messageID = interaction.options.getString('message-id')

            const giveaway = client.giveawaysManager.giveaways.find((giveaway) => giveaway.messageId === messageID && giveaway.guildId === interaction.guild.id);

            if(!giveaway) return interaction.reply({content: 'Couldn\'t parse the input message id!', ephemeral: true})

            client.giveawaysManager
                .end(messageID)
                .then(() => {
                    return interaction.reply({content: 'Giveaways đã kết thúc.', ephemeral: true});
                })
                .catch((err) => {
                    return interaction.reply({content: `Đã xảy ra lỗi bất thường!\n\`\`${err}\`\``, ephemeral: true});
                });

        }

        if(interaction.options.getSubcommand() === 'stop'){
            const messageID = interaction.options.getString('message-id')

            const giveaway = client.giveawaysManager.giveaways.find((giveaway) => giveaway.messageId === messageID && giveaway.guildId === interaction.guild.id);

            if(!giveaway) return interaction.reply({content: 'Couldn\'t parse the input message id!', ephemeral: true})

            client.giveawaysManager
                .delete(messageID)
                .then(() => {
                    return interaction.reply({content: 'Giveaways đã bị hủy.', ephemeral: true});
                })
                .catch((err) => {
                    return interaction.reply({content: `An unusual error has occurred!\n\`\`${err}\`\``, ephemeral: true});
                });
        }


    }
};
