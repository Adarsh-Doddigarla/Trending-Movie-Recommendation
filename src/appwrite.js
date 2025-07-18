import { Client, Databases, Query } from 'appwrite';
const DATABASE_ID=import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID=import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID=import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client=new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database=new Databases(client);

export const updateSearchCount= async(searchTerm,movie)=>{
    // Function to update the search count in the Appwrite database
    try {
        // Check if the searchTerm already exists in the database
        const result =await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal ('searchTerm', searchTerm),
        ])
        // Check if the document already exists
        if(result.documents.length> 0){
            const doc=result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            })
        }
        // If the document does not exist, create a new one
        else{
            await database.createDocument(DATABASE_ID, COLLECTION_ID, 'unique()', {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            });
        }
    } catch (error) {
        console.error(error);
    }
}


export const getTrendingMovies = async () => {
    try {
        const result= await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])
        return result.documents;
    } catch (error) {
        console.error(error);
    }
}