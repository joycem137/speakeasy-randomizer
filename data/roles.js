/**
 * This is the list of roles in the game
 */

const roles = [
    {
        name: "Femme Fatale",
        power: "You have 15 minutes after the start of the game to choose which team is yours. Report your decision to the Moderator to reeive a Password Card of that team."
        disableRat: true,
        doesNotRequirePair: true,
        max: 2,
        image: "femmefatale.png",
        increasesDeception: true
    },
    {
        mob: {
            name: "Lookout",
            image: "lookout.png"
        },
        fed: {
            name: "Dispatcher",
            image: "dispatcher.png"
        },
        increasesKnowledge: true,
        max: 2,
        power: "The Moderator will reveal the identities of two roles of your choosing"
    },
    {
        mob: {
            name: "Boss",
            image: "boss.png"
        },
        fed: {
            name: "Federal Marshal",
            image: "federal marshal.png"
        },
        max: 1,
        increasesKnowledge: true,
        power: "You start the game with all your team's passwords."
    },
    {
        mob: {
            name: "Consigliere",
            image: "consigliere.png"
        },
        fed: {
            name: "Untouchable",
            image: "untouchable.png"
        },
        max: 2,
        power: "You are immune to powers that require your password to be used."
    },
    {
        mob: {
            name: "Corrupt Politician",
            image: "corrupt politician.png"
        },
        fed: {
            name: "Senator",
            image: "senator.png"
        },
        max: 2,
        power: "The Moderator will reveal to you the passwords of two players of your choosing.",
        increasesKnowledge: true
    },
    {
        mob: {
            name: "Interrogator",
            image: "interrogator.png"
        },
        fed: {
            name: "Internal Affairs",
            image: "internal affairs.png"
        },
        max: 1,
        increasesKnowledge: true,
        power: "Name two players to the Moderator to find out if they are a Rat or not."
    },
    {
        mob: {
            name: "Thief",
            image: "thief.png"
        },
        fed: {
            name: "Vigilante",
            image: "vigilante.png"
        },
        increasesDeception: true,
        increasesAction: true,
        max: 2,
        power: "If another player uses a Power Card to make you reveal your role or your password, you may take a Point Card from them."
    },
    {
        mob: {
            name: "Hitman",
            image: "hitman.png"
        },
        fed: {
            name: "Enforcer",
            image: "enforcer.png"
        },
        increasesDeception: true,
        increasesAction: true,
        max: 2,
        power: "You can choose one extra Power Card for free."
    },
    {
        mob: {
            name: "Bootlegger",
            image: "bootlegger.png",
            power: "If the Whiskey Shipment is still in your possession at the end of the game, your team will receive a bonus. Only the Temperance Crusader can take it from you."
        },
        fed: {
            name: "Temperance Crusader",
            image: "temperance crusader.png",
            power: "If you find the Bootlegger, reveal your role to that player and draw three cards from him or her. If one of them is the Whiskey Shiment, take it for a bonus to your team' score. If not, return the cards."
        },
        max: 1,
        increasesAction: true
    },
    {
        mob: {
            name: "Falconer",
            image: "falconer.png"
        },
        fed: {
            name: "Special Agent X",
            image: "special agent x.png"
        },
        increasesAction: true,
        max: 1,
        power: "The Moderator will give you a target role on the Feds. Identify the player who has that role to receive bonus points and another target (up to three targets per game). You get one guess per target. If you guess incorrectly, you do not get another target."
    },
    {
        mob: {
            name: "Speakeasy Owner"
        },
        fed: {
            name: "Informant"
        },
        max: 1,
        increasesDeception: true,
        increasesKnowledge: true,
        power: "Gain two Point Cards from the Moderator if you can : (1) Identify all the opposing team's passwords or (2) Identify the Federal Marshal/Boss. You can gain up to four points this way."
    },
    {
        mob: {
            name: "Mob's Lawyer",
            image: "mob lawyer.png"
        },
        fed: {
            name: "District Attorney",
            image: "district attorney.png"
        },
        max: 1,
        power: "If any player voluntarily shows you either their role or password, they must also show you the other as well."
    },
    {
        mob: {
            name: "Con Artist",
            image: "con artist.png"
        },
        fed: {
            name: "Undercover Cop",
            image: "undercover cop.png"
        },
        increasesDeception: true,
        max: 2,
        power: "Receive one of the other team's Password Cards from the Moderator once per game."
    },
    {
        mob: {
            name: "Evil Backer",
            image: 'evil backer.png"'
        },
        fed: {
            name: "Backer",
            image: 'backer.png"'
        },
        max: 1,
        increasesAction: true,
        power: "You begin the game with extra Point Cards. Use them wisely."
    }
];

module.exports = roles;