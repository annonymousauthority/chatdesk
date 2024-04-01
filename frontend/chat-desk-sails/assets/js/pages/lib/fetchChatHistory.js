import { appFirestore } from './firebase'

const { collection, getDocs, doc, getDoc } = require('firebase/firestore')

/**
 * @param {string} agentKey
 * @param {string} email
 */
async function fetchChatHistory(agentKey, email) {
  let chathistory = []
  try {
    const userDocRef = doc(appFirestore, 'USERS', email) // Assuming email is the document ID
    const docd = await getDoc(userDocRef)
    console.log(docd.data())
    const agentCollectionRef = collection(userDocRef, agentKey) // Assuming agentKey is a subcollection

    const qSnap = await getDocs(agentCollectionRef)

    qSnap.forEach((doc) => {
      if (doc.id !== 'config') {
        chathistory.push({ id: doc.id, data: doc.data() })
      }
    // })
  } catch (error) {
    console.log(error)
    return chathistory
  }
}

export { fetchChatHistory }
