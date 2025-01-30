
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads');
  },
  filename: (req, file, cb) => {
    if (!file.originalname) {
      cb(new Error('Arquivo não enviado'));
    } else {
      const extensoesPermitidas = ['.png', '.jpg', '.jpeg'];
      const extensaoArquivo = file.originalname.substring(file.originalname.lastIndexOf('.'));
      if (!extensoesPermitidas.includes(extensaoArquivo.toLowerCase())) {
        cb(new Error('Tipo de arquivo não permitido'));
      } else {
        const filename = `${Date.now()}${Math.random().toString(36).substr(2, 9)}${file.originalname}`;
        cb(null, filename);
      }
    }
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

module.exports = upload;
