const JsonUtils = {
    parse: (data:any)=> JSON.parse(data),
    stringify:(data:any)=> JSON.stringify(data)
}

interface StorageServiceProps{
    prefix:string,
    key:string,
    content:any
}

/**
 * Returns a string with the provided plain key prefixed with the given prefix.
 * If no prefix is provided, the plain key is returned as is.
 *
 * @param plainKey - The plain key to be prefixed.
 * @param prefix - The prefix to be added to the plain key.
 * @returns The string with the prefix added.
 */
function prefixKey(plainKey: string, prefix:string): string {
    if (prefix) {
      return `[${prefix}]${plainKey}`;
    }

    return plainKey;
}

const StorageService = {
    /**
     * Sets an item in the local storage.
     * 
     * @param data - The data to be stored.
     * @param data.prefix - The prefix to be added to the key.
     * @param data.key - The key of the item.
     * @param data.content - The content of the item.
     */
    setItem: function(data:StorageServiceProps){
        localStorage.setItem(prefixKey(data.prefix, data.key), JsonUtils.stringify(data.content))
    },
    /**
     * Retrieves an item from local storage using the provided prefix and key.
     * 
     * @param prefix - The prefix to be added to the key.
     * @param key - The key used to retrieve the item from local storage.
     * @returns The retrieved item, parsed as type T, or null if the item does not exist.
     */
    getItem: function<T>(prefix: string, key:string): T | null {
        const data: string | null = localStorage.getItem(prefixKey(prefix, key))
        let result = null
        if (data !== null) {
          result = JsonUtils.parse(data);
        }
        return result;
    },
    /**
     * Removes an item from the local storage using a prefixed key.
     * 
     * @param prefix - The prefix to be added to the key.
     * @param key - The key of the item to be removed.
     */
    remove: function(prefix: string, key:string){
        localStorage.removeItem(prefixKey(prefix, key))
    },
    /**
    *  Clears the local storage by removing all stored items.
    */
    clear: function(){
        localStorage.clear()
    },
}

export default StorageService