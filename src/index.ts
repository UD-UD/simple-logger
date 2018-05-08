import stringFormat = require('string-format');
import * as dateFormat from 'dateformat';

enum LogType {
    debug,
    log,
    warn,
    error
}

interface FormatVariables {
    [variableName: string]: string;
}

export class SimpleLogger {
    static defaultFormatString = '{HH}:{MM}:{ss} - {module} - {message}';
    private formatString: string;
    private moduleName: string;

    constructor(moduleName: string) {
        this.formatString = ''; // Hack for older TS version
        this.initDefaults();
        this.moduleName = moduleName;
    }

    initDefaults() {
        // default format string
        this.formatString = SimpleLogger.defaultFormatString;
    }

    getDefaultFormatVariables(date?: Date): FormatVariables {
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

    getFormattedMessage(coreMessage: string): string {
        const formatVariables = this.getDefaultFormatVariables();
        formatVariables['module'] = this.moduleName;
        formatVariables['message'] = coreMessage;
        // Add fixURL here

        const formattedMessage = stringFormat(this.formatString, formatVariables);

        return formattedMessage;
    }

    // Use preDraw methods to do remote logging, if needed
    preDrawRaw(coreMessage: string, fixUrl: string | undefined, logType: LogType, cancel: () => void): void {

    }

    preDraw(formattedMessage: string, logType: LogType, cancel: () => void): void {

    }
    
    log(coreMessage: string) {
        let cancelDraw = false;

        const cancelFn = function () {
            cancelDraw = true;
        }
        const formattedMessage = this.getFormattedMessage(coreMessage);

        this.preDrawRaw(coreMessage, undefined, LogType.log, cancelFn);
        this.preDraw(formattedMessage, LogType.log, cancelFn);

        if (!cancelDraw) {
            console.log(formattedMessage);
        }
    }

    debug(coreMessage: string) {
        let cancelDraw = false;

        const cancelFn = function () {
            cancelDraw = true;
        }
        const formattedMessage = this.getFormattedMessage(coreMessage);

        this.preDrawRaw(coreMessage, undefined, LogType.debug, cancelFn);
        this.preDraw(formattedMessage, LogType.debug, cancelFn);

        if (!cancelDraw) {
            console.debug(formattedMessage);
        }
    }

    warn(coreMessage: string) {
        let cancelDraw = false;

        const cancelFn = function () {
            cancelDraw = true;
        }
        const formattedMessage = this.getFormattedMessage(coreMessage);

        this.preDrawRaw(coreMessage, undefined, LogType.warn, cancelFn);
        this.preDraw(formattedMessage, LogType.warn, cancelFn);

        if (!cancelDraw) {
            console.warn(formattedMessage);
        }
    }

    error(coreMessage: string) {
        let cancelDraw = false;

        const cancelFn = function () {
            cancelDraw = true;
        }
        const formattedMessage = this.getFormattedMessage(coreMessage);

        this.preDrawRaw(coreMessage, undefined, LogType.error, cancelFn);
        this.preDraw(formattedMessage, LogType.error, cancelFn);

        if (!cancelDraw) {
            console.error(formattedMessage);
        }
    }
}

