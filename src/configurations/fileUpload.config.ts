import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface"
import { diskStorage } from "multer"
import * as path from "path"
import { ApiError } from "../common/constants/errors"
import { BadRequestException } from "@nestjs/common"

export const FileUploadConfig: MulterOptions = {
  storage: diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    },
  }),
  limits: {
    fileSize: 1000 * 1000,
  },
  fileFilter: (req, file, cb) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/
    // Check ext
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    )
    // Check mime
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype && extname) return cb(null, true)
    else return cb(new BadRequestException(ApiError.FILE_TYPE), false)
  },
}
