   
function hash(pass) {
    var CryptoJS = require("crypto-js");
    return CryptoJS.MD5(pass).toString()
}

export default hash