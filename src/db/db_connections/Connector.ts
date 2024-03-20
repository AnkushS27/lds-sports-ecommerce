import mongoose from 'mongoose';

const db_URI: string = process.env.MONGODB_CLUSTER_URL as string;

export async function ConnectDatabase(){
    try {
        await mongoose.connect(db_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })
    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
    }
}


// export async function CloseDatabase() {
//     try {
//         await client.close();
//     } catch (error) {
//         console.error('Error connecting to the database:', error);
//     }
// }

// interface TestDataType {
//     id: string,
//     name: string,
//     desc: string,
//     company: string,
//     tags: string[],
//     price: string,
// }

// const db = client.db('LDS');
// const collection = db.collection<TestDataType>('Test Data'); // Specify the type for collection

// export async function AddData(data: TestDataType) {
//     await ConnectDatabase();
//     try {
//         await collection.insertOne(data);
//         console.log('Successfully stored data');
//     } catch (error) {
//         console.error('Error storing data:', error);
//     }
//     await CloseDatabase();
// }

// export async function getData() {
//     await ConnectDatabase();
//     try {
//         const data = await collection.find({}).toArray(); // Convert cursor to array
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.error('Error retrieving data:', error);
//         return [];
//     }
//     await CloseDatabase();
// }
