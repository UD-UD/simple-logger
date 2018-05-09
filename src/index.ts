import stringFormat = require('string-format');
import * as dateFormat from 'dateformat';

export enum LogLevel {
    DEBUG = 100,
    LOG = 200,
    WARN = 300,
    ERROR = 400
}

interface FormatVariables {
    [variableName: string]: string|number;
}

export class SimpleLogger {
    static defaultFormatString = '{HH}:{MM}:{ss}::{module}::{logLevel}:: {message}';
    static logLevel: LogLevel = LogLevel.LOG;
    private formatString: string;
    private moduleName: string;

    constructor(moduleName: string) {
        this.formatString = ''; // Hack for older TS version
        this.initDefaults();
        this.moduleName = moduleName;
    }

    static setLogLevel(logLevel: LogLevel) {
        this.logLevel = logLevel;
    }
    
    static resetLogLevel() {
        this.logLevel = LogLevel.LOG;
    }

    private initDefaults() {
        // default format string
        this.formatString = SimpleLogger.defaultFormatString;
    }

    private getDefaultFormatVariables(date?: Date): FormatVariables {
        if (date === undefined) {
            date = new Date();
        }

        // init formatVariables with variables related to date
        const formatVariables: FormatVariables = {
            // Parts of date
            'd': dateFormat(date, 'd'),
            'dd': dateFormat(date, 'dd'),
            'ddd': dateFormat(date, 'ddd'),
            'dddd': dateFormat(date, 'dddd'),
            'm': dateFormat(date, 'm'),
            'mm': dateFormat(date, 'mm'),
            'mmm': dateFormat(date, 'mmm'),
            'mmmm': dateFormat(date, 'mmmm'),
            'yy': dateFormat(date, 'yy'),
            'yyyy': dateFormat(date, 'yyyy'),
            'h': dateFormat(date, 'h'),
            'hh': dateFormat(date, 'hh'),
            'H': dateFormat(date, 'H'),
            'HH': dateFormat(date, 'HH'),
            'MM': dateFormat(date, 'MM'),
            'MMMM': dateFormat(date, 'MMMM'),
            's': dateFormat(date, 's'),
            'ss': dateFormat(date, 'ss'),
            'l': dateFormat(date, 'l'),
            'L': dateFormat(date, 'L'),
            't': dateFormat(date, 't'),
            'tt': dateFormat(date, 'tt'),
            'T': dateFormat(date, 'T'),
            'TT': dateFormat(date, 'TT'),
            'W': dateFormat(date, 'W'),

            // Pre-defined names
            'default': dateFormat(date, 'default'),
            'shortDate': dateFormat(date, 'shortDate'),
            'mediumDate': dateFormat(date, 'mediumDate'),
            'longDate': dateFormat(date, 'longDate'),
            'fullDate': dateFormat(date, 'fullDate'),
            'shortTime': dateFormat(date, 'shortTime'),
            'mediumTime': dateFormat(date, 'mediumTime'),
            'longTime': dateFormat(date, 'longTime'),
            'isoDate': dateFormat(date, 'isoDate'),
            'isoTime': dateFormat(date, 'isoTime'),
            'isoDateTime': dateFormat(date, 'isoDateTime'),
            'isoUtcDateTime': dateFormat(date, 'isoUtcDateTime'),
            'expiresHeaderFormat': dateFormat(date, 'expiresHeaderFormat'),
        };

        return formatVariables;
    }

    setFormatString(newFormatString: string) {
        this.formatString = newFormatString;
    }

    getFormattedMessage(coreMessage: string, logLevel:LogLevel): string {
        const formatVariables = this.getDefaultFormatVariables();
        formatVariables['module'] = this.moduleName;
        formatVariables['message'] = coreMessage;
        formatVariables['logLevel'] = LogLevel[logLevel];
        // Add fixURL here

        const formattedMessage = stringFormat(this.formatString, formatVariables);

        return formattedMessage;
    }

    // Use preDraw methods to do remote logging, if needed
    preDrawRaw(coreMessage: string, fixUrl: string | undefined, logType: LogLevel, cancel: () => void): void {

    }

    preDraw(formattedMessage: string, logType: LogLevel, cancel: () => void): void {

    }

    public log(coreMessage: string) {
        if (SimpleLogger.logLevel <= LogLevel.LOG) {
            this._log(coreMessage);
        }
    }

    private _log(coreMessage: string) {
        let cancelDraw = false;

        const cancelFn = function () {
            cancelDraw = true;
        }
        const formattedMessage = this.getFormattedMessage(coreMessage,LogLevel.LOG);

        this.preDrawRaw(coreMessage, undefined, LogLevel.LOG, cancelFn);
        this.preDraw(formattedMessage, LogLevel.LOG, cancelFn);

        if (!cancelDraw) {
            console.log(formattedMessage);
        }
    }

    public debug(coreMessage: string) {
        if (SimpleLogger.logLevel <= LogLevel.DEBUG) {
            this._debug(coreMessage);
        }
    }

    private _debug(coreMessage: string) {
        let cancelDraw = false;

        const cancelFn = function () {
            cancelDraw = true;
        }
        const formattedMessage = this.getFormattedMessage(coreMessage,LogLevel.DEBUG);

        this.preDrawRaw(coreMessage, undefined, LogLevel.DEBUG, cancelFn);
        this.preDraw(formattedMessage, LogLevel.DEBUG, cancelFn);

        if (!cancelDraw) {
            console.debug(formattedMessage);
        }
    }

    public warn(coreMessage: string) {
        if (SimpleLogger.logLevel <= LogLevel.WARN) {
            this._warn(coreMessage);
        }
    }

    private _warn(coreMessage: string) {
        let cancelDraw = false;

        const cancelFn = function () {
            cancelDraw = true;
        }
        const formattedMessage = this.getFormattedMessage(coreMessage,LogLevel.WARN);

        this.preDrawRaw(coreMessage, undefined, LogLevel.WARN, cancelFn);
        this.preDraw(formattedMessage, LogLevel.WARN, cancelFn);

        if (!cancelDraw) {
            console.warn(formattedMessage);
        }
    }

    public error(coreMessage: string) {
        if (SimpleLogger.logLevel <= LogLevel.ERROR) {
            this._error(coreMessage);
        }
    }

    private _error(coreMessage: string) {
        let cancelDraw = false;

        const cancelFn = function () {
            cancelDraw = true;
        }
        const formattedMessage = this.getFormattedMessage(coreMessage,LogLevel.ERROR);

        this.preDrawRaw(coreMessage, undefined, LogLevel.ERROR, cancelFn);
        this.preDraw(formattedMessage, LogLevel.ERROR, cancelFn);

        if (!cancelDraw) {
            console.error(formattedMessage);
        }
    }
}

