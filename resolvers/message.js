export default {
    Mutation: {
        createMessage: async (parent, args, { models }) => {
            try {
                await models.Message.create(args)
                return true;

            } catch (error) {
                console.log(error)
                return false;
            }

        }
    }
}