/**
 * @class 基本的增删改查类
 * @class 调用它的方法来执行crud操作
 * @class 可以以它为基类定义更多方法
 * @param {model} Model 参数为一个model
 */
class BaseCrud {
    constructor(Model) {
        this.Model = Model;
    }

    /**
     * @description 使用create方法添加文档，
     * @param {object} obj 一个对象
     */
    create(obj) {
        return new Promise((resolve, reject) => {
            this.Model.create(obj, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    /**
     * @description 使用insertMany方法添加文档
     * @param {object} obj 对象或由对象组成的数组
     */
    insertMany(obj) {
        return new Promise((resolve, reject) => {
            this.Model.insertMany(obj, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    /**
     * @description 使用find方法查找文档
     * @param {object} obj 查询条件
     * @param {object} projection 表示返回文档的某几个字段
     */
    find(obj, projection = {}) {
        return new Promise((resolve, reject) => {
            this.Model.find(obj, projection, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    /**
     * @description 查询某个范围的文档
     * @param {object} obj 查询条件
     * @param {object} projection 返回数据的某几个字段
     * @param {number} m 从第m条查起（包括m）
     * @param {number} n 查询n条数据（n大于最大数量会查询到末尾）
     */
    findFrom(obj, projection = {}, m, n) {
        return new Promise((resolve, reject) => {
            this.Model.find(obj, projection, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
                .skip(m - 1)
                .limit(n);
        });
    }

    /**
     * @description 倒序查询某个范围的文档
     * @param {object} obj 查询条件
     * @param {object} projection 返回文档的某些字段
     * @param {number} m 倒序从第m条开始查起
     * @param {number} n 查询n条数据
     */
    findReverse(obj, projection = {}, m, n) {
        return new Promise((resolve, reject) => {
            this.Model.find(obj, projection, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
                .sort({ _id: -1 })
                .skip(m - 1)
                .limit(n);
        });
    }

    /**
     *@description 使用findOne方法查找数据
     * @param {object} selector 查询条件
     * @param {object} projection 返回文档的某一部分
     */
    findOne(selector, projection = {}) {
        return new Promise((resolve, reject) => {
            this.Model.findOne(selector, projection, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    /**
     * @description 使用count方法查找表内文档的数量
     * @param {objectt} obj 查找条件
     */
    findCount(obj = {}) {
        return new Promise((resolve, reject) => {
            this.Model.countDocuments(obj, (err, count) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(count);
                }
            });
        });
    }

    /**
     * @description 分页方法
     * @param {object} query 查询条件
     * @param {number} singleNumber 单页内元素的数量
     * @returns 返回分成的页数
     */
    async pagingFind(query, singleNumber) {
        try {
            let total = await this.findCount(query);
            if (total <= singleNumber) {
                return 1;
            } else {
                return Math.ceil(total / singleNumber);
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @description 跳转到某页的方法
     * @param {number} num 想要跳转到的页码
     * @param {number} singleNumber 单页内元素的数量
     * @param {object} projection 想要返回的字段
     * @param {object} query 查询条件
     * @returns 返回该页所有的文档
     */
    async jumpPaging(num, singleNumber, projection = {}, query = {}) {
        let list = [];
        try {
            let m = (num - 1) * singleNumber + 1;
            list = await this.findReverse(query, projection, m, singleNumber);
        } catch (error) {
            console.log(error);
        }
        return list;
    }

    /**
     * @description 更新匹配的第一个文档
     * @param {object} condition 匹配条件
     * @param {object} updater 更新方式
     */
    updateOne(condition, updater) {
        return new Promise((resolve, reject) => {
            this.Model.updateOne(condition, updater, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * @description 更新匹配到的所有文档
     * @param {object} condition 匹配条件
     * @param {object} updater 更新方式
     */
    updateMany(condition, updater) {
        return new Promise((resolve, reject) => {
            this.Model.updateMany(condition, updater, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * @description 删除匹配的第一条文档
     * @param {object} query 查询条件
     */
    deleteOne(query) {
        return new Promise((resolve, reject) => {
            this.Model.deleteOne(query, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * @description 删除匹配到的所有文档
     * @param {object} query 查询条件
     */
    deleteMany(query) {
        return new Promise((resolve, reject) => {
            this.Model.deleteMany(query, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    /**
     * @description 添加聚合管道并执行
     * @param {array} operation 聚合操作
     */
    aggregate(operation) {
        return new Promise((resolve, reject) => {
            this.Model.aggregate(operation).exec((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = BaseCrud;
