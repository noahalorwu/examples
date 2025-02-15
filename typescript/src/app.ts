/**
 * Developer note: this server is live at https://transcend-example.onrender.com.
 * This server is used on the E-Shop-It Transcend instance https://e-shop-it.trsnd.co.
 * Some endpoints are also used for other Transcend testing applications
 */

// Load environment variables
// Libraries
import { Request, Response } from 'express';

// Load webhook handling middlewares
import handleEnrichmentWebhook from './handleEnrichmentWebhook';

import handleDSRWebhook from './handleDSRWebhook';

import handleDSRWebhookPaginated from './handleDSRWebhookPaginated';

import handleHelloWorld from './handleHelloWorld';

// Constants
import { PORT } from './constants';

import { logger } from './logger';

const morgan = require('morgan');
const express = require('express');

require('dotenv').config();

// Set up the server
const app = express();
const port = PORT;
app.all('/health', (req: Request, res: Response) => res.sendStatus(200));

// Middlewares
app.use(morgan('tiny'));

app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use(express.json());

/**
 * Receive webhook for identity enrichment (optional)
 * This path is set by you in the Admin Dashboard.
 */
app.post('/transcend/enrichment', handleEnrichmentWebhook);

/**
 * Make the root GET route return a message as a health check.
 */
app.get('/', handleHelloWorld);

/**
 * Receive webhook (Transcend's notification to this server)
 * This path is set by you in the Admin Dashboard.
 */
app.post('/transcend/new-dsr', handleDSRWebhook);

/**
 * This route is an alternative to `/transcend/new-dsr` for situations
 * where you have a lot of data of a certain type that you may need to
 * page over and upload in chunks.
 */
app.post('/transcend/new-dsr-paginated', handleDSRWebhookPaginated);

app.listen(port, () =>
  logger.info(`Example custom data silo listening on port ${port}.`),
);
