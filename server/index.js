const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const colors = require('colors');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

const app = express();

// Connect to DB
connectDB();
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === 'DEVELOPMENT',
		// rootValue: root,
	})
);

app.listen(port, console.log(`Server running on port ${port}`));
