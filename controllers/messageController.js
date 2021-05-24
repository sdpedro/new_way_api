const model = require("../models").messages;
const { Op, Sequelize } = require("sequelize");

exports.list = async(req, res, next) => {
    try {
        console.log(req.query);
        let where = {};
        let from = req.query.from ? req.query.from.toString().replace(/[^0-9]/g, "") : "";
        if (parseInt(from)) {
            where.from = parseInt(from);
        }
        let target_id = req.query.target_id ? req.query.target_id.toString().replace(/[^0-9]/g, "") : "";
        if (parseInt(target_id)) {
            where.target_id = parseInt(target_id);
        }
        if (req.query.media !== undefined) {
            where.media = req.query.media ? true : false;
        }
        if (req.query.message) {
            where.message = Sequelize.where(
                Sequelize.fn('lower', Sequelize.col('message')), {
                    [Op.like]: '%' + req.query.message.toLowerCase() + '%'
                }
            )
        }
        const result = await model.findAll({ where: where });
        res.status(201).send({ error: true, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: error.message });
    }
};

exports.create = async(req, res, next) => {
    try {
        let from = req.body.from ? req.body.from.toString().replace(/[^0-9]/g, "") : "";
        if (!from) {
            return res.status(400).send({ error: true, message: 'Requisição invalida!!!' });
        }
        let target_id = req.body.target_id ? req.body.target_id.toString().replace(/[^0-9]/g, "") : "";
        if (!target_id) {
            res.status(400).send({ error: true, message: 'Requisição invalida!!!' });
        }
        let media = req.body.media ? true : false;
        let message = req.body.message.toString();
        if (message > 255) {
            return res.status(400).send({ error: true, message: `Mensagem atual(${message.length}) ultrapassa o tamanho permitido(255)` });
        }
        let save = await model.create({
            from: parseInt(from),
            target_id: target_id,
            media: media,
            message: message
        });
        return res.status(201).send({ error: false, data: save });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: true, message: error.message });
    }
};