import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import { app } from '@/stores/firebase-config'

const storage = getStorage(app);


export async function uploadFile(file) {
  const storageRef = ref(storage, 'images/' + file.name);
  await uploadBytes(storageRef, file);
  return storageRef.fullPath
}

export async function loadFile(path){
  const url = await getDownloadURL(ref(storage, path))
  return url
}