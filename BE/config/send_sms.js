const accountSid = 'ACeb18a84806c7f3cffce9968fcf36d9fc';
const authToken = '09c8b88c26da31d213d8a34565a9467f';
const client = require('twilio')(accountSid, authToken);


exports.twilios = (number, otp) =>
    client.messages
        .create({
            body: `Your One Time Password is ${otp}`,
            from: '+12566346778',
            to: number
        })


