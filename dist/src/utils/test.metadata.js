"use strict";
// Este arquivo foi feito apenas para deixar um aprendizado registrado sobre Decorators
// https://javascript.plainenglish.io/how-to-write-simple-router-decorators-for-expressjs-with-typescript-3b8340b4d453
Object.defineProperty(exports, "__esModule", { value: true });
var MetadataKeys;
(function (MetadataKeys) {
    MetadataKeys["BASE_PATH"] = "base_path";
    MetadataKeys["ROUTERS"] = "routers";
})(MetadataKeys || (MetadataKeys = {}));
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
})(Methods || (Methods = {}));
const Controller = (basePath) => {
    return (target) => {
        Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
    };
};
const methodDecoratorFactory = (method) => {
    return (path) => {
        return (target, propertyKey) => {
            const controllerClass = target.constructor;
            const routers = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass)
                ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass) : [];
            routers.push({
                method,
                path,
                handlerName: propertyKey,
            });
            Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
        };
    };
};
const Get = methodDecoratorFactory(Methods.GET);
const Post = methodDecoratorFactory(Methods.POST);
//# sourceMappingURL=test.metadata.js.map