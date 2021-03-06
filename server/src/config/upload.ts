import crypto from 'crypto';
import Multer from 'multer';
import path from 'path';

export default {
  storage: Multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename(req, file, cb) {
      const filename = crypto.randomBytes(18).toString('hex');
      const fileExtension = 'jpg';
      cb(null, `${filename}.${fileExtension}`);
    },
  }),
};
