import { Client, Databases } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6579b2183d70a2156078');

export const databaseId = import.meta.env.VITE_DATABASEID

export const databases = new Databases(client);

