import http from "node:http";
import { getDataFromDB } from "./db.js";
import { filterQuestions } from "./utils/filterQuestions.js";
import { sendResponse } from "./utils/sendResponse.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const queryObj = Object.fromEntries(urlObj.searchParams);

    if (urlObj.pathname === "/api/questions"|| urlObj.pathname === "/api/questions/") {
        const data = await getDataFromDB();
        let result = filterQuestions(data, queryObj);
        if (result.length > 0) {
            sendResponse(res, 200, result);
        } else {
            sendResponse(res, 404, { error: "No questions found" });
        }
    } else if (urlObj.pathname.startsWith("/api/questions/")) {
        const data = await getDataFromDB();
        const id = Number(urlObj.pathname.split("/").pop());
        const question = data.find((q) => q.id === id);
        if (question) {
            sendResponse(res, 200, question);
        } else {
            sendResponse(res, 404, { error: "No questions found" });
        }
    } else {
        sendResponse(res, 404, { error: "No questions found" });
    }
});

server.listen(PORT, () => console.log(`Server is Listening at PORT ${PORT}`));
