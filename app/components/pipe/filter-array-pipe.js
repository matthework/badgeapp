"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// Filter Array of Objects
var FilterArrayPipe = (function () {
    function FilterArrayPipe() {
    }
    FilterArrayPipe.prototype.transform = function (value, args) {
        if (!args) {
            return value;
        }
        else if (value) {
            return value.filter(function (item) {
                for (var _i = 0, _a = Object.keys(item); _i < _a.length; _i++) {
                    var key = _a[_i];
                    // console.log('you submitted value: ', key);
                    if ((typeof item[key] === 'string' || item[key] instanceof String) && key != '_id' && key != 'timestamp' &&
                        (item[key].toLowerCase().indexOf(args.toLowerCase()) !== -1)) {
                        console.log('you submitted value: ', item[key]);
                        return true;
                    }
                    else if ((typeof item[key] === 'number' || item[key] instanceof Number) &&
                        (item[key].toString().indexOf(args) !== -1)) {
                        console.log('you submitted value2: ', item[key]);
                        return true;
                    }
                }
            });
        }
    };
    FilterArrayPipe = __decorate([
        core_1.Injectable(),
        core_1.Pipe({ name: 'filter' }), 
        __metadata('design:paramtypes', [])
    ], FilterArrayPipe);
    return FilterArrayPipe;
}());
exports.FilterArrayPipe = FilterArrayPipe;
//# sourceMappingURL=filter-array-pipe.js.map