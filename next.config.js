/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  api: {
    externalResolver: true,
  },
};

module.exports={
  env:{
    "BASE_URL": "http://localhost:3000",
    "MONGODB_URL":"mongodb+srv://aditya4sure:NewPassword@casino.0r9lzep.mongodb.net/?retryWrites=true&w=majority",
    "ACCESS_TOKEN_SECRET":"shfhxcbhjbdscxhjvbrv784ne89jf304wejtnf93now4ehsidnfuev4nr7isdtfhu3iqwr0jd3p9we0rfjw4niegsrubfyd",
    "REFRESH_TOKEN_SECRET":"9sjdj38dj8dujeirjd93wq0qi02qi02ie93ie9384fh75yrhncvnsnvjxcjncjxdjksnI*O#*Jjdwjd0wjdiwfvkxc"
  }
}