// Este arquivo foi feito apenas para deixar um aprendizado registrado sobre Decorators
// https://javascript.plainenglish.io/how-to-write-simple-router-decorators-for-expressjs-with-typescript-3b8340b4d453

enum MetadataKeys {
  BASE_PATH = 'base_path',
  ROUTERS = 'routers',
}

enum Methods {
  GET = 'get',
  POST = 'post',
}

interface IRouter {
  method: Methods;
  path: string;
  handlerName: string | symbol;
}

const Controller = (basePath: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
  };
};

const methodDecoratorFactory = (method: Methods) => {
  return (path: string): MethodDecorator => {
    return (target, propertyKey) => {
      const controllerClass = target.constructor;

      const routers: IRouter[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass)
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
