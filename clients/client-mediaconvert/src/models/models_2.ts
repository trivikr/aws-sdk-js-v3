// smithy-typescript generated code
import { ExceptionOptionType as __ExceptionOptionType } from "@smithy/smithy-client";

import { MediaConvertServiceException as __BaseException } from "./MediaConvertServiceException";

import {
  AccelerationSettings,
  AudioDescription,
  AvailBlanking,
  BillingTagsSource,
  CaptionDescriptionPreset,
  ColorConversion3DLUTSetting,
  Endpoint,
  EsamSettings,
  ExtendedDataServices,
  HopDestination,
  InputTemplate,
  KantarWatermarkSettings,
  MotionImageInserter,
  NielsenConfiguration,
  NielsenNonLinearWatermarkSettings,
} from "./models_0";

import {
  ContainerSettings,
  Job,
  JobSettings,
  JobStatus,
  OutputGroup,
  SimulateReservedQueue,
  StatusUpdateInterval,
  TimecodeConfig,
  TimedMetadataInsertion,
  VideoDescription,
} from "./models_1";

/**
 * Use Job engine versions to run jobs for your production workflow on one version, while you test and validate the latest version. Job engine versions are in a YYYY-MM-DD format.
 * @public
 */
export interface JobEngineVersion {
  /**
   * The date that this Job engine version expires. Requests to create jobs with an expired version result in a regular job, as if no specific Job engine version was requested.
   * @public
   */
  ExpirationDate?: Date | undefined;

  /**
   * Use Job engine versions to run jobs for your production workflow on one version, while you test and validate the latest version. Job engine versions are in a YYYY-MM-DD format.
   * @public
   */
  Version?: string | undefined;
}

/**
 * JobTemplateSettings contains all the transcode settings saved in the template that will be applied to jobs created from it.
 * @public
 */
export interface JobTemplateSettings {
  /**
   * When specified, this offset (in milliseconds) is added to the input Ad Avail PTS time.
   * @public
   */
  AdAvailOffset?: number | undefined;

  /**
   * Settings for ad avail blanking. Video can be blanked or overlaid with an image, and audio muted during SCTE-35 triggered ad avails.
   * @public
   */
  AvailBlanking?: AvailBlanking | undefined;

  /**
   * Use 3D LUTs to specify custom color mapping behavior when you convert from one color space into another. You can include up to 8 different 3D LUTs. For more information, see: https://docs.aws.amazon.com/mediaconvert/latest/ug/3d-luts.html
   * @public
   */
  ColorConversion3DLUTSettings?: ColorConversion3DLUTSetting[] | undefined;

  /**
   * Settings for Event Signaling And Messaging (ESAM). If you don't do ad insertion, you can ignore these settings.
   * @public
   */
  Esam?: EsamSettings | undefined;

  /**
   * If your source content has EIA-608 Line 21 Data Services, enable this feature to specify what MediaConvert does with the Extended Data Services (XDS) packets. You can choose to pass through XDS packets, or remove them from the output. For more information about XDS, see EIA-608 Line Data Services, section 9.5.1.5 05h Content Advisory.
   * @public
   */
  ExtendedDataServices?: ExtendedDataServices | undefined;

  /**
   * Specify the input that MediaConvert references for your default output settings.  MediaConvert uses this input's Resolution, Frame rate, and Pixel aspect ratio for all  outputs that you don't manually specify different output settings for. Enabling this setting will disable "Follow source" for all other inputs.  If MediaConvert cannot follow your source, for example if you specify an audio-only input,  MediaConvert uses the first followable input instead. In your JSON job specification, enter an integer from 1 to 150 corresponding  to the order of your inputs.
   * @public
   */
  FollowSource?: number | undefined;

  /**
   * Use Inputs to define the source file used in the transcode job. There can only be one input in a job template. Using the API, you can include multiple inputs when referencing a job template.
   * @public
   */
  Inputs?: InputTemplate[] | undefined;

  /**
   * Use these settings only when you use Kantar watermarking. Specify the values that MediaConvert uses to generate and place Kantar watermarks in your output audio. These settings apply to every output in your job. In addition to specifying these values, you also need to store your Kantar credentials in AWS Secrets Manager. For more information, see https://docs.aws.amazon.com/mediaconvert/latest/ug/kantar-watermarking.html.
   * @public
   */
  KantarWatermark?: KantarWatermarkSettings | undefined;

  /**
   * Overlay motion graphics on top of your video. The motion graphics that you specify here appear on all outputs in all output groups. For more information, see https://docs.aws.amazon.com/mediaconvert/latest/ug/motion-graphic-overlay.html.
   * @public
   */
  MotionImageInserter?: MotionImageInserter | undefined;

  /**
   * Settings for your Nielsen configuration. If you don't do Nielsen measurement and analytics, ignore these settings. When you enable Nielsen configuration, MediaConvert enables PCM to ID3 tagging for all outputs in the job.
   * @public
   */
  NielsenConfiguration?: NielsenConfiguration | undefined;

  /**
   * Ignore these settings unless you are using Nielsen non-linear watermarking. Specify the values that MediaConvert uses to generate and place Nielsen watermarks in your output audio. In addition to specifying these values, you also need to set up your cloud TIC server. These settings apply to every output in your job. The MediaConvert implementation is currently with the following Nielsen versions: Nielsen Watermark SDK Version 6.0.13 Nielsen NLM Watermark Engine Version 1.3.3 Nielsen Watermark Authenticator [SID_TIC] Version [7.0.0]
   * @public
   */
  NielsenNonLinearWatermark?: NielsenNonLinearWatermarkSettings | undefined;

  /**
   * Contains one group of settings for each set of outputs that share a common package type. All unpackaged files (MPEG-4, MPEG-2 TS, Quicktime, MXF, and no container) are grouped in a single output group as well. Required in is a group of settings that apply to the whole group. This required object depends on the value you set for Type. Type, settings object pairs are as follows. * FILE_GROUP_SETTINGS, FileGroupSettings * HLS_GROUP_SETTINGS, HlsGroupSettings * DASH_ISO_GROUP_SETTINGS, DashIsoGroupSettings * MS_SMOOTH_GROUP_SETTINGS, MsSmoothGroupSettings * CMAF_GROUP_SETTINGS, CmafGroupSettings
   * @public
   */
  OutputGroups?: OutputGroup[] | undefined;

  /**
   * These settings control how the service handles timecodes throughout the job. These settings don't affect input clipping.
   * @public
   */
  TimecodeConfig?: TimecodeConfig | undefined;

  /**
   * Insert user-defined custom ID3 metadata at timecodes that you specify. In each output that you want to include this metadata, you must set ID3 metadata to Passthrough.
   * @public
   */
  TimedMetadataInsertion?: TimedMetadataInsertion | undefined;
}

/**
 * @public
 * @enum
 */
export const Type = {
  CUSTOM: "CUSTOM",
  SYSTEM: "SYSTEM",
} as const;

/**
 * @public
 */
export type Type = (typeof Type)[keyof typeof Type];

/**
 * A job template is a pre-made set of encoding instructions that you can use to quickly create a job.
 * @public
 */
export interface JobTemplate {
  /**
   * Accelerated transcoding can significantly speed up jobs with long, visually complex content.
   * @public
   */
  AccelerationSettings?: AccelerationSettings | undefined;

  /**
   * An identifier for this resource that is unique within all of AWS.
   * @public
   */
  Arn?: string | undefined;

  /**
   * An optional category you create to organize your job templates.
   * @public
   */
  Category?: string | undefined;

  /**
   * The timestamp in epoch seconds for Job template creation.
   * @public
   */
  CreatedAt?: Date | undefined;

  /**
   * An optional description you create for each job template.
   * @public
   */
  Description?: string | undefined;

  /**
   * Optional list of hop destinations.
   * @public
   */
  HopDestinations?: HopDestination[] | undefined;

  /**
   * The timestamp in epoch seconds when the Job template was last updated.
   * @public
   */
  LastUpdated?: Date | undefined;

  /**
   * A name you create for each job template. Each name must be unique within your account.
   * @public
   */
  Name: string | undefined;

  /**
   * Relative priority on the job.
   * @public
   */
  Priority?: number | undefined;

  /**
   * Optional. The queue that jobs created from this template are assigned to. If you don't specify this, jobs will go to the default queue.
   * @public
   */
  Queue?: string | undefined;

  /**
   * JobTemplateSettings contains all the transcode settings saved in the template that will be applied to jobs created from it.
   * @public
   */
  Settings: JobTemplateSettings | undefined;

  /**
   * Specify how often MediaConvert sends STATUS_UPDATE events to Amazon CloudWatch Events. Set the interval, in seconds, between status updates. MediaConvert sends an update at this interval from the time the service begins processing your job to the time it completes the transcode or encounters an error.
   * @public
   */
  StatusUpdateInterval?: StatusUpdateInterval | undefined;

  /**
   * A job template can be of two types: system or custom. System or built-in job templates can't be modified or deleted by the user.
   * @public
   */
  Type?: Type | undefined;
}

/**
 * Settings for preset
 * @public
 */
export interface PresetSettings {
  /**
   * Contains groups of audio encoding settings organized by audio codec. Include one instance of per output. Can contain multiple groups of encoding settings.
   * @public
   */
  AudioDescriptions?: AudioDescription[] | undefined;

  /**
   * This object holds groups of settings related to captions for one output. For each output that has captions, include one instance of CaptionDescriptions.
   * @public
   */
  CaptionDescriptions?: CaptionDescriptionPreset[] | undefined;

  /**
   * Container specific settings.
   * @public
   */
  ContainerSettings?: ContainerSettings | undefined;

  /**
   * VideoDescription contains a group of video encoding settings. The specific video settings depend on the video codec that you choose for the property codec. Include one instance of VideoDescription per output.
   * @public
   */
  VideoDescription?: VideoDescription | undefined;
}

/**
 * A preset is a collection of preconfigured media conversion settings that you want MediaConvert to apply to the output during the conversion process.
 * @public
 */
export interface Preset {
  /**
   * An identifier for this resource that is unique within all of AWS.
   * @public
   */
  Arn?: string | undefined;

  /**
   * An optional category you create to organize your presets.
   * @public
   */
  Category?: string | undefined;

  /**
   * The timestamp in epoch seconds for preset creation.
   * @public
   */
  CreatedAt?: Date | undefined;

  /**
   * An optional description you create for each preset.
   * @public
   */
  Description?: string | undefined;

  /**
   * The timestamp in epoch seconds when the preset was last updated.
   * @public
   */
  LastUpdated?: Date | undefined;

  /**
   * A name you create for each preset. Each name must be unique within your account.
   * @public
   */
  Name: string | undefined;

  /**
   * Settings for preset
   * @public
   */
  Settings: PresetSettings | undefined;

  /**
   * A preset can be of two types: system or custom. System or built-in preset can't be modified or deleted by the user.
   * @public
   */
  Type?: Type | undefined;
}

/**
 * The input file that needs to be analyzed.
 * @public
 */
export interface ProbeInputFile {
  /**
   * The URI to your input file(s) that is stored in Amazon S3 or on an HTTP(S) server.
   * @public
   */
  FileUrl?: string | undefined;
}

/**
 * @public
 * @enum
 */
export const Format = {
  matroska: "matroska",
  mp4: "mp4",
  quicktime: "quicktime",
  webm: "webm",
} as const;

/**
 * @public
 */
export type Format = (typeof Format)[keyof typeof Format];

/**
 * the calculated frame rate of the asset.
 * @public
 */
export interface FrameRate {
  /**
   * the denominator of the frame rate of the asset.
   * @public
   */
  Denominator?: number | undefined;

  /**
   * the numerator of the frame rate of the asset.
   * @public
   */
  Numerator?: number | undefined;
}

/**
 * Properties specific to audio tracks.
 * @public
 */
export interface AudioProperties {
  /**
   * The bit depth of the audio track.
   * @public
   */
  BitDepth?: number | undefined;

  /**
   * The bit rate of the audio track in bits per second.
   * @public
   */
  BitRate?: number | undefined;

  /**
   * The number of audio channels.
   * @public
   */
  Channels?: number | undefined;

  /**
   * the calculated frame rate of the asset.
   * @public
   */
  FrameRate?: FrameRate | undefined;

  /**
   * the language code of the track
   * @public
   */
  LanguageCode?: string | undefined;

  /**
   * The sample rate of the audio track.
   * @public
   */
  SampleRate?: number | undefined;
}

/**
 * @public
 * @enum
 */
export const Codec = {
  AAC: "AAC",
  AC3: "AC3",
  AV1: "AV1",
  AVC: "AVC",
  C608: "C608",
  C708: "C708",
  EAC3: "EAC3",
  FLAC: "FLAC",
  HEVC: "HEVC",
  MJPEG: "MJPEG",
  MP3: "MP3",
  MP4V: "MP4V",
  MPEG2: "MPEG2",
  OPUS: "OPUS",
  PCM: "PCM",
  PRORES: "PRORES",
  THEORA: "THEORA",
  UNKNOWN: "UNKNOWN",
  VORBIS: "VORBIS",
  VP8: "VP8",
  VP9: "VP9",
  WEBVTT: "WEBVTT",
} as const;

/**
 * @public
 */
export type Codec = (typeof Codec)[keyof typeof Codec];

/**
 * Properties specific to data tracks.
 * @public
 */
export interface DataProperties {
  /**
   * the language code of the track
   * @public
   */
  LanguageCode?: string | undefined;
}

/**
 * @public
 * @enum
 */
export const TrackType = {
  audio: "audio",
  data: "data",
  video: "video",
} as const;

/**
 * @public
 */
export type TrackType = (typeof TrackType)[keyof typeof TrackType];

/**
 * @public
 * @enum
 */
export const ColorPrimaries = {
  EBU_3213_E: "EBU_3213_E",
  GENERIC_FILM: "GENERIC_FILM",
  IPT: "IPT",
  ITU_2020: "ITU_2020",
  ITU_470BG: "ITU_470BG",
  ITU_470M: "ITU_470M",
  ITU_709: "ITU_709",
  LAST: "LAST",
  RESERVED: "RESERVED",
  SMPTE_170M: "SMPTE_170M",
  SMPTE_2067XYZ: "SMPTE_2067XYZ",
  SMPTE_240M: "SMPTE_240M",
  SMPTE_428_1: "SMPTE_428_1",
  SMPTE_431_2: "SMPTE_431_2",
  SMPTE_EG_432_1: "SMPTE_EG_432_1",
  UNSPECIFIED: "UNSPECIFIED",
} as const;

/**
 * @public
 */
export type ColorPrimaries = (typeof ColorPrimaries)[keyof typeof ColorPrimaries];

/**
 * @public
 * @enum
 */
export const MatrixCoefficients = {
  CD_CL: "CD_CL",
  CD_NCL: "CD_NCL",
  EBU3213: "EBU3213",
  FCC: "FCC",
  IPT: "IPT",
  ITU_2020_CL: "ITU_2020_CL",
  ITU_2020_NCL: "ITU_2020_NCL",
  ITU_2100ICtCp: "ITU_2100ICtCp",
  ITU_470BG: "ITU_470BG",
  ITU_709: "ITU_709",
  LAST: "LAST",
  RESERVED: "RESERVED",
  RGB: "RGB",
  SMPTE_170M: "SMPTE_170M",
  SMPTE_2085: "SMPTE_2085",
  SMPTE_240M: "SMPTE_240M",
  UNSPECIFIED: "UNSPECIFIED",
  YCgCo: "YCgCo",
} as const;

/**
 * @public
 */
export type MatrixCoefficients = (typeof MatrixCoefficients)[keyof typeof MatrixCoefficients];

/**
 * @public
 * @enum
 */
export const TransferCharacteristics = {
  ARIB_B67: "ARIB_B67",
  IEC_61966_2_1: "IEC_61966_2_1",
  IEC_61966_2_4: "IEC_61966_2_4",
  ITU_1361: "ITU_1361",
  ITU_2020_10bit: "ITU_2020_10bit",
  ITU_2020_12bit: "ITU_2020_12bit",
  ITU_470BG: "ITU_470BG",
  ITU_470M: "ITU_470M",
  ITU_709: "ITU_709",
  LAST: "LAST",
  LINEAR: "LINEAR",
  LOC10_2_5: "LOC10_2_5",
  LOG10_2: "LOG10_2",
  RESERVED: "RESERVED",
  SMPTE_170M: "SMPTE_170M",
  SMPTE_2084: "SMPTE_2084",
  SMPTE_240M: "SMPTE_240M",
  SMPTE_428_1: "SMPTE_428_1",
  UNSPECIFIED: "UNSPECIFIED",
} as const;

/**
 * @public
 */
export type TransferCharacteristics = (typeof TransferCharacteristics)[keyof typeof TransferCharacteristics];

/**
 * Properties specific to video tracks.
 * @public
 */
export interface VideoProperties {
  /**
   * The bit depth of the video track.
   * @public
   */
  BitDepth?: number | undefined;

  /**
   * The bit rate of the video track in bits per second.
   * @public
   */
  BitRate?: number | undefined;

  /**
   * the color primaries.
   * @public
   */
  ColorPrimaries?: ColorPrimaries | undefined;

  /**
   * the calculated frame rate of the asset.
   * @public
   */
  FrameRate?: FrameRate | undefined;

  /**
   * The height of the video track in pixels.
   * @public
   */
  Height?: number | undefined;

  /**
   * the matrix coefficients.
   * @public
   */
  MatrixCoefficients?: MatrixCoefficients | undefined;

  /**
   * the transfer characteristics.
   * @public
   */
  TransferCharacteristics?: TransferCharacteristics | undefined;

  /**
   * The width of the video track in pixels.
   * @public
   */
  Width?: number | undefined;
}

/**
 * The track information such as codec, duration, etc.
 * @public
 */
export interface Track {
  /**
   * Properties specific to audio tracks.
   * @public
   */
  AudioProperties?: AudioProperties | undefined;

  /**
   * The codec used for the track.
   * @public
   */
  Codec?: Codec | undefined;

  /**
   * Properties specific to data tracks.
   * @public
   */
  DataProperties?: DataProperties | undefined;

  /**
   * The duration of the track in seconds.
   * @public
   */
  Duration?: number | undefined;

  /**
   * The index of the track.
   * @public
   */
  Index?: number | undefined;

  /**
   * The type of the track (video, audio, or data).
   * @public
   */
  TrackType?: TrackType | undefined;

  /**
   * Properties specific to video tracks.
   * @public
   */
  VideoProperties?: VideoProperties | undefined;
}

/**
 * Information about the container format of the media file.
 * @public
 */
export interface Container {
  /**
   * The duration of the media file in seconds.
   * @public
   */
  Duration?: number | undefined;

  /**
   * The format of the container
   * @public
   */
  Format?: Format | undefined;

  /**
   * List of Track objects.
   * @public
   */
  Tracks?: Track[] | undefined;
}

/**
 * Metadata about the file.
 * @public
 */
export interface Metadata {
  /**
   * The ETag of the file.
   * @public
   */
  ETag?: string | undefined;

  /**
   * The size of the file in bytes.
   * @public
   */
  FileSize?: number | undefined;

  /**
   * The last modification time of the file.
   * @public
   */
  LastModified?: Date | undefined;

  /**
   * The MIME type of the file.
   * @public
   */
  MimeType?: string | undefined;
}

/**
 * Track mapping information.
 * @public
 */
export interface TrackMapping {
  /**
   * The indexes of the audio tracks.
   * @public
   */
  AudioTrackIndexes?: number[] | undefined;

  /**
   * The indexes of the data tracks.
   * @public
   */
  DataTrackIndexes?: number[] | undefined;

  /**
   * The indexes of the video tracks.
   * @public
   */
  VideoTrackIndexes?: number[] | undefined;
}

/**
 * The metadata and analysis results for a media file.
 * @public
 */
export interface ProbeResult {
  /**
   * Information about the container format of the media file.
   * @public
   */
  Container?: Container | undefined;

  /**
   * Metadata about the file.
   * @public
   */
  Metadata?: Metadata | undefined;

  /**
   * List of Track mapping objects.
   * @public
   */
  TrackMappings?: TrackMapping[] | undefined;
}

/**
 * @public
 * @enum
 */
export const PricingPlan = {
  ON_DEMAND: "ON_DEMAND",
  RESERVED: "RESERVED",
} as const;

/**
 * @public
 */
export type PricingPlan = (typeof PricingPlan)[keyof typeof PricingPlan];

/**
 * @public
 * @enum
 */
export const Commitment = {
  ONE_YEAR: "ONE_YEAR",
} as const;

/**
 * @public
 */
export type Commitment = (typeof Commitment)[keyof typeof Commitment];

/**
 * @public
 * @enum
 */
export const RenewalType = {
  AUTO_RENEW: "AUTO_RENEW",
  EXPIRE: "EXPIRE",
} as const;

/**
 * @public
 */
export type RenewalType = (typeof RenewalType)[keyof typeof RenewalType];

/**
 * @public
 * @enum
 */
export const ReservationPlanStatus = {
  ACTIVE: "ACTIVE",
  EXPIRED: "EXPIRED",
} as const;

/**
 * @public
 */
export type ReservationPlanStatus = (typeof ReservationPlanStatus)[keyof typeof ReservationPlanStatus];

/**
 * Details about the pricing plan for your reserved queue. Required for reserved queues and not applicable to on-demand queues.
 * @public
 */
export interface ReservationPlan {
  /**
   * The length of the term of your reserved queue pricing plan commitment.
   * @public
   */
  Commitment?: Commitment | undefined;

  /**
   * The timestamp in epoch seconds for when the current pricing plan term for this reserved queue expires.
   * @public
   */
  ExpiresAt?: Date | undefined;

  /**
   * The timestamp in epoch seconds for when you set up the current pricing plan for this reserved queue.
   * @public
   */
  PurchasedAt?: Date | undefined;

  /**
   * Specifies whether the term of your reserved queue pricing plan is automatically extended (AUTO_RENEW) or expires (EXPIRE) at the end of the term.
   * @public
   */
  RenewalType?: RenewalType | undefined;

  /**
   * Specifies the number of reserved transcode slots (RTS) for this queue. The number of RTS determines how many jobs the queue can process in parallel; each RTS can process one job at a time. When you increase this number, you extend your existing commitment with a new 12-month commitment for a larger number of RTS. The new commitment begins when you purchase the additional capacity. You can't decrease the number of RTS in your reserved queue.
   * @public
   */
  ReservedSlots?: number | undefined;

  /**
   * Specifies whether the pricing plan for your reserved queue is ACTIVE or EXPIRED.
   * @public
   */
  Status?: ReservationPlanStatus | undefined;
}

/**
 * A service override applied by MediaConvert to the settings that you have configured. If you see any overrides, we recommend that you contact AWS Support.
 * @public
 */
export interface ServiceOverride {
  /**
   * Details about the service override that MediaConvert has applied.
   * @public
   */
  Message?: string | undefined;

  /**
   * The name of the setting that MediaConvert has applied an override to.
   * @public
   */
  Name?: string | undefined;

  /**
   * The current value of the service override that MediaConvert has applied.
   * @public
   */
  OverrideValue?: string | undefined;

  /**
   * The value of the setting that you configured, prior to any overrides that MediaConvert has applied.
   * @public
   */
  Value?: string | undefined;
}

/**
 * @public
 * @enum
 */
export const QueueStatus = {
  ACTIVE: "ACTIVE",
  PAUSED: "PAUSED",
} as const;

/**
 * @public
 */
export type QueueStatus = (typeof QueueStatus)[keyof typeof QueueStatus];

/**
 * You can use queues to manage the resources that are available to your AWS account for running multiple transcoding jobs at the same time. If you don't specify a queue, the service sends all jobs through the default queue. For more information, see https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-queues.html.
 * @public
 */
export interface Queue {
  /**
   * An identifier for this resource that is unique within all of AWS.
   * @public
   */
  Arn?: string | undefined;

  /**
   * The maximum number of jobs your queue can process concurrently.
   * @public
   */
  ConcurrentJobs?: number | undefined;

  /**
   * The timestamp in epoch seconds for when you created the queue.
   * @public
   */
  CreatedAt?: Date | undefined;

  /**
   * An optional description that you create for each queue.
   * @public
   */
  Description?: string | undefined;

  /**
   * The timestamp in epoch seconds for when you most recently updated the queue.
   * @public
   */
  LastUpdated?: Date | undefined;

  /**
   * A name that you create for each queue. Each name must be unique within your account.
   * @public
   */
  Name: string | undefined;

  /**
   * Specifies whether the pricing plan for the queue is on-demand or reserved. For on-demand, you pay per minute, billed in increments of .01 minute. For reserved, you pay for the transcoding capacity of the entire queue, regardless of how much or how little you use it. Reserved pricing requires a 12-month commitment.
   * @public
   */
  PricingPlan?: PricingPlan | undefined;

  /**
   * The estimated number of jobs with a PROGRESSING status.
   * @public
   */
  ProgressingJobsCount?: number | undefined;

  /**
   * Details about the pricing plan for your reserved queue. Required for reserved queues and not applicable to on-demand queues.
   * @public
   */
  ReservationPlan?: ReservationPlan | undefined;

  /**
   * A list of any service overrides applied by MediaConvert to the settings that you have configured. If you see any overrides, we recommend that you contact AWS Support.
   * @public
   */
  ServiceOverrides?: ServiceOverride[] | undefined;

  /**
   * Queues can be ACTIVE or PAUSED. If you pause a queue, the service won't begin processing jobs in that queue. Jobs that are running when you pause the queue continue to run until they finish or result in an error.
   * @public
   */
  Status?: QueueStatus | undefined;

  /**
   * The estimated number of jobs with a SUBMITTED status.
   * @public
   */
  SubmittedJobsCount?: number | undefined;

  /**
   * Specifies whether this on-demand queue is system or custom. System queues are built in. You can't modify or delete system queues. You can create and modify custom queues.
   * @public
   */
  Type?: Type | undefined;
}

/**
 * @public
 */
export interface AssociateCertificateRequest {
  /**
   * The ARN of the ACM certificate that you want to associate with your MediaConvert resource.
   * @public
   */
  Arn: string | undefined;
}

/**
 * @public
 */
export interface AssociateCertificateResponse {}

/**
 * The service can't process your request because of a problem in the request. Please check your request form and syntax.
 * @public
 */
export class BadRequestException extends __BaseException {
  readonly name: "BadRequestException" = "BadRequestException";
  readonly $fault: "client" = "client";
  Message?: string | undefined;
  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<BadRequestException, __BaseException>) {
    super({
      name: "BadRequestException",
      $fault: "client",
      ...opts,
    });
    Object.setPrototypeOf(this, BadRequestException.prototype);
    this.Message = opts.Message;
  }
}

/**
 * The service couldn't complete your request because there is a conflict with the current state of the resource.
 * @public
 */
export class ConflictException extends __BaseException {
  readonly name: "ConflictException" = "ConflictException";
  readonly $fault: "client" = "client";
  Message?: string | undefined;
  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<ConflictException, __BaseException>) {
    super({
      name: "ConflictException",
      $fault: "client",
      ...opts,
    });
    Object.setPrototypeOf(this, ConflictException.prototype);
    this.Message = opts.Message;
  }
}

/**
 * You don't have permissions for this action with the credentials you sent.
 * @public
 */
export class ForbiddenException extends __BaseException {
  readonly name: "ForbiddenException" = "ForbiddenException";
  readonly $fault: "client" = "client";
  Message?: string | undefined;
  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<ForbiddenException, __BaseException>) {
    super({
      name: "ForbiddenException",
      $fault: "client",
      ...opts,
    });
    Object.setPrototypeOf(this, ForbiddenException.prototype);
    this.Message = opts.Message;
  }
}

/**
 * The service encountered an unexpected condition and can't fulfill your request.
 * @public
 */
export class InternalServerErrorException extends __BaseException {
  readonly name: "InternalServerErrorException" = "InternalServerErrorException";
  readonly $fault: "server" = "server";
  Message?: string | undefined;
  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<InternalServerErrorException, __BaseException>) {
    super({
      name: "InternalServerErrorException",
      $fault: "server",
      ...opts,
    });
    Object.setPrototypeOf(this, InternalServerErrorException.prototype);
    this.Message = opts.Message;
  }
}

/**
 * The resource you requested doesn't exist.
 * @public
 */
export class NotFoundException extends __BaseException {
  readonly name: "NotFoundException" = "NotFoundException";
  readonly $fault: "client" = "client";
  Message?: string | undefined;
  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<NotFoundException, __BaseException>) {
    super({
      name: "NotFoundException",
      $fault: "client",
      ...opts,
    });
    Object.setPrototypeOf(this, NotFoundException.prototype);
    this.Message = opts.Message;
  }
}

/**
 * Too many requests have been sent in too short of a time. The service limits the rate at which it will accept requests.
 * @public
 */
export class TooManyRequestsException extends __BaseException {
  readonly name: "TooManyRequestsException" = "TooManyRequestsException";
  readonly $fault: "client" = "client";
  Message?: string | undefined;
  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<TooManyRequestsException, __BaseException>) {
    super({
      name: "TooManyRequestsException",
      $fault: "client",
      ...opts,
    });
    Object.setPrototypeOf(this, TooManyRequestsException.prototype);
    this.Message = opts.Message;
  }
}

/**
 * @public
 */
export interface CancelJobRequest {
  /**
   * The Job ID of the job to be cancelled.
   * @public
   */
  Id: string | undefined;
}

/**
 * @public
 */
export interface CancelJobResponse {}

/**
 * @public
 */
export interface CreateJobRequest {
  /**
   * Optional. Accelerated transcoding can significantly speed up jobs with long, visually complex content. Outputs that use this feature incur pro-tier pricing. For information about feature limitations, see the AWS Elemental MediaConvert User Guide.
   * @public
   */
  AccelerationSettings?: AccelerationSettings | undefined;

  /**
   * Optional. Choose a tag type that AWS Billing and Cost Management will use to sort your AWS Elemental MediaConvert costs on any billing report that you set up. Any transcoding outputs that don't have an associated tag will appear in your billing report unsorted. If you don't choose a valid value for this field, your job outputs will appear on the billing report unsorted.
   * @public
   */
  BillingTagsSource?: BillingTagsSource | undefined;

  /**
   * Prevent duplicate jobs from being created and ensure idempotency for your requests. A client request token can be any string that includes up to 64 ASCII characters. If you reuse a client request token within one minute of a successful request, the API returns the job details of the original request instead. For more information see https://docs.aws.amazon.com/mediaconvert/latest/apireference/idempotency.html.
   * @public
   */
  ClientRequestToken?: string | undefined;

  /**
   * Optional. Use queue hopping to avoid overly long waits in the backlog of the queue that you submit your job to. Specify an alternate queue and the maximum time that your job will wait in the initial queue before hopping. For more information about this feature, see the AWS Elemental MediaConvert User Guide.
   * @public
   */
  HopDestinations?: HopDestination[] | undefined;

  /**
   * Use Job engine versions to run jobs for your production workflow on one version, while you test and validate the latest version. To specify a Job engine version: Enter a date in a YYYY-MM-DD format. For a list of valid Job engine versions, submit a ListVersions request. To not specify a Job engine version: Leave blank.
   * @public
   */
  JobEngineVersion?: string | undefined;

  /**
   * Optional. When you create a job, you can either specify a job template or specify the transcoding settings individually.
   * @public
   */
  JobTemplate?: string | undefined;

  /**
   * Optional. Specify the relative priority for this job. In any given queue, the service begins processing the job with the highest value first. When more than one job has the same priority, the service begins processing the job that you submitted first. If you don't specify a priority, the service uses the default value 0.
   * @public
   */
  Priority?: number | undefined;

  /**
   * Optional. When you create a job, you can specify a queue to send it to. If you don't specify, the job will go to the default queue. For more about queues, see the User Guide topic at https://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html.
   * @public
   */
  Queue?: string | undefined;

  /**
   * Required. The IAM role you use for creating this job. For details about permissions, see the User Guide topic at the User Guide at https://docs.aws.amazon.com/mediaconvert/latest/ug/iam-role.html.
   * @public
   */
  Role: string | undefined;

  /**
   * JobSettings contains all the transcode settings for a job.
   * @public
   */
  Settings: JobSettings | undefined;

  /**
   * Optional. Enable this setting when you run a test job to estimate how many reserved transcoding slots (RTS) you need. When this is enabled, MediaConvert runs your job from an on-demand queue with similar performance to what you will see with one RTS in a reserved queue. This setting is disabled by default.
   * @public
   */
  SimulateReservedQueue?: SimulateReservedQueue | undefined;

  /**
   * Optional. Specify how often MediaConvert sends STATUS_UPDATE events to Amazon CloudWatch Events. Set the interval, in seconds, between status updates. MediaConvert sends an update at this interval from the time the service begins processing your job to the time it completes the transcode or encounters an error.
   * @public
   */
  StatusUpdateInterval?: StatusUpdateInterval | undefined;

  /**
   * Optional. The tags that you want to add to the resource. You can tag resources with a key-value pair or with only a key.  Use standard AWS tags on your job for automatic integration with AWS services and for custom integrations and workflows.
   * @public
   */
  Tags?: Record<string, string> | undefined;

  /**
   * Optional. User-defined metadata that you want to associate with an MediaConvert job. You specify metadata in key/value pairs.  Use only for existing integrations or workflows that rely on job metadata tags. Otherwise, we recommend that you use standard AWS tags.
   * @public
   */
  UserMetadata?: Record<string, string> | undefined;
}

/**
 * @public
 */
export interface CreateJobResponse {
  /**
   * Each job converts an input file into an output file or files. For more information, see the User Guide at https://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html
   * @public
   */
  Job?: Job | undefined;
}

/**
 * @public
 */
export interface CreateJobTemplateRequest {
  /**
   * Accelerated transcoding can significantly speed up jobs with long, visually complex content. Outputs that use this feature incur pro-tier pricing. For information about feature limitations, see the AWS Elemental MediaConvert User Guide.
   * @public
   */
  AccelerationSettings?: AccelerationSettings | undefined;

  /**
   * Optional. A category for the job template you are creating
   * @public
   */
  Category?: string | undefined;

  /**
   * Optional. A description of the job template you are creating.
   * @public
   */
  Description?: string | undefined;

  /**
   * Optional. Use queue hopping to avoid overly long waits in the backlog of the queue that you submit your job to. Specify an alternate queue and the maximum time that your job will wait in the initial queue before hopping. For more information about this feature, see the AWS Elemental MediaConvert User Guide.
   * @public
   */
  HopDestinations?: HopDestination[] | undefined;

  /**
   * The name of the job template you are creating.
   * @public
   */
  Name: string | undefined;

  /**
   * Specify the relative priority for this job. In any given queue, the service begins processing the job with the highest value first. When more than one job has the same priority, the service begins processing the job that you submitted first. If you don't specify a priority, the service uses the default value 0.
   * @public
   */
  Priority?: number | undefined;

  /**
   * Optional. The queue that jobs created from this template are assigned to. If you don't specify this, jobs will go to the default queue.
   * @public
   */
  Queue?: string | undefined;

  /**
   * JobTemplateSettings contains all the transcode settings saved in the template that will be applied to jobs created from it.
   * @public
   */
  Settings: JobTemplateSettings | undefined;

  /**
   * Specify how often MediaConvert sends STATUS_UPDATE events to Amazon CloudWatch Events. Set the interval, in seconds, between status updates. MediaConvert sends an update at this interval from the time the service begins processing your job to the time it completes the transcode or encounters an error.
   * @public
   */
  StatusUpdateInterval?: StatusUpdateInterval | undefined;

  /**
   * The tags that you want to add to the resource. You can tag resources with a key-value pair or with only a key.
   * @public
   */
  Tags?: Record<string, string> | undefined;
}

/**
 * @public
 */
export interface CreateJobTemplateResponse {
  /**
   * A job template is a pre-made set of encoding instructions that you can use to quickly create a job.
   * @public
   */
  JobTemplate?: JobTemplate | undefined;
}

/**
 * @public
 */
export interface CreatePresetRequest {
  /**
   * Optional. A category for the preset you are creating.
   * @public
   */
  Category?: string | undefined;

  /**
   * Optional. A description of the preset you are creating.
   * @public
   */
  Description?: string | undefined;

  /**
   * The name of the preset you are creating.
   * @public
   */
  Name: string | undefined;

  /**
   * Settings for preset
   * @public
   */
  Settings: PresetSettings | undefined;

  /**
   * The tags that you want to add to the resource. You can tag resources with a key-value pair or with only a key.
   * @public
   */
  Tags?: Record<string, string> | undefined;
}

/**
 * @public
 */
export interface CreatePresetResponse {
  /**
   * A preset is a collection of preconfigured media conversion settings that you want MediaConvert to apply to the output during the conversion process.
   * @public
   */
  Preset?: Preset | undefined;
}

/**
 * Details about the pricing plan for your reserved queue. Required for reserved queues and not applicable to on-demand queues.
 * @public
 */
export interface ReservationPlanSettings {
  /**
   * The length of the term of your reserved queue pricing plan commitment.
   * @public
   */
  Commitment: Commitment | undefined;

  /**
   * Specifies whether the term of your reserved queue pricing plan is automatically extended (AUTO_RENEW) or expires (EXPIRE) at the end of the term. When your term is auto renewed, you extend your commitment by 12 months from the auto renew date. You can cancel this commitment.
   * @public
   */
  RenewalType: RenewalType | undefined;

  /**
   * Specifies the number of reserved transcode slots (RTS) for this queue. The number of RTS determines how many jobs the queue can process in parallel; each RTS can process one job at a time. You can't decrease the number of RTS in your reserved queue. You can increase the number of RTS by extending your existing commitment with a new 12-month commitment for the larger number. The new commitment begins when you purchase the additional capacity. You can't cancel your commitment or revert to your original commitment after you increase the capacity.
   * @public
   */
  ReservedSlots: number | undefined;
}

/**
 * @public
 */
export interface CreateQueueRequest {
  /**
   * Specify the maximum number of jobs your queue can process concurrently. For on-demand queues, the value you enter is constrained by your service quotas for Maximum concurrent jobs, per on-demand queue and Maximum concurrent jobs, per account. For reserved queues, specify the number of jobs you can process concurrently in your reservation plan instead.
   * @public
   */
  ConcurrentJobs?: number | undefined;

  /**
   * Optional. A description of the queue that you are creating.
   * @public
   */
  Description?: string | undefined;

  /**
   * The name of the queue that you are creating.
   * @public
   */
  Name: string | undefined;

  /**
   * Specifies whether the pricing plan for the queue is on-demand or reserved. For on-demand, you pay per minute, billed in increments of .01 minute. For reserved, you pay for the transcoding capacity of the entire queue, regardless of how much or how little you use it. Reserved pricing requires a 12-month commitment. When you use the API to create a queue, the default is on-demand.
   * @public
   */
  PricingPlan?: PricingPlan | undefined;

  /**
   * Details about the pricing plan for your reserved queue. Required for reserved queues and not applicable to on-demand queues.
   * @public
   */
  ReservationPlanSettings?: ReservationPlanSettings | undefined;

  /**
   * Initial state of the queue. If you create a paused queue, then jobs in that queue won't begin.
   * @public
   */
  Status?: QueueStatus | undefined;

  /**
   * The tags that you want to add to the resource. You can tag resources with a key-value pair or with only a key.
   * @public
   */
  Tags?: Record<string, string> | undefined;
}

/**
 * @public
 */
export interface CreateQueueResponse {
  /**
   * You can use queues to manage the resources that are available to your AWS account for running multiple transcoding jobs at the same time. If you don't specify a queue, the service sends all jobs through the default queue. For more information, see https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-queues.html.
   * @public
   */
  Queue?: Queue | undefined;
}

/**
 * @public
 */
export interface DeleteJobTemplateRequest {
  /**
   * The name of the job template to be deleted.
   * @public
   */
  Name: string | undefined;
}

/**
 * @public
 */
export interface DeleteJobTemplateResponse {}

/**
 * @public
 */
export interface DeletePolicyRequest {}

/**
 * @public
 */
export interface DeletePolicyResponse {}

/**
 * @public
 */
export interface DeletePresetRequest {
  /**
   * The name of the preset to be deleted.
   * @public
   */
  Name: string | undefined;
}

/**
 * @public
 */
export interface DeletePresetResponse {}

/**
 * @public
 */
export interface DeleteQueueRequest {
  /**
   * The name of the queue that you want to delete.
   * @public
   */
  Name: string | undefined;
}

/**
 * @public
 */
export interface DeleteQueueResponse {}

/**
 * @public
 * @enum
 */
export const DescribeEndpointsMode = {
  DEFAULT: "DEFAULT",
  GET_ONLY: "GET_ONLY",
} as const;

/**
 * @public
 */
export type DescribeEndpointsMode = (typeof DescribeEndpointsMode)[keyof typeof DescribeEndpointsMode];

/**
 * @public
 */
export interface DescribeEndpointsRequest {
  /**
   * Optional. Max number of endpoints, up to twenty, that will be returned at one time.
   * @public
   */
  MaxResults?: number | undefined;

  /**
   * Optional field, defaults to DEFAULT. Specify DEFAULT for this operation to return your endpoints if any exist, or to create an endpoint for you and return it if one doesn't already exist. Specify GET_ONLY to return your endpoints if any exist, or an empty list if none exist.
   *
   * @deprecated
   * @public
   */
  Mode?: DescribeEndpointsMode | undefined;

  /**
   * Use this string, provided with the response to a previous request, to request the next batch of endpoints.
   * @public
   */
  NextToken?: string | undefined;
}

/**
 * @public
 */
export interface DescribeEndpointsResponse {
  /**
   * List of endpoints
   * @public
   */
  Endpoints?: Endpoint[] | undefined;

  /**
   * Use this string to request the next batch of endpoints.
   * @public
   */
  NextToken?: string | undefined;
}

/**
 * @public
 */
export interface DisassociateCertificateRequest {
  /**
   * The ARN of the ACM certificate that you want to disassociate from your MediaConvert resource.
   * @public
   */
  Arn: string | undefined;
}

/**
 * @public
 */
export interface DisassociateCertificateResponse {}

/**
 * @public
 */
export interface GetJobRequest {
  /**
   * the job ID of the job.
   * @public
   */
  Id: string | undefined;
}

/**
 * @public
 */
export interface GetJobResponse {
  /**
   * Each job converts an input file into an output file or files. For more information, see the User Guide at https://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html
   * @public
   */
  Job?: Job | undefined;
}

/**
 * @public
 */
export interface GetJobTemplateRequest {
  /**
   * The name of the job template.
   * @public
   */
  Name: string | undefined;
}

/**
 * @public
 */
export interface GetJobTemplateResponse {
  /**
   * A job template is a pre-made set of encoding instructions that you can use to quickly create a job.
   * @public
   */
  JobTemplate?: JobTemplate | undefined;
}

/**
 * @public
 */
export interface GetPolicyRequest {}

/**
 * @public
 * @enum
 */
export const InputPolicy = {
  ALLOWED: "ALLOWED",
  DISALLOWED: "DISALLOWED",
} as const;

/**
 * @public
 */
export type InputPolicy = (typeof InputPolicy)[keyof typeof InputPolicy];

/**
 * A policy configures behavior that you allow or disallow for your account. For information about MediaConvert policies, see the user guide at http://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html
 * @public
 */
export interface Policy {
  /**
   * Allow or disallow jobs that specify HTTP inputs.
   * @public
   */
  HttpInputs?: InputPolicy | undefined;

  /**
   * Allow or disallow jobs that specify HTTPS inputs.
   * @public
   */
  HttpsInputs?: InputPolicy | undefined;

  /**
   * Allow or disallow jobs that specify Amazon S3 inputs.
   * @public
   */
  S3Inputs?: InputPolicy | undefined;
}

/**
 * @public
 */
export interface GetPolicyResponse {
  /**
   * A policy configures behavior that you allow or disallow for your account. For information about MediaConvert policies, see the user guide at http://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html
   * @public
   */
  Policy?: Policy | undefined;
}

/**
 * @public
 */
export interface GetPresetRequest {
  /**
   * The name of the preset.
   * @public
   */
  Name: string | undefined;
}

/**
 * @public
 */
export interface GetPresetResponse {
  /**
   * A preset is a collection of preconfigured media conversion settings that you want MediaConvert to apply to the output during the conversion process.
   * @public
   */
  Preset?: Preset | undefined;
}

/**
 * @public
 */
export interface GetQueueRequest {
  /**
   * The name of the queue that you want information about.
   * @public
   */
  Name: string | undefined;
}

/**
 * @public
 */
export interface GetQueueResponse {
  /**
   * You can use queues to manage the resources that are available to your AWS account for running multiple transcoding jobs at the same time. If you don't specify a queue, the service sends all jobs through the default queue. For more information, see https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-queues.html.
   * @public
   */
  Queue?: Queue | undefined;
}

/**
 * @public
 * @enum
 */
export const JobTemplateListBy = {
  CREATION_DATE: "CREATION_DATE",
  NAME: "NAME",
  SYSTEM: "SYSTEM",
} as const;

/**
 * @public
 */
export type JobTemplateListBy = (typeof JobTemplateListBy)[keyof typeof JobTemplateListBy];

/**
 * @public
 * @enum
 */
export const Order = {
  ASCENDING: "ASCENDING",
  DESCENDING: "DESCENDING",
} as const;

/**
 * @public
 */
export type Order = (typeof Order)[keyof typeof Order];

/**
 * @public
 */
export interface ListJobsRequest {
  /**
   * Optional. Number of jobs, up to twenty, that will be returned at one time.
   * @public
   */
  MaxResults?: number | undefined;

  /**
   * Optional. Use this string, provided with the response to a previous request, to request the next batch of jobs.
   * @public
   */
  NextToken?: string | undefined;

  /**
   * Optional. When you request lists of resources, you can specify whether they are sorted in ASCENDING or DESCENDING order. Default varies by resource.
   * @public
   */
  Order?: Order | undefined;

  /**
   * Optional. Provide a queue name to get back only jobs from that queue.
   * @public
   */
  Queue?: string | undefined;

  /**
   * Optional. A job's status can be SUBMITTED, PROGRESSING, COMPLETE, CANCELED, or ERROR.
   * @public
   */
  Status?: JobStatus | undefined;
}

/**
 * @public
 */
export interface ListJobsResponse {
  /**
   * List of jobs
   * @public
   */
  Jobs?: Job[] | undefined;

  /**
   * Use this string to request the next batch of jobs.
   * @public
   */
  NextToken?: string | undefined;
}

/**
 * @public
 */
export interface ListJobTemplatesRequest {
  /**
   * Optionally, specify a job template category to limit responses to only job templates from that category.
   * @public
   */
  Category?: string | undefined;

  /**
   * Optional. When you request a list of job templates, you can choose to list them alphabetically by NAME or chronologically by CREATION_DATE. If you don't specify, the service will list them by name.
   * @public
   */
  ListBy?: JobTemplateListBy | undefined;

  /**
   * Optional. Number of job templates, up to twenty, that will be returned at one time.
   * @public
   */
  MaxResults?: number | undefined;

  /**
   * Use this string, provided with the response to a previous request, to request the next batch of job templates.
   * @public
   */
  NextToken?: string | undefined;

  /**
   * Optional. When you request lists of resources, you can specify whether they are sorted in ASCENDING or DESCENDING order. Default varies by resource.
   * @public
   */
  Order?: Order | undefined;
}

/**
 * @public
 */
export interface ListJobTemplatesResponse {
  /**
   * List of Job templates.
   * @public
   */
  JobTemplates?: JobTemplate[] | undefined;

  /**
   * Use this string to request the next batch of job templates.
   * @public
   */
  NextToken?: string | undefined;
}

/**
 * @public
 * @enum
 */
export const PresetListBy = {
  CREATION_DATE: "CREATION_DATE",
  NAME: "NAME",
  SYSTEM: "SYSTEM",
} as const;

/**
 * @public
 */
export type PresetListBy = (typeof PresetListBy)[keyof typeof PresetListBy];

/**
 * @public
 */
export interface ListPresetsRequest {
  /**
   * Optionally, specify a preset category to limit responses to only presets from that category.
   * @public
   */
  Category?: string | undefined;

  /**
   * Optional. When you request a list of presets, you can choose to list them alphabetically by NAME or chronologically by CREATION_DATE. If you don't specify, the service will list them by name.
   * @public
   */
  ListBy?: PresetListBy | undefined;

  /**
   * Optional. Number of presets, up to twenty, that will be returned at one time
   * @public
   */
  MaxResults?: number | undefined;

  /**
   * Use this string, provided with the response to a previous request, to request the next batch of presets.
   * @public
   */
  NextToken?: string | undefined;

  /**
   * Optional. When you request lists of resources, you can specify whether they are sorted in ASCENDING or DESCENDING order. Default varies by resource.
   * @public
   */
  Order?: Order | undefined;
}

/**
 * @public
 */
export interface ListPresetsResponse {
  /**
   * Use this string to request the next batch of presets.
   * @public
   */
  NextToken?: string | undefined;

  /**
   * List of presets
   * @public
   */
  Presets?: Preset[] | undefined;
}

/**
 * @public
 * @enum
 */
export const QueueListBy = {
  CREATION_DATE: "CREATION_DATE",
  NAME: "NAME",
} as const;

/**
 * @public
 */
export type QueueListBy = (typeof QueueListBy)[keyof typeof QueueListBy];

/**
 * @public
 */
export interface ListQueuesRequest {
  /**
   * Optional. When you request a list of queues, you can choose to list them alphabetically by NAME or chronologically by CREATION_DATE. If you don't specify, the service will list them by creation date.
   * @public
   */
  ListBy?: QueueListBy | undefined;

  /**
   * Optional. Number of queues, up to twenty, that will be returned at one time.
   * @public
   */
  MaxResults?: number | undefined;

  /**
   * Use this string, provided with the response to a previous request, to request the next batch of queues.
   * @public
   */
  NextToken?: string | undefined;

  /**
   * Optional. When you request lists of resources, you can specify whether they are sorted in ASCENDING or DESCENDING order. Default varies by resource.
   * @public
   */
  Order?: Order | undefined;
}

/**
 * @public
 */
export interface ListQueuesResponse {
  /**
   * Use this string to request the next batch of queues.
   * @public
   */
  NextToken?: string | undefined;

  /**
   * List of queues.
   * @public
   */
  Queues?: Queue[] | undefined;

  /**
   * The maximum number of jobs that MediaConvert can process at one time, across all of your on-demand queues in the current AWS Region.
   * @public
   */
  TotalConcurrentJobs?: number | undefined;

  /**
   * The remaining number of concurrent jobs that are not associated with a queue and are available to allocate to a queue. You can allocate these jobs when you create or update a queue.
   * @public
   */
  UnallocatedConcurrentJobs?: number | undefined;
}

/**
 * @public
 */
export interface ListTagsForResourceRequest {
  /**
   * The Amazon Resource Name (ARN) of the resource that you want to list tags for. To get the ARN, send a GET request with the resource name.
   * @public
   */
  Arn: string | undefined;
}

/**
 * The Amazon Resource Name (ARN) and tags for an AWS Elemental MediaConvert resource.
 * @public
 */
export interface ResourceTags {
  /**
   * The Amazon Resource Name (ARN) of the resource.
   * @public
   */
  Arn?: string | undefined;

  /**
   * The tags for the resource.
   * @public
   */
  Tags?: Record<string, string> | undefined;
}

/**
 * @public
 */
export interface ListTagsForResourceResponse {
  /**
   * The Amazon Resource Name (ARN) and tags for an AWS Elemental MediaConvert resource.
   * @public
   */
  ResourceTags?: ResourceTags | undefined;
}

/**
 * @public
 */
export interface ListVersionsRequest {
  /**
   * Optional. Number of valid Job engine versions, up to twenty, that will be returned at one time.
   * @public
   */
  MaxResults?: number | undefined;

  /**
   * Optional. Use this string, provided with the response to a previous request, to request the next batch of Job engine versions.
   * @public
   */
  NextToken?: string | undefined;
}

/**
 * @public
 */
export interface ListVersionsResponse {
  /**
   * Optional. Use this string, provided with the response to a previous request, to request the next batch of Job engine versions.
   * @public
   */
  NextToken?: string | undefined;

  /**
   * Retrieve a JSON array of all available Job engine versions and the date they expire.
   * @public
   */
  Versions?: JobEngineVersion[] | undefined;
}

/**
 * @public
 */
export interface ProbeRequest {
  /**
   * The list of input media files to be probed.
   * @public
   */
  InputFiles?: ProbeInputFile[] | undefined;
}

/**
 * @public
 */
export interface ProbeResponse {
  /**
   * List of probe results for the input media file(s).
   * @public
   */
  ProbeResults?: ProbeResult[] | undefined;
}

/**
 * @public
 */
export interface PutPolicyRequest {
  /**
   * A policy configures behavior that you allow or disallow for your account. For information about MediaConvert policies, see the user guide at http://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html
   * @public
   */
  Policy: Policy | undefined;
}

/**
 * @public
 */
export interface PutPolicyResponse {
  /**
   * A policy configures behavior that you allow or disallow for your account. For information about MediaConvert policies, see the user guide at http://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html
   * @public
   */
  Policy?: Policy | undefined;
}

/**
 * @public
 */
export interface SearchJobsRequest {
  /**
   * Optional. Provide your input file URL or your partial input file name. The maximum length for an input file is 300 characters.
   * @public
   */
  InputFile?: string | undefined;

  /**
   * Optional. Number of jobs, up to twenty, that will be returned at one time.
   * @public
   */
  MaxResults?: number | undefined;

  /**
   * Optional. Use this string, provided with the response to a previous request, to request the next batch of jobs.
   * @public
   */
  NextToken?: string | undefined;

  /**
   * Optional. When you request lists of resources, you can specify whether they are sorted in ASCENDING or DESCENDING order. Default varies by resource.
   * @public
   */
  Order?: Order | undefined;

  /**
   * Optional. Provide a queue name, or a queue ARN, to return only jobs from that queue.
   * @public
   */
  Queue?: string | undefined;

  /**
   * Optional. A job's status can be SUBMITTED, PROGRESSING, COMPLETE, CANCELED, or ERROR.
   * @public
   */
  Status?: JobStatus | undefined;
}

/**
 * @public
 */
export interface SearchJobsResponse {
  /**
   * List of jobs.
   * @public
   */
  Jobs?: Job[] | undefined;

  /**
   * Use this string to request the next batch of jobs.
   * @public
   */
  NextToken?: string | undefined;
}

/**
 * @public
 */
export interface TagResourceRequest {
  /**
   * The Amazon Resource Name (ARN) of the resource that you want to tag. To get the ARN, send a GET request with the resource name.
   * @public
   */
  Arn: string | undefined;

  /**
   * The tags that you want to add to the resource. You can tag resources with a key-value pair or with only a key.
   * @public
   */
  Tags: Record<string, string> | undefined;
}

/**
 * @public
 */
export interface TagResourceResponse {}

/**
 * @public
 */
export interface UntagResourceRequest {
  /**
   * The Amazon Resource Name (ARN) of the resource that you want to remove tags from. To get the ARN, send a GET request with the resource name.
   * @public
   */
  Arn: string | undefined;

  /**
   * The keys of the tags that you want to remove from the resource.
   * @public
   */
  TagKeys?: string[] | undefined;
}

/**
 * @public
 */
export interface UntagResourceResponse {}

/**
 * @public
 */
export interface UpdateJobTemplateRequest {
  /**
   * Accelerated transcoding can significantly speed up jobs with long, visually complex content. Outputs that use this feature incur pro-tier pricing. For information about feature limitations, see the AWS Elemental MediaConvert User Guide.
   * @public
   */
  AccelerationSettings?: AccelerationSettings | undefined;

  /**
   * The new category for the job template, if you are changing it.
   * @public
   */
  Category?: string | undefined;

  /**
   * The new description for the job template, if you are changing it.
   * @public
   */
  Description?: string | undefined;

  /**
   * Optional list of hop destinations.
   * @public
   */
  HopDestinations?: HopDestination[] | undefined;

  /**
   * The name of the job template you are modifying
   * @public
   */
  Name: string | undefined;

  /**
   * Specify the relative priority for this job. In any given queue, the service begins processing the job with the highest value first. When more than one job has the same priority, the service begins processing the job that you submitted first. If you don't specify a priority, the service uses the default value 0.
   * @public
   */
  Priority?: number | undefined;

  /**
   * The new queue for the job template, if you are changing it.
   * @public
   */
  Queue?: string | undefined;

  /**
   * JobTemplateSettings contains all the transcode settings saved in the template that will be applied to jobs created from it.
   * @public
   */
  Settings?: JobTemplateSettings | undefined;

  /**
   * Specify how often MediaConvert sends STATUS_UPDATE events to Amazon CloudWatch Events. Set the interval, in seconds, between status updates. MediaConvert sends an update at this interval from the time the service begins processing your job to the time it completes the transcode or encounters an error.
   * @public
   */
  StatusUpdateInterval?: StatusUpdateInterval | undefined;
}

/**
 * @public
 */
export interface UpdateJobTemplateResponse {
  /**
   * A job template is a pre-made set of encoding instructions that you can use to quickly create a job.
   * @public
   */
  JobTemplate?: JobTemplate | undefined;
}

/**
 * @public
 */
export interface UpdatePresetRequest {
  /**
   * The new category for the preset, if you are changing it.
   * @public
   */
  Category?: string | undefined;

  /**
   * The new description for the preset, if you are changing it.
   * @public
   */
  Description?: string | undefined;

  /**
   * The name of the preset you are modifying.
   * @public
   */
  Name: string | undefined;

  /**
   * Settings for preset
   * @public
   */
  Settings?: PresetSettings | undefined;
}

/**
 * @public
 */
export interface UpdatePresetResponse {
  /**
   * A preset is a collection of preconfigured media conversion settings that you want MediaConvert to apply to the output during the conversion process.
   * @public
   */
  Preset?: Preset | undefined;
}

/**
 * @public
 */
export interface UpdateQueueRequest {
  /**
   * Specify the maximum number of jobs your queue can process concurrently. For on-demand queues, the value you enter is constrained by your service quotas for Maximum concurrent jobs, per on-demand queue and Maximum concurrent jobs, per account. For reserved queues, update your reservation plan instead in order to increase your yearly commitment.
   * @public
   */
  ConcurrentJobs?: number | undefined;

  /**
   * The new description for the queue, if you are changing it.
   * @public
   */
  Description?: string | undefined;

  /**
   * The name of the queue that you are modifying.
   * @public
   */
  Name: string | undefined;

  /**
   * The new details of your pricing plan for your reserved queue. When you set up a new pricing plan to replace an expired one, you enter into another 12-month commitment. When you add capacity to your queue by increasing the number of RTS, you extend the term of your commitment to 12 months from when you add capacity. After you make these commitments, you can't cancel them.
   * @public
   */
  ReservationPlanSettings?: ReservationPlanSettings | undefined;

  /**
   * Pause or activate a queue by changing its status between ACTIVE and PAUSED. If you pause a queue, jobs in that queue won't begin. Jobs that are running when you pause the queue continue to run until they finish or result in an error.
   * @public
   */
  Status?: QueueStatus | undefined;
}

/**
 * @public
 */
export interface UpdateQueueResponse {
  /**
   * You can use queues to manage the resources that are available to your AWS account for running multiple transcoding jobs at the same time. If you don't specify a queue, the service sends all jobs through the default queue. For more information, see https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-queues.html.
   * @public
   */
  Queue?: Queue | undefined;
}
