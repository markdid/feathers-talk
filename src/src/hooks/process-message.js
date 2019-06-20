// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context;

    //no text error
    if(!data.text) {
      throw new Error('A message must have a text');
    }

    //authenticated user
    const user = context.params.user;
    //message text
    const text = context.data.text
      .substring(0,400);

    
    context.data = {
      text,
      userId: user._id,
      createdAt: new Date().getTime()
    };

    return context;
  };
};
