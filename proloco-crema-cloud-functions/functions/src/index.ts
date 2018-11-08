import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp();

/**
 * This function adds the associationId in the user document of the new user added to the association
 */
exports.syncAssociationsUsersWhenCreating = functions.firestore.document('Associations/{associationId}/Users/{userId}').onCreate((change, context) => {
    return admin.firestore().collection('/Users').doc(context.params.userId).update({
        associations: admin.firestore.FieldValue.arrayUnion(context.params.associationId)
    })
})

/**
 * This is the same as the previus function but it delete the associationId in the user document when the user is deleted from the association
 */
exports.syncAssociationsUsersWhenDeleting = functions.firestore.document('Associations/{associationId}/Users/{userId}').onDelete((change, context) => {
    return admin.firestore().collection('/Users').doc(context.params.userId).update({
        associations: admin.firestore.FieldValue.arrayRemove(context.params.associationId)
    })
})