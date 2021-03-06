
// Imports the Google Cloud client library
const PubSub = require(`@google-cloud/pubsub`);

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.helloEvent = (req, res) => {

  console.log('Hello, here\'s the data I received',req.body);

	res.send("I Work!")
};

/**
 * Background Cloud Function to be triggered by Pub/Sub that does an operation then publishes a topic to another Pub/Sub.
 *
 * @param {object} event The Cloud Functions event.
 * @param {function} callback The callback function.
 */
exports.doStuffThenPubSub = (event, callback) => {
  // Get message from pubsub 1
  const pubsubMessage = event.data;
  const name = pubsubMessage.data ? Buffer.from(pubsubMessage.data, 'base64').toString() : '???';

  console.log(`I got this from, ${name}!`);

  // Forward message to pubsub 2

	// Creates a client
	const pubsub = new PubSub();

	const topicName = 'naguib-testing-2';
	const data = JSON.stringify({ "sourceTopic": name });

	// Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
	const dataBuffer = Buffer.from(data);

	pubsub
	  .topic(topicName)
	  .publisher()
	  .publish(dataBuffer)
	  .then(results => {
	    const messageId = results[0];
	    console.log(`Message ${messageId} published.`);
	  })
	  .catch(err => {
	    console.error('ERROR:', err);
	  });

  

  callback();
};

/**
 * HTTP  Cloud Function that prints Env Variables.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.helloEnvVariable = (req, res) => {
	let envVariable = process.env.MY_ENV;

	if(envVariable){
  	console.log('I can see your env variables <--(o).(o)--> ',envVariable,process.env);	
	} else {
		console.log('I can\'t see your env variables <--(-).(-)--> ',envVariable,process.env);	
	}

  res.send("Env received: "+envVariable);
};