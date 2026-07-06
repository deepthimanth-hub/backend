import multer from 'multer'

//multer contains different storage engines, we temporarily store in our local server and then upload it through cloudinary

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log("Destination called");
        console.log(file);
        cb(null, './public/temp')
    },
    filename: function(req, file, cb) {
        console.log("Filename called:", file.originalname);
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage: storage })