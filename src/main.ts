import { EnvConfig } from './common/config/env';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { DocumentBuilder, SwaggerModule, SwaggerCustomOptions } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { Log } from './common/utils/logging/log.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

    const app = await NestFactory.create(ApplicationModule);

    app.use(bodyParser.json());

    app.useGlobalPipes(new ValidationPipe());

    /**
     * Headers setup
     */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    });

    /**
     * Swagger implementation
     */
    let options = new DocumentBuilder()
        .setTitle('Chainservice API')
        .setDescription('The Chainservice API')
        .setVersion('1.0')
        .setExternalDoc('Github repo', 'https://github.com/wearetheledger/hyperledger-typescript-boilerplate');
    let document = SwaggerModule.createDocument(app, options.build());
    SwaggerModule.setup('/api', app, document);

    /**
     * Start Chainservice API
     */
    await app.listen(+EnvConfig.PORT, () => {
        Log.config.info(`Started Chain-service on PORT ${EnvConfig.PORT}`);
    });

}

bootstrap();
