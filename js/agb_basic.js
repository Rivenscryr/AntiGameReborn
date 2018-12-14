AGB.Time = {
    timestamp: function () {
        return Math.floor(Date.now() / 1E3);
    },
    timestampMinute: function () {
        return Math.floor((Date.now() - 1381E9) / 6E4);
    },
    timestampMinuteConvert: function (a) {
        return 1E3 < a ? 60 * (+a || 0) + 1381E6 : 0;
    }
};

const VAL = {
    // function takes more than one argument, checks if first arg equals to one of the other args
    // returns true if it finds a match
    check: function (val) {
        for (let i = 1; i < arguments.length; i++) {
            if (val === arguments[i]) {
                return true;
            }
        }
        return false;
    }
};

const OBJ = {
    is: function (obj) {
        return obj && "object" === typeof obj;
    },
    // get property "prop" of object "obj"
    get: function (obj, prop) {
        if (obj && "object" === typeof obj && prop in obj)
            return obj[prop];
        else return "";
    },
    iterate: function (obj, callback) {
        if (obj && "object" === typeof obj) {
            for (let key in obj) {
                obj.hasOwnProperty(key) && callback(key);
            }
        }
    },
    iterateArray: function (array, callback) {
        Array.isArray(array) && array.forEach(callback)
    },
    // create object out of object obj
    create: function (obj) {
        let tempObj = {};
        if (obj && "object" === typeof obj) {
            for (let key in obj) {
                "object" !== typeof obj[key] && "function" !== typeof obj[key] && (tempObj[key] = obj[key]);
            }
        }
        return tempObj;
    },
    // creates object with one key and its value
    createKey: function (key, value) {
        let tempObj = {};
        key && (tempObj[key] = value);
        return tempObj;
    },
    // creates object out of object "obj" while filtering all propeties that aren't contained in object "filterObj"
    createFilter: function (obj, filterObj) {
        let tempObj = {};
        if (obj && "object" === typeof obj) {
            for (let key in obj) {
                obj.hasOwnProperty(key) && "object" !== typeof obj[key] && (!filterObj || key in filterObj) && (tempObj[key] = obj[key]);
            }
        }
        return tempObj;
    },
    // copy properties of object obj into target
    copy: function (obj, target) {
        if (obj && "object" === typeof obj && target && "object" === typeof target) {
            for (let key in obj) {
                "object" !== typeof obj[key] && (target[key] = obj[key]);
            }
        }
    },
    // parse a json object
    parse: function (jObj) {
        if (jObj && "object" === typeof jObj) {
            return jObj;
        }
        try {
            return JSON.parse(jObj || "{}")
        } catch (err) {
            return {}
        }
    },
    // parse a json object and copy into a target object
    parseCopy: function (obj, target) {
        let tempObj;
        if (obj && target) {
            try {
                tempObj = obj && "object" === typeof obj ? obj : JSON.parse(obj || "{}");
            } catch (e) {
                tempObj = null;
            }
            if (tempObj) {
                for (let key in tempObj) {
                    "object" !== typeof tempObj[key] && (target[key] = tempObj[key]);
                }
            }
        }
    },
    // creates an object out of a string
    // input string:
    //     key1=value1;key2=value2;key3=value3
    // output object:
    //     { key1: value1, key2: value2, key3: value3 }
    split: function (input) {
        let tempObj = {};
        input = STR.check(input).split(";");
        for (let i = 0; i < input.length; i++) {
            let c = (input[i] || "").split("=");
            c[0] && (tempObj[c[0]] = c[1] || "");
        }
        return tempObj;
    }
};

const STR = {
    is: function (input) {
        return Boolean(input && "string" === typeof input);
    },
    // checks if input is of type string and converts it into a string if it's a number
    // otherwise returns empty string
    check: function (input) {
        if ("string" === typeof input)
            return input;
        else if ("number" === typeof input && input)
            return input + "";
        else
            return "";
    },
    // trim a string or convert number to string
    trim: function (input) {
        if ("string" === typeof input)
            return input.trim();
        else if ("number" === typeof input && input)
            return input + "";
        else
            return "";
    },
    // returns the input number "zeroed" back, n = number of digits
    // trimZero(2, 3) = 002
    trimZero: function (input, n) {
        input = "0000" + input;
        return input.substr(-n)
    },
    // takes string of schema ' id="8">Trümmerfeld abbauen</name>' and extracts attribute attr, e.g. "id" and returns its value
    getAttribute: function (input, attr) {
        let output;
        if ("string" === typeof input) {
            output = input.split(" " + attr + '="')[1] || "";   // '8">Trümmerfeld abbauen</name>'
            output = output.split('"')[0] || "";                // '8'
            output = output.trim();
            return output;
        } else
            return "";
    },
    // returns a string to be added to a URL
    //     '&param=value'
    addUrlPara: function (param, value) {
        value = encodeURI(STR.check(value).trim());
        if (param && value)
            return "&" + param + "=" + value;
        else
            return "";
    },
    // returns a hash-type number
    hash: function (input) {
        let hash = 0;
        if ("string" === typeof input && 0 < input.length) {
            for (let i = 0; i < input.length; i++) {
                hash = (hash << 5) - hash + input.charCodeAt(i);
                hash &= hash;
            }
        }
        return hash;
    }
};

const NMR = {
    // takes smaller value out of a and c then compares it to b and takes greater value
    minMax: function (a, b, c) {
        return Math.max(Math.min(+a || 0, c), b);
    },
    isMinMax: function (a, b, c) {
        return +a >= b && +a <= c;
    },
    parseInt: function (input) {
        if ("string" === typeof input)
            return parseInt(input, 10);
        else if ("number" === typeof input)
            return Math.floor(input);
        else
            return 0;
    },
    // parses input into an integer, removes all chars except digits and "-"
    parseIntFormat: function (input) {
        if ("string" === typeof input)
            return +input.replace(/[^\d\-]/g, "") || 0;
        else if ("number" === typeof input)
            return Math.floor(input);
        else
            return 0;
    },
    // parses input into an absolute number
    parseIntAbs: function (input) {
        if ("string" === typeof input)
            return +input.replace(/[^\d]/g, "") || 0;
        else if ("number" === typeof input)
            return Math.floor(Math.abs(input));
        else
            return 0;
    }
};