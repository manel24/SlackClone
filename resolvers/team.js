import user from "./user";

export default {

    Mutation: {
        createTeam: (parent, args, { models, user }) => {
            try {
                models.Team.create({...args, owner: user.id})
                return true;
            } catch (error) { console.log(error); return false; }
        }
    },

    Query: {
        getTeam: (parent, { id }, { models }) => models.Team.findOne({ where: { id } }),

        allTeams: (parent, args, { models }) => models.Team.findAll()
    }

};

