require('aws-sdk/lib/maintenance_mode_message').suppress = true;
import 'dotenv/config'
import AWS from 'aws-sdk'

AWS.config.update({
    region: "us-east-1"
})

export const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1",
})

// const staticHostParams = {
//     Bucket: '',
//     WebsiteConfiguration: {
//         ErrorDocument: {
//             Key: ''
//         },
//         IndexDocument: {
//             Suffix: ''
//         }
//     }
// }