import * as Joi from 'joi';

export default Joi.object({
  PORT: Joi.number().required(),
});
