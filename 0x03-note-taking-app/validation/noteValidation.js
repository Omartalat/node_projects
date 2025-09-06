const { z } = require('zod');

const createNoteSchema = z.object({
  title: z.string(),
  content: z.string().optional()
});

exports.validateCreateNote = (req, res, next) => {
  const result = createNoteSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: 'fail',
      errors: result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
  }

  req.validatedBody = result.data;
  next();
};

const updateNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional()
});

exports.validateUpdateNote = (req, res, next) => {
  const result = updateNoteSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: 'fail',
      errors: result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
  }

  req.validatedBody = result.data;
  next();
};
