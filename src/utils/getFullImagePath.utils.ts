export function getFullImagePath(path = "") {
    try {
        const BaseUrl = "process.env.REACT_APP_S3_BUCKET_LOCATION;"
        
        // Check if BaseUrl is not empty or null
        if (!BaseUrl || typeof BaseUrl !== 'string') {
            throw new Error("Base URL is invalid");
        }

        // Remove trailing slash from BaseUrl if present
        const cleanBaseUrl = BaseUrl.replace(/\/$/, '');

        // Check if path is empty or null
        if (!path || typeof path !== 'string') {
            throw new Error("Path is invalid");
        }

        // Return concatenated URL
        return cleanBaseUrl + (path.startsWith('/') ? path : '/' + path);
    } catch (error) {
        // Handle the error gracefully
        return "";
    }
}