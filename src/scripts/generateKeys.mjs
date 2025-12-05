// import fs from "node:fs";
// import crypto from "node:crypto";
// import { dirname, join } from "node:path";
// import { fileURLToPath } from "node:url";

// const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
//    modulusLength: 2048,
//    publicKeyEncoding: {
//       type: "pkcs1",
//       format: "pem",
//    },
//    privateKeyEncoding: {
//       type: "pkcs1",
//       format: "pem",
//    },
// });

// const fileName = fileURLToPath(import.meta.url)
// const __dirname = dirname(fileName)

// const publicPath = join(__dirname,'../certs/public.pem')
// const privatePath = join(__dirname,'../certs/private.pem')
// fs.writeFileSync(privatePath,privateKey)
// fs.writeFileSync(publicPath,publicKey)