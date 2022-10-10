import { app } from "./app";

app.listen(process.env.HTTP_PORT, () => console.log("Server is running..."));