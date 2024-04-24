---
title: 设计模式
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,设计模式
---

## 接口

- **注释法**：易于实现，不需要额外的类或函数，提高代码重用性；不提供错误信息，对测试调试没什么帮助
- **属性检查法**：提供了文档说明；未确保类真正实现了接口
- **鸭式辩型法**：不借助注释，对所有接口进行检查；不声明实现接口，降低了代码可重用性

## 封装

优点：封装保护内部数据的完整性，数据访问的权限限制为取值器和赋值器的方法，便于重构  
缺点：很难进行单元测试，增加错误调试难度

### 1. 门户大开型对象

定义接口，有取值器和赋值器方法，检验方法

### 2. 用命名规范区别私有成员

与门户大开型对象如出一辙，但是用带下划线的属性和方法来标识私有的

### 3. 闭包实现私有成员

函数是运行在定义它们的作用域，而不是运行在调用它们的作用域。  
在构造器作用域中定义相关属性，不需要访问私有属性的方法，可以在 prototyp 上定义。  
特权方法是公有方法，能访问私有属性和方法。

对比

- 第 3 种不利于派生子类，不能访问超类的私有属性和方法；前 2 种可以
- 第 3 种每个实例会创建一个私有方法和特权方法的新副本，前 2 种不会

### 4. 静态属性和方法

在自调用匿名函数中（同时构造函数外）声明的属性和方法，是私有静态属性和方法，只会被创建一份。  
不需要访问实例数据，那就创建为私有静态方法。  
公有静态属性和方法，直接在构造函数上添加属性。

## 继承

### 1. 类式继承

通过构造函数实现继承，创建的每个对象都有一份该类所有实例属性副本，但每个实例方法只存在一份，每个对象都有指向它的链接

### 1.1 原型链

缺点：

- 手动设置 子类的 prototype 指向超类的实例，并且设置子类原型的 constructor 属性为子类本身
- 超类的名称被固化在子类的声明中

```js
function Album(artist) {
  this.artist = artist;
}
Album.prototype.getArtist = function () {
  return this.artist;
};
function Song(artist, name) {
  Album.call(this, artist);
  this.name = name;
}
Song.prototype = new Album();
Song.prototype.constructor = Song;
Song.prototype.getName = function () {
  return this.name;
};
var song = new Song("Taylor Swift", "Begin Again");
// {artist: "Taylor Swift", name: "Begin Again"}
```

### 1.2 extend 函数

优点：直接通过 extend 函数实现 子类的 prototype 指向超类的实例，并且设置子类原型的 constructor 属性为子类本身  
缺点：超类的名称被固化在子类的声明中

```js
function extend(subClass, superClass) {
  var F = function () {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;
}
function Album(artist) {
  this.artist = artist;
}
Album.prototype.getArtist = function () {
  return this.artist;
};
function Song(artist, name) {
  Album.call(this, artist);
  this.name = name;
}
Song.prototype.getName = function () {
  return this.name;
};
extend(Song, Album);
var song = new Song("Taylor Swift", "Begin Again");
// {artist: "Taylor Swift", name: "Begin Again"}
```

优化：

```js
function extend(subClass, superClass) {
  var F = function () {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;
  subClass.superClass = superClass.prototype;
  // 确保超类的constructor属性被正确设置
  if (superClass.prototype.constructor === Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}
function Album(artist) {
  this.artist = artist;
}
Album.prototype.getArtist = function () {
  return this.artist;
};
function Song(artist, name) {
  Song.superClass.constructor.call(this, artist);
  this.name = name;
}
Song.prototype.getName = function () {
  return this.name;
};
extend(Song, Album);
var song = new Song("Taylor Swift", "Begin Again");
// {artist: "Taylor Swift", name: "Begin Again"}
```

### 2. 原型式继承

通过创建对象实现继承，克隆出来的对象共享每个属性和方法的唯一一份实例，只在重新赋值时，才会有改变

```js
function clone(object) {
  var F = function () {};
  F.prototype = object;
  return new F();
}
var Album = {
  artist: "",
  getArtist: function () {
    return this.artist;
  },
};
var Song = clone(Album);
Song.name = "";
Song.getName = function () {
  return this.name;
};
var song = clone(Song);
song.artist = "Taylor Swift";
song.name = "Begin Again";
```

### 3. 掺元类

创建一个具有各种方法的类，然后扩充其他类，

```js
var Mixin = function () {};
Mixin.prototype = {
  serialize: function () {},
};
function augment(rClass, gClass) {
  for (name in gClass.prototype) {
    if (!rClass.prototype[name]) {
      rClass.prototype[name] = gClass.prototype[name];
    }
  }
}
function extend(subClass, superClass) {
  var F = function () {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;
  subClass.superClass = superClass.prototype;
  // 确保超类的constructor属性被正确设置
  if (superClass.prototype.constructor === Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}
function Album(artist) {
  this.artist = artist;
}
Album.prototype.getArtist = function () {
  return this.artist;
};
function Song(artist, name) {
  Song.superClass.constructor.call(this, artist);
  this.name = name;
}
Song.prototype.getName = function () {
  return this.name;
};
extend(Song, Album);
augment(Song, Mixin);
var song = new Song("Taylor Swift", "Begin Again");
```

总结：对于内存效率注重的，使用类式继承；对于类之间差异较大的，使用掺元类

## 单体模式

用来划分命名空间并整合一些方法和属性的对象，通过匿名自调用函数实现私有成员

```js
var Album = (function () {
  function getDetailInfo() {}
  return {
    artist: "",
    getArtist: function () {},
  };
})();
Album.getArtist();
```

### 1. 惰性实例化

延迟初始化，通过是否创建实例判断需要初始化

```js
var Album = (function () {
  var instance;
  function constructor() {
    function getDetailInfo() {}
    return {
      artist: "",
      getArtist: function () {},
    };
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = constructor();
      }
      return instance;
    },
  };
})();
Album.getInstance().getArtist();
```

### 2. 分支

考虑不同环境需要产生不同的对象，在内部生成的时，需要在判断需要产生哪一个对象所需耗时和生成多个对象所产生的内存占用之间权衡。

```js
var Album = (function () {
  var pc = {};
  var mobile = {};
  return navigator.platform === "Win32" ? pc : mobile;
})();
```

优点：

- 便于调试和维护，描述性的命名空间增强代码的自我说明性，与第三方插件隔离，防止被他人误改。
- 使用惰性实例化技术，减少内存消耗；使用分支技术，兼容不同环境或浏览器
  缺点：
- 可能导致模块间的强耦合，不利于单元测试
- 对比惰性加载单体，虚拟代理赋予类实例化方式的更多控制权。

## 方法的链式调用

- 事件 添加和删除事件监听器，对事件对象进行规范化处理
- DOM 类名管理：样式管理
- Ajax 对 XMLHTTPRequest 进行规范化处理

  ```js
  (function () {
    function Album(artist) {
      this.artist = artist;
    }
    Album.prototype = {
      getArtist: function () {
        return this.artist;
      },
      setArtist: function (artist) {
        this.artist = artist;
        return this;
      },
    };
    window.Album = function () {
      return new Album(arguments);
    };
  })();

  var album = new Album("Taylor Swift");
  album.setArtist("John Mayer").getArtist(); // John Mayer
  ```

## 工厂模式

### 1. 简单的工厂模式

通过一个外部对象来创建成员变量，提供多种类来产生实例

```js
function ClassicAlbum() {}
ClassicAlbum.prototype = {
  addWrapper: function () {},
  addTag: function () {},
};
var AlbumFactory = {
  createAlbum: function (type) {
    var album;
    switch (type) {
      case "classic":
        album = new ClassicAlbum();
        break;
      case "pop":
        album = new PopAlbum();
        break;
      case "blues":
        album = new BluesAlbum();
        break;
      case "country":
      default:
        bicyle = new CountryAlbum();
        break;
    }
    return album;
  },
};
var AlbumShop = function () {};
AlbumShop.prototype = {
  sellAlbum: function (type) {
    var album = new AlbumFactory.createAlbum(type);
    album.addWrapper();
    album.addTag();
    return album;
  },
};
var albumshop = new AlbumShop();
ablumshop.sellAlbum("blues");
// 商店通知工厂需要的音乐类型，工厂来处理生产对应的音乐类型，然后返回给商店，商店自己进行通用操作
```

### 2. 工厂模式

通过子类继承父类，子类调取继承的方法处理公共逻辑，自身的方法可以进行定制化处理

```js
function ClassicAlbum() {}
ClassicAlbum.prototype = {
  addWrapper: function () {},
  addTag: function () {},
};
function extend(subClass, superClass) {
  var F = function () {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;
  subClass.superClass = superClass.prototype;
  // 确保超类的constructor属性被正确设置
  if (superClass.prototype.constructor === Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}
var AlbumFactory = function () {};
AlbumFactory.prototype = {
  createAlbum: function (type) {
    throw new Error("need do it by self.");
  },
  sellAlbum: function (type) {
    var album = new this.createAlbum(type);
    album.addWrapper();
    album.addTag();
  },
};
var AShop = function () {};
extend(AShop, AlbumFactory);
AShop.prototype.createAlbum = function (type) {
  var album;
  switch (type) {
    case "classic":
      album = new ClassicAlbum();
      break;
    case "pop":
      album = new PopAlbum();
      break;
    case "blues":
      album = new BluesAlbum();
      break;
    case "country":
    default:
      album = new CountryAlbum();
      break;
  }
  return album;
};
var ashop = new AShop();
ashop.sellAlbum("classic");
// 商店自己进行处理音乐类型，然后通知工厂进行通用操作，可以进行定制化，只售卖部分产品
```

### 3. 整合多个对象的功能集中到一个，弱化对象耦合

```js
var AlbumFactory = function () {};
AlbumFactory.prototype = {
  createAlbum: function () {},
};
var AlbumShop = function (factory, wrap) {
  this.type = type;
  this.factory = factory;
  this.wrap = wrap;
  this.init();
};
AlbumShop.prototype = {
  init: function () {},
  sellAlbum: function () {
    var album = this.factory.createAlbum();
    album = this.wrap.addWrapper(album);
    album = this.wrap.addTag(album);
    return album;
  },
};
var AlbumWrap = function () {};
AlbumWrap.prototype = {
  addWrapper: function () {},
  addTag: function () {},
};
var AlbumManager = {
  create: function (type) {
    var factory = new AlbumFactory(type);
    var wrap = new AlbumWrap(type);
    return new AlbumShop(type, factory, wrap);
  },
};
var am = AlbumManager.create();
am.sellAlbum("blue");
```

## 桥接模式

### 案例

事件监听器中的回调函数

### 利弊

优点：将抽象与其实现隔离开，促进代码模块化，促成更简洁的实现并提高抽象的灵活性，可以把一组类和函数连接起来，提供一种借助于特权函数访问私有数据的手段
缺点：提高程序复杂程度，加大调试难度

## 组合模式

通过一条命令在多个对象上触发复杂的或递归的行为，这种简化粘合性代码，更容易维护，针对复杂行为则被委托给各个对象。
用同样的方法处理对象的集合与其中的特定子对象，对组合对象的操作将向下传递到所有的组成对象；可以用一批子对象组织成树形结构，使整棵数都可被遍历

### 利弊

优点：促进代码重用，利于代码重构，低耦合，深度优先搜索查找节点，只需要操作顶层对象，让子对象传递这个操作就行
缺点：层次体系大会引起性能问题

## 门面模式

差异化代码抽离到门面方法里面

### 案例

编写兼容性工具代码

### 利弊

优点：简化类的接口，不提供额外的选择，消除与客户代码间的耦合，抽离出方法，使调用简化
缺点：针对只使用少许门面元素的情况，增加额外负担

## 适配器模式

### 案例

两个 js 框架的切换使用，jquery 和 YUI，需要添加对应的适配接口去切换库，大大减少代码改动

### 利弊

优点：协调期待接口与现在接口不兼容问题，用新接口对现有接口进行包装，避免大规模改写现在代码。
缺点：当需要重写代码时，不需要使用该模式

## 装饰者模式

为类添加特性时，从该类派生自类的解决方法并不实际的话；为对象添加特性，又不改变该对象的代码时
对被包装对象的功能进行修改或扩充

### 利弊

优点：运行期间为对象增添特性或职责的有力工具，带来灵活性
缺点：增加负责程度

## 享元模式

减少程序所需对象的数量，将对象的内部状态划分为内在数据和外在数据，内在数据指类的内部方法所需的信息，没有这种数据就不能正常运转，外部数据是可以从类身上剥离并存储在其外部的信息。将内在状态相同的所有对象替换为同一个共享对象

### 适用场合

针对密集型对象，这些对象所保存的数据中至少有一部分能被转化为外在数据（即是能被分离出来，作为参数提供给方法），同时占用的资源相对较少

### 实现步骤

1. 将外在数据从目标类剥离，尽可能删除后该类属性（因实例而异的属性）
2. 创建一个用来控制该类的实例化的工厂

- 实现一：用一个对象字面量保存这一类对象的引用，并用来生成唯一性组合作为它们的索引，每次使用前先检查对象字面量是否请求过，否则创建一个新对象并保存在对象字面量里
- 实现二：对象池，用数组来保存所创建对象的引用，

3. 创建一个用来保存外在数据的管理器，该管理器对象负责控制处理外在数据，将内部数据提供给工厂对象并创建一个对象（如果不存在），存在就重用该对象，外在数据被保存在管理器内的数据结构中

### 利弊

优点：降低网页资源负荷几个数量级，不需要修改原有代码
缺点：出错的地方可能变成 3 个地方，增加维护难度

## 代理模式

代理对象和本体实现了相同的接口，会添加一些控制代码，不会对传递给本体的方法调用进行修改

### 虚拟代理

针对创建开销较大的本体的访问，将本体实例化推迟到有方法调用的时候（具有触发本体实例化的事件），把构造函数参数保存起来，直到有方法被调用时，才真正执行本体的实例化，是一种优化模式。

### 远程代理、保护代理

不适合 JS 中

### 利弊

优点：虚拟代理体现在效率方面
缺点：代码的复杂性

## 观察者模式

针对大型程序有用，提高 API 灵活性，并行开发的多个实现能够彼此独立地进行修改

### 利弊

优点：让观察对象借助一个事件监听器替你处理各种行为并将信息委托给它的所有订阅者，降低内存消耗和提交互动性能，减少系统开销并提高程序可维护性
缺点：增加了创建观察对象的加载时间开销，可以使用惰性加载技术处理

```js
function Publisher() {
  this.subscribers = [];
}
Publisher.prototype.deliver = function (data) {
  this.subscribers.forEach(function (fn) {
    fn(data);
  });
  return this;
};
// 订阅
Function.prototype.subscribe = function (publisher) {
  var that = this;
  var alreadyExists = publisher.subscribers.some(function (el) {
    return el === that;
  });
  if (!alreadyExists) {
    publisher.subscribers.push(this);
  }
  return this;
};
// 退订
Function.prototype.unsubscribe = function (publisher) {
  var that = this;
  publisher.subscribers = publisher.subscribers.filter(function (el) {
    return el !== that;
  });
  return this;
};
```

## 命令模式

### 利弊

优点: 消除调用操作的对象和实现操作的对象之间的耦合，提高对象之间操作的模块化程度
缺点：增加代码调试难度

### 适用场合

将调用对象与实现操作的对象隔离开，即两个对象间的互动方式需要更高的模块化程度可以用该模式

## 职责链模式

### 事件委托

事件模型就是职责链实现，通过事件委托有助于优化代码，减少内存消耗，脚本运行快，维护容易

### 利弊

优点：消除请求的发送者和接收者的耦合，可以使用只有在运行期间才能知道的条件来把任务分配给最恰当的对象
缺点：也是一种隐式处理程序，无法知道处理请求的具体是链上哪个环节，可能就不会被处理
