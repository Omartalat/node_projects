const Note = require('./../models/noteModel');
const catchAsync = require('./../utils/catchAsync');
const sendResponse = require('./../utils/sendResponse');

exports.createNote = catchAsync(async (req, res, next) => {
  const note = await Note.create(req.validatedBody);

  sendResponse(res, 201, note, null, 'Note created Successfully.');
});

exports.getNote = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.id);
  if (!note) return sendResponse(res, 404, null, null, 'note not found');

  sendResponse(res, 200, note);
});

exports.getAllNote = catchAsync(async (req, res, next) => {
  const notes = await Note.find();

  sendResponse(res, 200, notes);
});

exports.updateNote = catchAsync(async (req, res, next) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.validatedBody, {
    new: true
  });

  if (!note) return sendResponse(res, 404, null, null, 'note not found');

  sendResponse(res, 200, note);
});

exports.deleteNote = catchAsync(async (req, res, next) => {
  const note = await Note.findByIdAndDelete(req.params.id);

  if (!note) return sendResponse(res, 404, null, null, 'note not found');

  sendResponse(res, 204);
});
