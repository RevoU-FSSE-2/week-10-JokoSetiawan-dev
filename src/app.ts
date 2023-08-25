import express from "express";
import "dotenv/config"
import bodyParser from "body-parser";
import { MongoClient, Db } from 'mongodb'

const app = express();
const port = process.env.PORT;
const url = 'mongodb://localhost:27017';
const dbName = 'week10assignment';

async function connect() {
    const client = new MongoClient(url);
  
    try {
      await client.connect();
      console.log('Connected to MongoDB server');
      return client.db(dbName);
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      throw err;
    }
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });