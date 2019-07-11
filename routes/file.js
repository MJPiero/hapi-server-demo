const fs = require('fs');
const multiparty = require('multiparty');

const upload = function(files, reply) {
    fs.readFile(files.file[0].path, function(err, data) {
        checkFileExist();
        fs.writeFile(Config.MixInsideFolder + files.file[0].originalFilename, data, function(err) {
            if (err) return reply(err);
            else return reply('File uploaded to: ' + Config.MixInsideFolder + files.file[0].originalFilename);

        });
    });
};

module.exports = [
    {
        method: 'POST',
        path: '/api/uploadfiles',
        handler: (request, reply)=>{
            let form = new multiparty.Form();
            form.parse(request.payload, function(err, fields, files) {
                if (err){
                    return reply(err);
                }else{
                    upload(files, reply);
                }
            });
        },
        options: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            }
        }
    },
    // 静态页面
    {
        path: '/view/{param*}',
        method: 'GET',
        handler: {
            directory: {
                path: './view',
                index: true,
            }
        }
    }
]