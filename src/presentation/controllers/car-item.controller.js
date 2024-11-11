const CarItemService = require('../../services/car-item.service');

const CarItemController = {
	async create(req, res, next) {
		try {
			const items = await CarItemService.create(req.body, req.params.id);
			console.log(req.body, req.params.id);
			res.status(204).json(items);
		} catch (error) {
			next(error);
		}
	},
};
module.exports = CarItemController;
