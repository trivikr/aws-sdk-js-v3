import { CancelKeyDeletionCommandInput, CancelKeyDeletionCommandOutput } from "../commands/CancelKeyDeletionCommand";
import { ConnectCustomKeyStoreCommandInput, ConnectCustomKeyStoreCommandOutput } from "../commands/ConnectCustomKeyStoreCommand";
import { CreateAliasCommandInput, CreateAliasCommandOutput } from "../commands/CreateAliasCommand";
import { CreateCustomKeyStoreCommandInput, CreateCustomKeyStoreCommandOutput } from "../commands/CreateCustomKeyStoreCommand";
import { CreateGrantCommandInput, CreateGrantCommandOutput } from "../commands/CreateGrantCommand";
import { CreateKeyCommandInput, CreateKeyCommandOutput } from "../commands/CreateKeyCommand";
import { DecryptCommandInput, DecryptCommandOutput } from "../commands/DecryptCommand";
import { DeleteAliasCommandInput, DeleteAliasCommandOutput } from "../commands/DeleteAliasCommand";
import { DeleteCustomKeyStoreCommandInput, DeleteCustomKeyStoreCommandOutput } from "../commands/DeleteCustomKeyStoreCommand";
import { DeleteImportedKeyMaterialCommandInput, DeleteImportedKeyMaterialCommandOutput } from "../commands/DeleteImportedKeyMaterialCommand";
import { DescribeCustomKeyStoresCommandInput, DescribeCustomKeyStoresCommandOutput } from "../commands/DescribeCustomKeyStoresCommand";
import { DescribeKeyCommandInput, DescribeKeyCommandOutput } from "../commands/DescribeKeyCommand";
import { DisableKeyCommandInput, DisableKeyCommandOutput } from "../commands/DisableKeyCommand";
import { DisableKeyRotationCommandInput, DisableKeyRotationCommandOutput } from "../commands/DisableKeyRotationCommand";
import { DisconnectCustomKeyStoreCommandInput, DisconnectCustomKeyStoreCommandOutput } from "../commands/DisconnectCustomKeyStoreCommand";
import { EnableKeyCommandInput, EnableKeyCommandOutput } from "../commands/EnableKeyCommand";
import { EnableKeyRotationCommandInput, EnableKeyRotationCommandOutput } from "../commands/EnableKeyRotationCommand";
import { EncryptCommandInput, EncryptCommandOutput } from "../commands/EncryptCommand";
import { GenerateDataKeyCommandInput, GenerateDataKeyCommandOutput } from "../commands/GenerateDataKeyCommand";
import { GenerateDataKeyPairCommandInput, GenerateDataKeyPairCommandOutput } from "../commands/GenerateDataKeyPairCommand";
import { GenerateDataKeyPairWithoutPlaintextCommandInput, GenerateDataKeyPairWithoutPlaintextCommandOutput } from "../commands/GenerateDataKeyPairWithoutPlaintextCommand";
import { GenerateDataKeyWithoutPlaintextCommandInput, GenerateDataKeyWithoutPlaintextCommandOutput } from "../commands/GenerateDataKeyWithoutPlaintextCommand";
import { GenerateRandomCommandInput, GenerateRandomCommandOutput } from "../commands/GenerateRandomCommand";
import { GetKeyPolicyCommandInput, GetKeyPolicyCommandOutput } from "../commands/GetKeyPolicyCommand";
import { GetKeyRotationStatusCommandInput, GetKeyRotationStatusCommandOutput } from "../commands/GetKeyRotationStatusCommand";
import { GetParametersForImportCommandInput, GetParametersForImportCommandOutput } from "../commands/GetParametersForImportCommand";
import { GetPublicKeyCommandInput, GetPublicKeyCommandOutput } from "../commands/GetPublicKeyCommand";
import { ImportKeyMaterialCommandInput, ImportKeyMaterialCommandOutput } from "../commands/ImportKeyMaterialCommand";
import { ListAliasesCommandInput, ListAliasesCommandOutput } from "../commands/ListAliasesCommand";
import { ListGrantsCommandInput, ListGrantsCommandOutput } from "../commands/ListGrantsCommand";
import { ListKeyPoliciesCommandInput, ListKeyPoliciesCommandOutput } from "../commands/ListKeyPoliciesCommand";
import { ListKeysCommandInput, ListKeysCommandOutput } from "../commands/ListKeysCommand";
import { ListResourceTagsCommandInput, ListResourceTagsCommandOutput } from "../commands/ListResourceTagsCommand";
import { ListRetirableGrantsCommandInput, ListRetirableGrantsCommandOutput } from "../commands/ListRetirableGrantsCommand";
import { PutKeyPolicyCommandInput, PutKeyPolicyCommandOutput } from "../commands/PutKeyPolicyCommand";
import { ReEncryptCommandInput, ReEncryptCommandOutput } from "../commands/ReEncryptCommand";
import { RetireGrantCommandInput, RetireGrantCommandOutput } from "../commands/RetireGrantCommand";
import { RevokeGrantCommandInput, RevokeGrantCommandOutput } from "../commands/RevokeGrantCommand";
import { ScheduleKeyDeletionCommandInput, ScheduleKeyDeletionCommandOutput } from "../commands/ScheduleKeyDeletionCommand";
import { SignCommandInput, SignCommandOutput } from "../commands/SignCommand";
import { TagResourceCommandInput, TagResourceCommandOutput } from "../commands/TagResourceCommand";
import { UntagResourceCommandInput, UntagResourceCommandOutput } from "../commands/UntagResourceCommand";
import { UpdateAliasCommandInput, UpdateAliasCommandOutput } from "../commands/UpdateAliasCommand";
import { UpdateCustomKeyStoreCommandInput, UpdateCustomKeyStoreCommandOutput } from "../commands/UpdateCustomKeyStoreCommand";
import { UpdateKeyDescriptionCommandInput, UpdateKeyDescriptionCommandOutput } from "../commands/UpdateKeyDescriptionCommand";
import { VerifyCommandInput, VerifyCommandOutput } from "../commands/VerifyCommand";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { SerdeContext as __SerdeContext } from "@aws-sdk/types";
export declare function serializeAws_json1_1CancelKeyDeletionCommand(input: CancelKeyDeletionCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1ConnectCustomKeyStoreCommand(input: ConnectCustomKeyStoreCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1CreateAliasCommand(input: CreateAliasCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1CreateCustomKeyStoreCommand(input: CreateCustomKeyStoreCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1CreateGrantCommand(input: CreateGrantCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1CreateKeyCommand(input: CreateKeyCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1DecryptCommand(input: DecryptCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1DeleteAliasCommand(input: DeleteAliasCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1DeleteCustomKeyStoreCommand(input: DeleteCustomKeyStoreCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1DeleteImportedKeyMaterialCommand(input: DeleteImportedKeyMaterialCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1DescribeCustomKeyStoresCommand(input: DescribeCustomKeyStoresCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1DescribeKeyCommand(input: DescribeKeyCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1DisableKeyCommand(input: DisableKeyCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1DisableKeyRotationCommand(input: DisableKeyRotationCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1DisconnectCustomKeyStoreCommand(input: DisconnectCustomKeyStoreCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1EnableKeyCommand(input: EnableKeyCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1EnableKeyRotationCommand(input: EnableKeyRotationCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1EncryptCommand(input: EncryptCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1GenerateDataKeyCommand(input: GenerateDataKeyCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1GenerateDataKeyPairCommand(input: GenerateDataKeyPairCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1GenerateDataKeyPairWithoutPlaintextCommand(input: GenerateDataKeyPairWithoutPlaintextCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1GenerateDataKeyWithoutPlaintextCommand(input: GenerateDataKeyWithoutPlaintextCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1GenerateRandomCommand(input: GenerateRandomCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1GetKeyPolicyCommand(input: GetKeyPolicyCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1GetKeyRotationStatusCommand(input: GetKeyRotationStatusCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1GetParametersForImportCommand(input: GetParametersForImportCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1GetPublicKeyCommand(input: GetPublicKeyCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1ImportKeyMaterialCommand(input: ImportKeyMaterialCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1ListAliasesCommand(input: ListAliasesCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1ListGrantsCommand(input: ListGrantsCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1ListKeyPoliciesCommand(input: ListKeyPoliciesCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1ListKeysCommand(input: ListKeysCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1ListResourceTagsCommand(input: ListResourceTagsCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1ListRetirableGrantsCommand(input: ListRetirableGrantsCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1PutKeyPolicyCommand(input: PutKeyPolicyCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1ReEncryptCommand(input: ReEncryptCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1RetireGrantCommand(input: RetireGrantCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1RevokeGrantCommand(input: RevokeGrantCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1ScheduleKeyDeletionCommand(input: ScheduleKeyDeletionCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1SignCommand(input: SignCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1TagResourceCommand(input: TagResourceCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1UntagResourceCommand(input: UntagResourceCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1UpdateAliasCommand(input: UpdateAliasCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1UpdateCustomKeyStoreCommand(input: UpdateCustomKeyStoreCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1UpdateKeyDescriptionCommand(input: UpdateKeyDescriptionCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function serializeAws_json1_1VerifyCommand(input: VerifyCommandInput, context: __SerdeContext): Promise<__HttpRequest>;
export declare function deserializeAws_json1_1CancelKeyDeletionCommand(output: __HttpResponse, context: __SerdeContext): Promise<CancelKeyDeletionCommandOutput>;
export declare function deserializeAws_json1_1ConnectCustomKeyStoreCommand(output: __HttpResponse, context: __SerdeContext): Promise<ConnectCustomKeyStoreCommandOutput>;
export declare function deserializeAws_json1_1CreateAliasCommand(output: __HttpResponse, context: __SerdeContext): Promise<CreateAliasCommandOutput>;
export declare function deserializeAws_json1_1CreateCustomKeyStoreCommand(output: __HttpResponse, context: __SerdeContext): Promise<CreateCustomKeyStoreCommandOutput>;
export declare function deserializeAws_json1_1CreateGrantCommand(output: __HttpResponse, context: __SerdeContext): Promise<CreateGrantCommandOutput>;
export declare function deserializeAws_json1_1CreateKeyCommand(output: __HttpResponse, context: __SerdeContext): Promise<CreateKeyCommandOutput>;
export declare function deserializeAws_json1_1DecryptCommand(output: __HttpResponse, context: __SerdeContext): Promise<DecryptCommandOutput>;
export declare function deserializeAws_json1_1DeleteAliasCommand(output: __HttpResponse, context: __SerdeContext): Promise<DeleteAliasCommandOutput>;
export declare function deserializeAws_json1_1DeleteCustomKeyStoreCommand(output: __HttpResponse, context: __SerdeContext): Promise<DeleteCustomKeyStoreCommandOutput>;
export declare function deserializeAws_json1_1DeleteImportedKeyMaterialCommand(output: __HttpResponse, context: __SerdeContext): Promise<DeleteImportedKeyMaterialCommandOutput>;
export declare function deserializeAws_json1_1DescribeCustomKeyStoresCommand(output: __HttpResponse, context: __SerdeContext): Promise<DescribeCustomKeyStoresCommandOutput>;
export declare function deserializeAws_json1_1DescribeKeyCommand(output: __HttpResponse, context: __SerdeContext): Promise<DescribeKeyCommandOutput>;
export declare function deserializeAws_json1_1DisableKeyCommand(output: __HttpResponse, context: __SerdeContext): Promise<DisableKeyCommandOutput>;
export declare function deserializeAws_json1_1DisableKeyRotationCommand(output: __HttpResponse, context: __SerdeContext): Promise<DisableKeyRotationCommandOutput>;
export declare function deserializeAws_json1_1DisconnectCustomKeyStoreCommand(output: __HttpResponse, context: __SerdeContext): Promise<DisconnectCustomKeyStoreCommandOutput>;
export declare function deserializeAws_json1_1EnableKeyCommand(output: __HttpResponse, context: __SerdeContext): Promise<EnableKeyCommandOutput>;
export declare function deserializeAws_json1_1EnableKeyRotationCommand(output: __HttpResponse, context: __SerdeContext): Promise<EnableKeyRotationCommandOutput>;
export declare function deserializeAws_json1_1EncryptCommand(output: __HttpResponse, context: __SerdeContext): Promise<EncryptCommandOutput>;
export declare function deserializeAws_json1_1GenerateDataKeyCommand(output: __HttpResponse, context: __SerdeContext): Promise<GenerateDataKeyCommandOutput>;
export declare function deserializeAws_json1_1GenerateDataKeyPairCommand(output: __HttpResponse, context: __SerdeContext): Promise<GenerateDataKeyPairCommandOutput>;
export declare function deserializeAws_json1_1GenerateDataKeyPairWithoutPlaintextCommand(output: __HttpResponse, context: __SerdeContext): Promise<GenerateDataKeyPairWithoutPlaintextCommandOutput>;
export declare function deserializeAws_json1_1GenerateDataKeyWithoutPlaintextCommand(output: __HttpResponse, context: __SerdeContext): Promise<GenerateDataKeyWithoutPlaintextCommandOutput>;
export declare function deserializeAws_json1_1GenerateRandomCommand(output: __HttpResponse, context: __SerdeContext): Promise<GenerateRandomCommandOutput>;
export declare function deserializeAws_json1_1GetKeyPolicyCommand(output: __HttpResponse, context: __SerdeContext): Promise<GetKeyPolicyCommandOutput>;
export declare function deserializeAws_json1_1GetKeyRotationStatusCommand(output: __HttpResponse, context: __SerdeContext): Promise<GetKeyRotationStatusCommandOutput>;
export declare function deserializeAws_json1_1GetParametersForImportCommand(output: __HttpResponse, context: __SerdeContext): Promise<GetParametersForImportCommandOutput>;
export declare function deserializeAws_json1_1GetPublicKeyCommand(output: __HttpResponse, context: __SerdeContext): Promise<GetPublicKeyCommandOutput>;
export declare function deserializeAws_json1_1ImportKeyMaterialCommand(output: __HttpResponse, context: __SerdeContext): Promise<ImportKeyMaterialCommandOutput>;
export declare function deserializeAws_json1_1ListAliasesCommand(output: __HttpResponse, context: __SerdeContext): Promise<ListAliasesCommandOutput>;
export declare function deserializeAws_json1_1ListGrantsCommand(output: __HttpResponse, context: __SerdeContext): Promise<ListGrantsCommandOutput>;
export declare function deserializeAws_json1_1ListKeyPoliciesCommand(output: __HttpResponse, context: __SerdeContext): Promise<ListKeyPoliciesCommandOutput>;
export declare function deserializeAws_json1_1ListKeysCommand(output: __HttpResponse, context: __SerdeContext): Promise<ListKeysCommandOutput>;
export declare function deserializeAws_json1_1ListResourceTagsCommand(output: __HttpResponse, context: __SerdeContext): Promise<ListResourceTagsCommandOutput>;
export declare function deserializeAws_json1_1ListRetirableGrantsCommand(output: __HttpResponse, context: __SerdeContext): Promise<ListRetirableGrantsCommandOutput>;
export declare function deserializeAws_json1_1PutKeyPolicyCommand(output: __HttpResponse, context: __SerdeContext): Promise<PutKeyPolicyCommandOutput>;
export declare function deserializeAws_json1_1ReEncryptCommand(output: __HttpResponse, context: __SerdeContext): Promise<ReEncryptCommandOutput>;
export declare function deserializeAws_json1_1RetireGrantCommand(output: __HttpResponse, context: __SerdeContext): Promise<RetireGrantCommandOutput>;
export declare function deserializeAws_json1_1RevokeGrantCommand(output: __HttpResponse, context: __SerdeContext): Promise<RevokeGrantCommandOutput>;
export declare function deserializeAws_json1_1ScheduleKeyDeletionCommand(output: __HttpResponse, context: __SerdeContext): Promise<ScheduleKeyDeletionCommandOutput>;
export declare function deserializeAws_json1_1SignCommand(output: __HttpResponse, context: __SerdeContext): Promise<SignCommandOutput>;
export declare function deserializeAws_json1_1TagResourceCommand(output: __HttpResponse, context: __SerdeContext): Promise<TagResourceCommandOutput>;
export declare function deserializeAws_json1_1UntagResourceCommand(output: __HttpResponse, context: __SerdeContext): Promise<UntagResourceCommandOutput>;
export declare function deserializeAws_json1_1UpdateAliasCommand(output: __HttpResponse, context: __SerdeContext): Promise<UpdateAliasCommandOutput>;
export declare function deserializeAws_json1_1UpdateCustomKeyStoreCommand(output: __HttpResponse, context: __SerdeContext): Promise<UpdateCustomKeyStoreCommandOutput>;
export declare function deserializeAws_json1_1UpdateKeyDescriptionCommand(output: __HttpResponse, context: __SerdeContext): Promise<UpdateKeyDescriptionCommandOutput>;
export declare function deserializeAws_json1_1VerifyCommand(output: __HttpResponse, context: __SerdeContext): Promise<VerifyCommandOutput>;
