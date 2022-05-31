import { getDatabase, ref, onValue, set } from 'firebase/database'

//Хук для работы с firebaseAPI(В разработке)

export const useFirebase = () => {
    const database = getDatabase();

    const subscribeDatabase = (path, action) => {

        const Ref = ref(database, path);

        const unsubscribe = onValue(Ref, (snapshot) => {
            const data = snapshot.val();
            dispatch(action(data));
        });

        return unsubscribe;
    }

    const setData = (path, data) => {
        
    }

    return { subscribeDatabase }
}