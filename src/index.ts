import stringFormat = require('string-format');
import * as dateFormat from 'dateformat';

export enum LogLevel {
    debug = 100,
    log = 200,
    warn = 300,
    error = 400
}

interface FormatVariables {
    [variableName: string]: string;
}

export class SimpleLogger {
    static defaultFormatString = '{HH}:{MM}:{ss} - {module} - {message}';
    private formatString: string;
    private moduleName: string;
    private logLevel: LogLevel = LogLevel.log;

    constructor(moduleName: string) {
        this.formatString = ''; // Hack for older TS version
        this.initDefaults();
        this.moduleName = moduleName;
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

    setLogLevel(logLevel: LogLevel) {
        this.logLevel = logLevel;
    }

    getFormattedMessage(coreMessage: string): string {
        const formatVariables = this.getDefaultFormatVariables();
        formatVariables['module'] = this.moduleName;
        formatVariables['message'] = coreMessage;
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
        if (this.logLevel <= LogLevel.log) {
            this._log(coreMessage);
        }
    }

    private _log(coreMessage: string) {
        let cancelDraw = false;

        const cancelFn = function () {
            cancelDraw = true;
        }
        const formattedMessage = this.getFormattedMessage(coreMessage);

        this.preDrawRaw(coreMessage, undefined, LogLevel.log, cancelFn);
        this.preDraw(formattedMessage, LogLevel.log, cancelFn);

        if (!cancelDraw) {
            console.log(formattedMessage);
        }
    }

    public debug(coreMessage: string) {
        if (this.logLevel <= LogLevel.debug) {
            this._debug(coreMessage);
        }
    }

    private _debug(coreMessage: string) {
        let cancelDraw = false;

        const cancelFn = function () {
            cancelDraw = true;
        }
        const formattedMessage = this.getFormattedMessage(coreMessage);

        this.preDrawRaw(coreMessage, undefined, LogLevel.debug, cancelFn);
        this.preDraw(formattedMessage, LogLevel.debug, cancelFn);

        if (!cancelDraw) {
            console.debug(formattedMessage);
        }
    }

    public warn(coreMessage: string) {
        if (this.logLevel <= LogLevel.warn) {
            this._warn(coreMessage);
        }
    }

    private _warn(coreMessage: string) {
        let cancelDraw = false;

        const cancelFn = function () {
            cancelDraw = true;
        }
        const formattedMessage = this.getFormattedMessage(coreMessage);

        this.preDrawRaw(coreMessage, undefined, LogLevel.warn, cancelFn);
        this.preDraw(formattedMessage, LogLevel.warn, cancelFn);

        if (!cancelDraw) {
            console.warn(formattedMessage);
        }
    }

    public error(coreMessage: string) {
        if (this.logLevel <= LogLevel.error) {
            this._error(coreMessage);
        }
    }

    private _error(coreMessage: string) {
        let cancelDraw = false;

        const cancelFn = function () {
            cancelDraw = true;
        }
        const formattedMessage = this.getFormattedMessage(coreMessage);

        this.preDrawRaw(coreMessage, undefined, LogLevel.error, cancelFn);
        this.preDraw(formattedMessage, LogLevel.error, cancelFn);

        if (!cancelDraw) {
            console.error(formattedMessage);
        }
    }
}

