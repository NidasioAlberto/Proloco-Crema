export interface UserData {
    associations?: Association[]
}

/**
 * This interface contains the data inside the associations attribute of the user data
 */
export interface Association {
    id?: String
    role?: 'admin'
    name: String
    city: String
}