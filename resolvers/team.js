import user from "./user";
import formatErrors from "../formatErrors/formatErrors";
import requiresAuth from "../permissions";
export default {

    Mutation: {
        createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
            try {
                await models.Team.create({ ...args, owner: user.id })
                return {
                    ok: true,
                };
            } catch (error) {
                console.log(error);

                return {
                    ok: false,
                    errors: formatErrors(error)
                };
            }
        })
    },

    Query: {
        getTeam: (parent, { id }, { models }) => models.Team.findOne({ where: { id } }),

        allTeams: (parent, args, { models }) => models.Team.findAll()
    }

};

