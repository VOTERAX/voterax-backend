import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB max file size
  },
});

const fileFilter = (
  fieldname: string,
  allowedMimeTypes?: string[],
  isRequired: boolean = true,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // if (isRequired && !req.file) {
    //   return res.status(400).json({ message: `${fieldname} is required` });
    // }

    if (
      req.file &&
      allowedMimeTypes &&
      !allowedMimeTypes.includes(req.file.mimetype.split('/')[0])
    ) {
      return res.status(400).json({
        message: `File type not allowed. Allowed types: ${allowedMimeTypes.join(', ')}`,
      });
    }

    next();
  };
};

const singleFileUpload = (
  fieldname: string,
  allowedMimeTypes?: string[],
  isRequired: boolean = true,
) => [
  upload.single(fieldname),
  fileFilter(fieldname, allowedMimeTypes, isRequired),
];

const multipleFileUpload = (
  fieldname: string,
  isRequired: boolean = true,
  allowedMimeTypes: string[],
  maxCount: number | undefined,
) => [
  upload.array(fieldname),
  (req: Request, res: Response, next: NextFunction) => {
    const length = (req.files as Express.Multer.File[])?.length || 0;
    if (isRequired && (!req.files || !length)) {
      return res.status(400).json({ message: `${fieldname} is required` });
    }

    if (maxCount && length > maxCount) {
      return res
        .status(400)
        .json({ message: `Files cannot be more that ${maxCount}` });
    }

    if (length) {
      const files = req.files as Express.Multer.File[];
      for (const file of files) {
        if (
          allowedMimeTypes &&
          !allowedMimeTypes.includes(file.mimetype.split('/')[0])
        ) {
          return res.status(400).json({
            message: `File type not allowed. Allowed types: ${allowedMimeTypes.join(', ')}`,
          });
        }
      }
    }

    next();
  },
];


const multipleFieldsUploadWithDifferentName = (
  fields: { name: string; maxCount: number }[],
  allowedMimeTypes: string[],
  isRequired: boolean = true
) => [
  upload.fields(fields),
  (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (isRequired) {
      for (const field of fields) {
        if (!files || !files[field.name] || !files[field.name].length) {
          return res
            .status(400)
            .json({ message: `${field.name} is required` });
        }
      }
    }

    // Validate file types
    for (const key in files) {
      for (const file of files[key]) {
        if (
          allowedMimeTypes &&
          !allowedMimeTypes.includes(file.mimetype.split('/')[0])
        ) {
          return res.status(400).json({
            message: `File type not allowed. Allowed types: ${allowedMimeTypes.join(', ')}`,
          });
        }
      }
    }

    next();
  },
];




export { upload, singleFileUpload, multipleFileUpload, multipleFieldsUploadWithDifferentName };
