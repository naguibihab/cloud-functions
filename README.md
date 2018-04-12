# Google Cloud Functions

## Usage

### `helloEvent()`
A simple basic function that prints out the event data triggered by http

##### To deploy the function `yarn deploy-with-env`

### `doStuffThenPubSub()`
Here we have two functions that are working off two pubsubs. Pubsub1 triggers doStuffThenPubSub which publishes to Pubsub2 which triggers helloPubSub

##### To deploy the function `yarn deploy-with-topic``