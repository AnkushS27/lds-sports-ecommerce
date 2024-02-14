import { MongoClient, MongoClientOptions } from "mongodb";

const db_URI: string = process.env.MONGODB_CLUSTER_URL as string;

const client = new MongoClient(db_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as MongoClientOptions);

export async function ConnectDatabase() {
    try {
        await client.connect();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}
export async function CloseDatabase() {
    try {
        await client.close();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

interface TestDataType {
    id: string,
    name: string,
    desc: string,
    company: string,
    tags: string[],
    price: string,
}

const db = client.db('LDS');
const collection = db.collection<TestDataType>('Test Data'); // Specify the type for collection

export async function AddData(data: TestDataType) {
    await ConnectDatabase();
    try {
        await collection.insertOne(data);
        console.log('Successfully stored data');
    } catch (error) {
        console.error('Error storing data:', error);
    }
    await CloseDatabase();
}

export async function getData() {
    await ConnectDatabase();
    try {
        const data = await collection.find({}).toArray(); // Convert cursor to array
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return [];
    }
    await CloseDatabase();
}
