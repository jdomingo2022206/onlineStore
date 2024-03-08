import { dbConnection } from './cnn_data.js';

async function getUrlConnectionStoreSelected(storeId) {
    // Aquí podrías tener una lógica para obtener la URL de conexión
    // basada en el ID de la tienda seleccionada
    // Por ejemplo, podrías tener un mapa que asocie IDs de tiendas con URLs de conexión
    const stores = {
        store1: 'mongodb://localhost:27017/store1',
        store2: 'mongodb://localhost:27017/store2',
        store3: 'mongodb://localhost:27017/store3'
    };
    // Verificar si el ID de la tienda existe en el mapa
    if (storeId && stores.hasOwnProperty(storeId)) {
        const storeMongodbUrl = stores[storeId];
        await dbConnection(storeMongodbUrl); // Llamamos a dbConnection con la URL de conexión correspondiente
    } else {
        throw new Error('Store ID not valid or not found');
    }
}
