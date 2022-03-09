import { once } from "events";
import { createServer } from "http";
import { randomUUID } from "crypto";
const Database = new Map();

function respondJSON(data, res) {
  return res.end(JSON.stringify(data));
}

async function handler(req, res) {
  const { method } = req;
  const requestMethod = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
  };

  if (method === requestMethod.GET) {
    return respondJSON([...Database.values()], res);
  }

  if (method === requestMethod.POST) {
    const body = JSON.parse(await once(req, "data"));
    console.log("Recebido", body);

    const id = randomUUID();
    Database.set(id, body);
    return respondJSON({ ok: 1 }, res);
  }

  if (method === requestMethod.DELETE) {
    return respondJSON({ ok: 1 }, res);
  }
}

export default createServer(handler);
