module.exports = {


  friendlyName: 'View homepage or redirect',


  description: 'Display or redirect to the appropriate homepage, depending on login status.',


  exits: {

    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/homepage'
    },

    redirect: {
      responseType: 'redirect',
      description: 'Requesting user is logged in, so redirect to the internal welcome page.',
      viewTemplatePath: 'pages/homepage'
    },

  },


  fn: async function () {

    let products = await Product.find({limit: 4} );
    /*
    if (this.req.me) {
      throw {redirect:'/'};
    }*/


    return {products};

  }


};
