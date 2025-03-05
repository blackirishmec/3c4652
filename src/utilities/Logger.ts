const getStackTrace = (): string[] => {
	const error = new Error();
	const stack = error.stack ?? '';
	const stackLines = stack.split('\n');

	return stackLines;
};

// TODO: {Mon, 07/22/24 @13:35} => Have to integrate source map handling i.e. "Sentry" to use the filePath and lineNumber effectively!
interface ParseStackTrace {
	functionName?: string;
	filePath?: string;
	lineNumber?: number;
	columnNumber?: number;
}

const parseStackTrace = (stackLines: string[]): ParseStackTrace => {
	const callerLine = stackLines[5] || '';

	const matched =
		callerLine.match(/at (\w+) \((.+):(\d+):(\d+)\)/) ||
		callerLine.match(/at (\w+):(\d+):(\d+)/);

	const match = stackLines[2].trim().match(/at (.*):(\d+):(\d+)$/) ?? [];

	if (matched) {
		const functionName = matched[1];
		const filePath = match[1];
		const lineNumber = Number(match[2]);
		const columnNumber = Number(match[3]);
		return {
			functionName,
			filePath,
			lineNumber,
			columnNumber,
		};
	}

	return {
		functionName: undefined,
	};
};

const getFormattedTimestamp = (): string => {
	return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

const getFunctionNameFromStackTrace = (): string | undefined => {
	const stackLines = getStackTrace();

	const { functionName } = parseStackTrace(stackLines);

	return functionName;
};

interface LoggerProps {
	level: 'info' | 'warn' | 'error';
	message?: string;
	objectName?: string;
	object?: unknown;
	relativePath?: string;
	currentLine?: number;
}

interface GetStyledFormattedLogMessage extends LoggerProps {
	formattedTimestamp: string;
	functionName?: string;
}

interface GetStyledFormattedLogObjectMessage extends LoggerProps {
	formattedTimestamp: string;
	functionName?: string;
}

const ansiBlue = '\x1b[34m';
const ansiOrange = '\x1b[38;5;208m';
const lightGreen = '\x1b[38;5;82m';
const ansiLightSkyBlue = '\x1b[38;5;117m';
const ansiPink = '\x1b[38;5;207m';
const ansiYellow = '\x1b[33m';
const ansiRed = '\x1b[31m';
const ansiBold = '\x1b[1m';
const ansiItalic = '\x1b[3m';
const ansiDefault = '\x1b[0m';

const ansiTextColorMap: Record<string, string> = {
	info: ansiYellow,
	warn: ansiOrange,
	error: ansiRed,
};

const ansiFontWeightMap: Record<string, string> = {
	info: '',
	warn: ansiItalic,
	error: ansiBold,
};

const getStyledLevel = (level: LoggerProps['level']): string => {
	const ansiTextColor = ansiTextColorMap[level];
	const ansiFontWeight = ansiFontWeightMap[level];

	const styledLevel =
		ansiFontWeight + ansiTextColor + level.toUpperCase() + ansiDefault;

	return `{${styledLevel}} `;
};

const getStyledFormattedLogMessage = ({
	formattedTimestamp,
	level,
	message,
	relativePath,
	currentLine,
}: GetStyledFormattedLogMessage) => {
	const styledFormattedTimestamp = `[${ansiBlue}${formattedTimestamp}${ansiDefault}] `;

	const styledLevel = getStyledLevel(level);

	const styledCurrentLine =
		currentLine !== undefined
			? `${ansiPink}:${currentLine}${ansiDefault}`
			: '';

	const styledCurrentPath =
		relativePath !== undefined
			? `${lightGreen}${relativePath}${ansiDefault}`
			: '';

	const styledCurrentPathWithLine = `(${styledCurrentPath}${styledCurrentLine}) `;

	return (
		styledFormattedTimestamp +
		styledLevel +
		styledCurrentPathWithLine +
		message
	);
};

const getStyledFormattedLogObjectMessage = ({
	formattedTimestamp,
	level,
	objectName,
	object,
	relativePath,
	currentLine,
}: GetStyledFormattedLogObjectMessage) => {
	const styledFormattedTimestamp = `[${ansiBlue}${formattedTimestamp}${ansiDefault}] `;

	const styledLevel = getStyledLevel(level);

	const styledCurrentLine =
		currentLine !== undefined
			? `${ansiPink}.${currentLine}${ansiDefault}`
			: '';

	const styledCurrentPath =
		relativePath !== undefined
			? `${lightGreen}${relativePath}${ansiDefault}`
			: '';

	const styledCurrentPathWithLine = `(${styledCurrentPath}${styledCurrentLine}) `;

	const styledObjectName = `${ansiLightSkyBlue}${objectName}${ansiDefault}`;

	// let stringifiedObject = stringify(object, undefined, 4);
	const stringifiedObject = JSON.stringify(object, null, 4);

	return `${
		styledFormattedTimestamp + styledLevel + styledCurrentPathWithLine
	}${styledObjectName} = ${stringifiedObject}`;
};

const log = ({
	level,
	message,
	relativePath,
	currentLine,
}: LoggerProps): void => {
	const formattedTimestamp = getFormattedTimestamp();

	const formattedMessage = getStyledFormattedLogMessage({
		formattedTimestamp,
		level,
		message,
		relativePath,
		currentLine,
	});

	// eslint-disable-next-line no-console
	console.log(formattedMessage);
};

const logObject = ({
	level,
	objectName,
	object,
	relativePath,
	currentLine,
}: LoggerProps): void => {
	const formattedTimestamp = getFormattedTimestamp();

	const functionName = getFunctionNameFromStackTrace();

	const formattedMessage = getStyledFormattedLogObjectMessage({
		formattedTimestamp,
		functionName,
		level,
		objectName,
		object,
		relativePath,
		currentLine,
	});

	// eslint-disable-next-line no-console
	console.log(formattedMessage);
};

const info = (
	message: LoggerProps['message'],
	relativePath?: LoggerProps['relativePath'],
	currentLine?: LoggerProps['currentLine'],
) => log({ level: 'info', relativePath, message, currentLine });
const warn = (
	message: LoggerProps['message'],
	relativePath?: LoggerProps['relativePath'],
	currentLine?: LoggerProps['currentLine'],
) => log({ level: 'warn', relativePath, message, currentLine });
const error = (
	message: LoggerProps['message'],
	relativePath?: LoggerProps['relativePath'],
	currentLine?: LoggerProps['currentLine'],
) => log({ level: 'error', relativePath, message, currentLine });

const infoObject = (
	objectName: LoggerProps['objectName'],
	object: LoggerProps['object'],
	relativePath?: LoggerProps['relativePath'],
	currentLine?: LoggerProps['currentLine'],
) =>
	logObject({ level: 'info', relativePath, objectName, object, currentLine });
const warnObject = (
	objectName: LoggerProps['objectName'],
	object: LoggerProps['object'],
	relativePath?: LoggerProps['relativePath'],
	currentLine?: LoggerProps['currentLine'],
) =>
	logObject({ level: 'warn', relativePath, objectName, object, currentLine });
const errorObject = (
	objectName: LoggerProps['objectName'],
	object: LoggerProps['object'],
	relativePath?: LoggerProps['relativePath'],
	currentLine?: LoggerProps['currentLine'],
) =>
	logObject({
		level: 'error',
		relativePath,
		objectName,
		object,
		currentLine,
	});

export default {
	info,
	warn,
	error,
	infoObject,
	warnObject,
	errorObject,
};
