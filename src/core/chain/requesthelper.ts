import { Inject, Injectable } from '@nestjs/common';
import { ChainMethod } from '../../chainmethods.enum';
import { EnvConfig } from '../../common/config/env';
import { InvokeResult } from '../../common/utils/invokeresult.model';
import { Log } from '../../common/utils/logging/log.service';
import { HlfClient } from './hlfclient';

@Injectable()
export class RequestHelper {
    // TODO: refactor invokes according to https://docs.nestjs.com/recipes/cqrs

    /**
     * Creates an instance of RequestHelper.
     * @param {HlfClient} hlfClient
     * @memberof RequestHelper
     */
    constructor(private hlfClient: HlfClient) {
    }

    /**
     *
     *
     * @param {ChainMethod} chainMethod
     * @param {Array<any>} params
     * @param {string} userId
     * @param invokeAlways - Workaround for message deduplication SQS
     * @param transientMap
     * @returns {Promise<InvokeResult>}
     * @memberof RequestHelper
     */
    public invokeRequest(chainMethod: ChainMethod, args: Array<any> = [], userId: string, invokeAlways = false, transientMap?: Object): Promise<InvokeResult | any> {
        return this.hlfClient
            .invoke(chainMethod, args, transientMap)
            .then((response) => {
                Log.hlf.debug('Invoke successfully executed: ', response);
                return response;
            })
            .catch((error) => {
                Log.hlf.error(`${chainMethod}`, error);
                throw error;
            });

    }

    /**
     * Query hlf chain and return response
     *
     * @param {ChainMethod} chainMethod
     * @param {Array<any>} args
     * @param transientMap
     * @returns {Promise<any>}
     * @memberof RequestHelper
     */
    public queryRequest(chainMethod: ChainMethod, args: Array<any> = [], transientMap?: Object): Promise<any> {
        return this.hlfClient
            .query(chainMethod, args, transientMap)
            .then((response) => {
                Log.hlf.debug('Query successfully executed!');
                return response;
            })
            .catch((error) => {
                Log.hlf.error(`${chainMethod}`, error);
                throw error;
            });
    }
}
