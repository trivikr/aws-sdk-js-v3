import {
  DEFAULT_RETRY_DELAY_BASE,
  THROTTLING_RETRY_DELAY_BASE
} from "./constants";
import { defaultDelayDecider } from "./delayDecider";
import { defaultRetryDecider } from "./retryDecider";
import { isThrottlingError } from "@aws-sdk/service-error-classification";
import { SdkError } from "@aws-sdk/smithy-client";
import {
  FinalizeHandler,
  MetadataBearer,
  FinalizeHandlerArguments,
  RetryStrategy
} from "@aws-sdk/types";

/**
 * Determines whether an error is retryable based on the number of retries
 * already attempted, the HTTP status code, and the error received (if any).
 *
 * @param error         The error encountered.
 */
export interface RetryDecider {
  (error: SdkError): boolean;
}

/**
 * Determines the number of milliseconds to wait before retrying an action.
 *
 * @param delayBase The base delay (in milliseconds).
 * @param attempts  The number of times the action has already been tried.
 */
export interface DelayDecider {
  (delayBase: number, attempts: number): number;
}

/**
 * Interface that specifies the retry quota behavior.
 */
export interface RetryQuota {
  /**
   * returns true if retry tokens are available from the retry quota bucket.
   */
  hasRetryTokens: (error: SdkError) => boolean;

  /**
   * returns token amount from the retry quota bucket.
   * throws error is retry tokens are not available.
   */
  retrieveRetryToken: (error: SdkError) => number;

  /**
   * releases tokens back to the retry quota.
   */
  releaseRetryToken: (releaseCapacityAmount?: number) => void;
}

/**
 * Strategy options to be passed to StandardRetryStrategy
 */
export interface StandardRetryStrategyOptions {
  retryDecider?: RetryDecider;
  delayDecider?: DelayDecider;
  retryQuota?: RetryQuota;
}

export class StandardRetryStrategy implements RetryStrategy {
  private retryDecider: RetryDecider;
  private delayDecider: DelayDecider;
  // private retryQuota?: RetryQuota;

  constructor(
    public readonly maxAttempts: number,
    options?: StandardRetryStrategyOptions
  ) {
    this.retryDecider = options?.retryDecider ?? defaultRetryDecider;
    this.delayDecider = options?.delayDecider ?? defaultDelayDecider;
    // this.retryQuota = options?.retryQuota;
  }

  private shouldRetry(error: SdkError, attempts: number) {
    return attempts < this.maxAttempts && this.retryDecider(error);
  }

  async retry<Input extends object, Ouput extends MetadataBearer>(
    next: FinalizeHandler<Input, Ouput>,
    args: FinalizeHandlerArguments<Input>
  ) {
    let attempts = 0;
    let totalDelay = 0;
    while (true) {
      try {
        const { response, output } = await next(args);
        output.$metadata.attempts = attempts + 1;
        output.$metadata.totalRetryDelay = totalDelay;

        return { response, output };
      } catch (err) {
        attempts++;
        if (this.shouldRetry(err as SdkError, attempts)) {
          const delay = this.delayDecider(
            isThrottlingError(err)
              ? THROTTLING_RETRY_DELAY_BASE
              : DEFAULT_RETRY_DELAY_BASE,
            attempts
          );
          totalDelay += delay;

          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        if (!err.$metadata) {
          err.$metadata = {};
        }

        err.$metadata.attempts = attempts;
        err.$metadata.totalRetryDelay = totalDelay;
        throw err;
      }
    }
  }
}
