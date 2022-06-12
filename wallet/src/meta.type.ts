export interface MetamaskProvider {
	constants: Constants;
	errors: Errors;
	logger: Logger;
	providers: Providers;
	utils: Utils;
	version: string;
	wordlists: Wordlists;
}

export interface Constants {
	AddressZero: string;
	EtherSymbol: string;
	HashZero: string;
	MaxInt256: MaxInt256;
	MaxUint256: MaxInt256;
	MinInt256: MaxInt256;
	NegativeOne: MaxInt256;
	One: MaxInt256;
	Two: MaxInt256;
	WeiPerEther: MaxInt256;
	Zero: MaxInt256;
}

export interface MaxInt256 {
	type: string;
	hex: string;
}

export interface Errors {
	UNKNOWN_ERROR: string;
	NOT_IMPLEMENTED: string;
	UNSUPPORTED_OPERATION: string;
	NETWORK_ERROR: string;
	SERVER_ERROR: string;
	TIMEOUT: string;
	BUFFER_OVERRUN: string;
	NUMERIC_FAULT: string;
	MISSING_NEW: string;
	INVALID_ARGUMENT: string;
	MISSING_ARGUMENT: string;
	UNEXPECTED_ARGUMENT: string;
	CALL_EXCEPTION: string;
	INSUFFICIENT_FUNDS: string;
	NONCE_EXPIRED: string;
	REPLACEMENT_UNDERPRICED: string;
	UNPREDICTABLE_GAS_LIMIT: string;
	TRANSACTION_REPLACED: string;
}

export interface Logger {
	version: string;
}

export interface Providers {
	IpcProvider: null;
}

export interface Utils {
	FormatTypes: FormatTypes;
	RLP: Rlp;
	SupportedAlgorithm: SupportedAlgorithm;
	TransactionTypes: TransactionTypes;
	UnicodeNormalizationForm: UnicodeNormalizationForm;
	Utf8ErrorFuncs: Rlp;
	Utf8ErrorReason: Utf8ErrorReason;
	base58: Base58;
	base64: Rlp;
	defaultAbiCoder: DefaultABICoder;
	defaultPath: string;
}

export interface FormatTypes {
	sighash: string;
	minimal: string;
	full: string;
	json: string;
}

export interface Rlp {}

export interface SupportedAlgorithm {
	sha256: string;
	sha512: string;
}

export interface TransactionTypes {
	"0": string;
	"1": string;
	"2": string;
	legacy: number;
	eip2930: number;
	eip1559: number;
}

export interface UnicodeNormalizationForm {
	current: string;
	NFC: string;
	NFD: string;
	NFKC: string;
	NFKD: string;
}

export interface Utf8ErrorReason {
	UNEXPECTED_CONTINUE: string;
	BAD_PREFIX: string;
	OVERRUN: string;
	MISSING_CONTINUE: string;
	OUT_OF_RANGE: string;
	UTF16_SURROGATE: string;
	OVERLONG: string;
}

export interface Base58 {
	alphabet: string;
	base: number;
	_alphabetMap: { [key: string]: number };
	_leader: string;
}

export interface DefaultABICoder {
	coerceFunc: null;
}

export interface Wordlists {
	en: En;
}

export interface En {
	locale: string;
}
