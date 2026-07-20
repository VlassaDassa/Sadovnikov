import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import { Agent } from 'node:https';

import GigaChat from 'gigachat';

let client:
    GigaChat | null = null;

function getCredentials(): string {
    const credentials =
        process.env
            .GIGACHAT_CREDENTIALS;

    if (!credentials) {
        throw new Error(
            'GIGACHAT_CREDENTIALS is missing',
        );
    }

    return credentials;
}

function getCertificatePath(): string {
    const configuredPath =
        process.env
            .GIGACHAT_CA_CERT_PATH;

    if (!configuredPath) {
        throw new Error(
            'GIGACHAT_CA_CERT_PATH is missing',
        );
    }

    const resolvedPath =
        path.isAbsolute(
            configuredPath,
        )
            ? configuredPath
            : path.resolve(
                  process.cwd(),
                  configuredPath,
              );

    if (
        !fs.existsSync(
            resolvedPath,
        )
    ) {
        throw new Error(
            `GigaChat CA certificate was not found: ${resolvedPath}`,
        );
    }

    return resolvedPath;
}

function getTimeout(): number {
    const timeout = Number(
        process.env
            .GIGACHAT_TIMEOUT_SECONDS ??
            120,
    );

    if (
        !Number.isInteger(timeout) ||
        timeout < 10 ||
        timeout > 600
    ) {
        throw new Error(
            'GIGACHAT_TIMEOUT_SECONDS must be an integer from 10 to 600',
        );
    }

    return timeout;
}

export function getGigaChatClient():
    GigaChat {
    if (client) {
        return client;
    }

    const certificate =
        fs.readFileSync(
            getCertificatePath(),
        );

    const httpsAgent =
        new Agent({
            ca: certificate,
            keepAlive: true,
        });

    client = new GigaChat({
        credentials:
            getCredentials(),

        scope:
            process.env
                .GIGACHAT_SCOPE ??
            'GIGACHAT_API_PERS',

        baseUrl:
            process.env
                .GIGACHAT_BASE_URL ??
            'https://api.giga.chat/v1',

        model:
            process.env
                .GIGACHAT_EVOLUTION_MODEL ??
            'GigaChat-3-Ultra',

        timeout:
            getTimeout(),

        httpsAgent,
    });

    return client;
}