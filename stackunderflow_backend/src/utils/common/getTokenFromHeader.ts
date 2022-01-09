export const getTokenFromHeaders = (req: any): string => {
    let token;
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    console.log(req.headers);

    // Checking if the JWT token starts with "Bearer" for security purposes
    if (authHeader.startsWith("Bearer ")){
        token = authHeader.substring(7, authHeader.length);
        console.log(token);
    } else {
        throw new Error("Invalid Token")
    }

    return token;
}
