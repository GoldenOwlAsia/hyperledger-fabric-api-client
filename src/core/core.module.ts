import { Module } from '@nestjs/common';
import { ChainModule } from './chain/chain.module';
import { HlfClient } from './chain/hlfclient';
import { HlfCaClient } from './chain/hlfcaclient';
import { HlfErrors } from './chain/logging.enum';
import { Appconfig } from '../common/config/appconfig';
import { Log } from '../common/utils/logging/log.service';

@Module({
    imports: [
        ChainModule,
    ]
})
export class CoreModule {

    /**
     * Creates an instance of ApplicationModule.
     * @param {HlfClient} hlfClient
     * @param {HlfCaClient} caClient
     * @memberof ApplicationModule
     */
    constructor(
        private hlfClient: HlfClient,
        private caClient: HlfCaClient,
    ) {

        // init hlf client and hlf ca client
        // assign admin user
        this.hlfClient.init()
            .then(() => {
                return this.caClient.init(Appconfig.hlf.admin);
            })
            .catch(err => {
                Log.awssqs.error(HlfErrors.ERROR_STARTING_HLF, err.message);
            });
    }
}
