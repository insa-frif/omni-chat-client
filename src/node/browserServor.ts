// This only provides a servor to send the ressources asked by users

import * as http from 'http';
import {HOST, PORT} from '../core/config';
import * as express from 'express';

import * as path from 'path';

const browserRoot = path.resolve(__dirname, '../..', 'browser');

let app = express();
let server = http.createServer(app);

app.use(express.static(browserRoot));
app.get("*",  (req, res, next) => {
	res.sendFile("index.html", {root: browserRoot});
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
