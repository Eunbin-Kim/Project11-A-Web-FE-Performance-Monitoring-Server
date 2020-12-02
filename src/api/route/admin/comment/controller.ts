import { Response, Request, NextFunction } from 'express';

import createService from '@services/comment/createComment';
import updateService from '@services/comment/updateComment';
import deleteService from '@services/comment/deleteComment';
import { UserToken } from '@interfaces/userToken';

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { _id } = req.user as UserToken;
  const { comment, issueId } = req.body;
  if (!comment) {
    return next(new Error('내용을 입력하세요.'));
  }
  try {
    await createService(_id, issueId, comment);
    return res.status(201).end();
  } catch (err) {
    next(new Error(err));
  }
};

const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { _id } = req.user as UserToken;
  const { commentId } = req.params;
  const { comment } = req.body;
  if (!comment) {
    return next(new Error('내용을 입력하세요.'));
  }
  try {
    await updateService(_id, commentId, comment);
    return res.status(200).end();
  } catch (err) {
    next(new Error(err));
  }
};

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { _id } = req.user as UserToken;
  const { commentId } = req.params;
  try {
    await deleteService(_id, commentId);
    return res.status(200).end();
  } catch (err) {
    next(new Error(err));
  }
};

export default { createComment, deleteComment, updateComment };