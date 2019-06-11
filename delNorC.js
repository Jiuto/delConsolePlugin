"use strict";
var DelNoteOrConsole = /** @class */ (function () {
    function DelNoteOrConsole(n, c) {
        this.note = n;
        if (c) {
            this.cons = c;
        }
    }
    DelNoteOrConsole.prototype.apply = function (compiler) {
        var that = this;
        compiler.plugin('emit', function (compilation, callback) {
            // 探索每个块（构建后的输出）:
            compilation.chunks.forEach(function (chunk) {
                // 探索块生成的每个资源文件名
                chunk.files.forEach(function (filename) {
                    var source = compilation.assets[filename].source();
                    if (that.note) {
                        // 匹配出所有的字符串和行块注释
                        var reg = /('([\\\']|.)*')|("([\\\"]|.)*")|(\/\*[\s\S]*?\*\/)|(\/\/(.)*.*?(\r|\n))/g;
                        // 得到块生成的每个文件资源的源码
                        source = (source + "\r").replace(reg, function (word) {
                            // 忽略字符串并替换行块注释
                            return /^\/\//.test(word) || /^\/\*/.test(word) ? "" : word;
                        });
                    }
                    if (that.cons) {
                        source = source.replace(/console\.(log|dir|info)\(.*\);?/g, '');
                    }
                    // 返回
                    compilation.assets[filename] = {
                        source: function () {
                            return source;
                        },
                        size: function () {
                            return source.length;
                        }
                    };
                });
            });
            callback();
        });
    };
    return DelNoteOrConsole;
}());
module.exports = DelNoteOrConsole;
