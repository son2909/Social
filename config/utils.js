module.exports = {
	port: 3002,
	db: 'mongodb+srv://ahtuser:Admin1324@quanlytruonghoc-urj1l.mongodb.net/i-social?retryWrites=true&w=majority',
	localDB: 'mongodb://localhost:27017/social_aht',
	secret: 'i-social-aht',
	saltRounds: 10,
	accessKeyId: process.env.accessKeyId,
	secretAccessKey: process.env.secretAccessKey,
	Bucket: 'image-s3-son',
	endpoint_redis: 'redis-15926.c54.ap-northeast-1-2.ec2.cloud.redislabs.com',
	port_redis: 15926,
	auth_redis: 'XBWV4ljgqTPc5PTeQLVBXr1i7neBpTIF',
	LOCALE: ["vi", "en"],
	saltRounds: 10,
	algorithm: "HS512"

}