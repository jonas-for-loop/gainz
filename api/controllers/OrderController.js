/**
 * OrderControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    showFirstPage: function (req, res) {
        sails.log.debug(`Starting order process`)
        let basket = req.session.basket
        let priceSum = 0;
        for (var i = 0, size = basket.length; i < size; i++) {
            let item = basket[i];
            priceSum += item.price;
        }
        res.view('pages/order/step1', { priceSum: priceSum });
    },
    order: async function (req, res) {

        let basket = req.session.basket
        let priceSum = 0;
        for (var i = 0, size = basket.length; i < size; i++) {
            let item = basket[i];
            priceSum += item.price;
        }

        sails.log.debug(priceSum);

        sails.log.debug(req.allParams());
        let param = {
            vorname: req.param('vorname'),
            name: req.param('name'),
            strasse: req.param('strasse'),
            stadt: req.param('stadt'),
            plz: req.param('plz'),
            product: req.session.basket,
            customer: req.session.userId,
            price: priceSum
        };

        sails.log.debug(param);

        await Order.create(param).then(() => {

            req.session.basket = [];
            res.redirect('/order/step2');
        }).catch(
            (err) => {
                sails.log.debug("Error" + err.message)
                res.view('/order/basket', {
                    "message": err.message, "name":
                        req.body.name, "Name": req.body.name
                })
            }
        );

    },
    showSecondPage: function (req, res) {
        sails.log.debug(`Last step of order process`)
        res.view('pages/order/step2');
    },

    find: async function (req, res) {
        sails.log.debug("List all orders")
        let orders = await Order.find()
        res.view('pages/order/orders', { orders: orders });
    },


    findUserOrders: async function (req, res) {
        sails.log.debug("List all orders from this account")
        const currentUser = await User.findOne({ id: req.session.userId });
        const orders = await Order.find({ customer: currentUser.id });
        return res.view('pages/order/orders', { currentUser: currentUser, orders: orders });
    }

};

